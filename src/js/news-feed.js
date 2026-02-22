/* CourtSide — News Feed (RSS via Google News)
   Fetches padel & pickleball news, renders as cards.
   Works on /actualites/ page AND homepage widget. */

(function () {
  'use strict';

  var CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  var FEEDS = {
    padel: 'https://news.google.com/rss/search?q=padel+france&hl=fr&gl=FR&ceid=FR:fr',
    pickleball: 'https://news.google.com/rss/search?q=pickleball+france&hl=fr&gl=FR&ceid=FR:fr'
  };
  var MAX_ITEMS_PAGE = 20;
  var MAX_ITEMS_WIDGET = 10;
  var CACHE_KEY = 'courtside_news_cache';
  var CACHE_TTL = 15 * 60 * 1000; // 15 minutes

  // — Utility: parse RSS XML → array of items
  function parseRSS(xml, sport) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xml, 'text/xml');
    var items = doc.querySelectorAll('item');
    var results = [];

    items.forEach(function (item) {
      var title = item.querySelector('title');
      var link = item.querySelector('link');
      var pubDate = item.querySelector('pubDate');
      var source = item.querySelector('source');

      if (title && link) {
        results.push({
          title: title.textContent.trim(),
          link: link.textContent.trim(),
          date: pubDate ? new Date(pubDate.textContent) : new Date(),
          source: source ? source.textContent.trim() : '',
          sport: sport
        });
      }
    });

    return results;
  }

  // — Utility: relative time in French
  function timeAgo(date) {
    var now = new Date();
    var diff = Math.floor((now - date) / 1000);

    if (diff < 60) return "à l'instant";
    if (diff < 3600) return 'il y a ' + Math.floor(diff / 60) + ' min';
    if (diff < 86400) return 'il y a ' + Math.floor(diff / 3600) + 'h';
    if (diff < 172800) return 'hier';
    return 'il y a ' + Math.floor(diff / 86400) + 'j';
  }

  // — Fetch with cache
  function fetchWithCache(url) {
    var cached = null;
    try {
      var raw = localStorage.getItem(CACHE_KEY + '_' + url);
      if (raw) {
        cached = JSON.parse(raw);
        if (Date.now() - cached.ts < CACHE_TTL) {
          return Promise.resolve(cached.data);
        }
      }
    } catch (e) { /* ignore */ }

    return fetch(CORS_PROXY + encodeURIComponent(url))
      .then(function (res) {
        if (!res.ok) throw new Error('Feed fetch failed');
        return res.text();
      })
      .then(function (text) {
        try {
          localStorage.setItem(CACHE_KEY + '_' + url, JSON.stringify({ ts: Date.now(), data: text }));
        } catch (e) { /* storage full, ignore */ }
        return text;
      });
  }

  // — Render a single news item
  function renderItem(item) {
    var sportLabel = item.sport === 'padel' ? 'Padel' : 'Pickleball';
    var sportClass = item.sport === 'padel' ? 'news-item__tag--padel' : 'news-item__tag--pickleball';

    return '<a href="' + item.link + '" class="news-item" target="_blank" rel="noopener">' +
      '<div class="news-item__meta">' +
        '<span class="news-item__tag ' + sportClass + '">' + sportLabel + '</span>' +
        '<time class="news-item__time">' + timeAgo(item.date) + '</time>' +
      '</div>' +
      '<h3 class="news-item__title">' + item.title + '</h3>' +
      (item.source ? '<span class="news-item__source">' + item.source + '</span>' : '') +
    '</a>';
  }

  // — Render error state
  function renderError(container) {
    container.innerHTML =
      '<div class="news-feed__empty">' +
        '<p>Impossible de charger les actualités pour le moment.</p>' +
        '<button class="btn btn--sm" onclick="window.location.reload()">Réessayer</button>' +
      '</div>';
  }

  // — Main: fetch both feeds, merge, sort, render
  function loadNews(filter, container, maxItems) {
    var feedsToLoad = [];

    if (filter === 'all' || filter === 'padel') {
      feedsToLoad.push(
        fetchWithCache(FEEDS.padel).then(function (xml) { return parseRSS(xml, 'padel'); })
      );
    }
    if (filter === 'all' || filter === 'pickleball') {
      feedsToLoad.push(
        fetchWithCache(FEEDS.pickleball).then(function (xml) { return parseRSS(xml, 'pickleball'); })
      );
    }

    Promise.all(feedsToLoad)
      .then(function (results) {
        var all = [];
        results.forEach(function (items) { all = all.concat(items); });

        // Sort by date (newest first), deduplicate by title
        all.sort(function (a, b) { return b.date - a.date; });
        var seen = {};
        var unique = [];
        all.forEach(function (item) {
          var key = item.title.toLowerCase().substring(0, 60);
          if (!seen[key]) {
            seen[key] = true;
            unique.push(item);
          }
        });

        var items = unique.slice(0, maxItems);

        if (items.length === 0) {
          container.innerHTML = '<div class="news-feed__empty"><p>Aucune actualité disponible.</p></div>';
          return;
        }

        container.innerHTML = items.map(renderItem).join('');
      })
      .catch(function () {
        renderError(container);
      });
  }

  // — Init: Actualités page (full feed)
  var feedList = document.getElementById('newsFeedList');
  if (feedList) {
    loadNews('all', feedList, MAX_ITEMS_PAGE);

    // Tab switching
    var tabs = document.querySelectorAll('.news-feed__tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        feedList.innerHTML = '<div class="news-feed__loading"><div class="news-feed__spinner"></div><p>Chargement…</p></div>';
        loadNews(tab.dataset.feed, feedList, MAX_ITEMS_PAGE);
      });
    });
  }

  // — Init: Homepage widget (compact)
  var widget = document.getElementById('newsWidget');
  if (widget) {
    loadNews('all', widget, MAX_ITEMS_WIDGET);
  }
})();
