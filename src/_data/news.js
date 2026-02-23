const RSSParser = require('rss-parser');

const FEEDS = {
  padel: 'https://news.google.com/rss/search?q=padel+france&hl=fr&gl=FR&ceid=FR:fr',
  pickleball: 'https://news.google.com/rss/search?q=pickleball+france&hl=fr&gl=FR&ceid=FR:fr'
};

const MAX_ITEMS = 20;

module.exports = async function () {
  const parser = new RSSParser();
  const allItems = [];

  for (const [sport, url] of Object.entries(FEEDS)) {
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items) {
        allItems.push({
          title: item.title || '',
          link: item.link || '',
          date: item.isoDate || item.pubDate || new Date().toISOString(),
          source: item.creator || item['dc:creator'] || '',
          sport: sport
        });
      }
    } catch (e) {
      console.warn(`[news] Failed to fetch ${sport} feed: ${e.message}`);
    }
  }

  // Sort by date (newest first)
  allItems.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Deduplicate by title prefix
  const seen = new Set();
  const unique = allItems.filter(item => {
    const key = item.title.toLowerCase().substring(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.slice(0, MAX_ITEMS);
};
