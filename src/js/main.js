/* ============================================
   CourtSide — Main JS
   Vanilla JS, no dependencies
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // — Mobile menu toggle —
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            menuToggle.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
        });
    }

    // — Search overlay —
    const searchOpen = document.getElementById('searchOpen');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = searchOverlay ? searchOverlay.querySelector('input') : null;

    if (searchOpen && searchOverlay) {
        searchOpen.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            if (searchInput) searchInput.focus();
        });

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchOverlay.classList.remove('active');
            });
        }

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });

        // Close on background click
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
    }

    // — Smooth scroll for anchor links —
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // — Tag filter on category pages —
    const filterBar = document.getElementById('filterBar');
    const filteredGrid = document.getElementById('filteredGrid');

    if (filterBar && filteredGrid) {
        const filterBtns = filterBar.querySelectorAll('.filter-btn');
        const cards = filteredGrid.querySelectorAll('.card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                // Remove existing empty message
                const existing = filteredGrid.querySelector('.filter-empty');
                if (existing) existing.remove();

                let visibleCount = 0;

                cards.forEach(card => {
                    const category = card.dataset.category || '';
                    const tags = card.dataset.tags || '';
                    const allCardTags = (category + ',' + tags).toLowerCase();

                    if (filter === 'all' || allCardTags.includes(filter)) {
                        card.removeAttribute('data-hidden');
                        card.classList.add('filter-fade-in');
                        visibleCount++;
                        card.addEventListener('animationend', () => {
                            card.classList.remove('filter-fade-in');
                        }, { once: true });
                    } else {
                        card.setAttribute('data-hidden', 'true');
                        card.classList.remove('filter-fade-in');
                    }
                });

                // Show empty state if no matches
                if (visibleCount === 0) {
                    const empty = document.createElement('p');
                    empty.className = 'filter-empty';
                    empty.textContent = 'Aucun article avec ce tag.';
                    filteredGrid.appendChild(empty);
                }
            });
        });
    }

    // — Reading progress bar (article pages) —
    const progressBar = document.getElementById('readingProgress');
    const articleBody = document.querySelector('.article-body');

    if (progressBar && articleBody) {
        const updateProgress = () => {
            const articleTop = articleBody.offsetTop;
            const articleHeight = articleBody.offsetHeight;
            const scrolled = window.scrollY - articleTop;
            const windowHeight = window.innerHeight;
            const progress = Math.min(Math.max(scrolled / (articleHeight - windowHeight), 0), 1);
            progressBar.style.width = (progress * 100) + '%';
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // — Sidebar table of contents with scroll tracking (article pages) —
    const sidebar = document.getElementById('articleSidebar');

    if (articleBody && sidebar) {
        const headings = articleBody.querySelectorAll('h2');

        if (headings.length >= 3) {
            // Build TOC
            const toc = document.createElement('nav');
            toc.className = 'toc';
            toc.innerHTML = '<p class="toc__title">Sommaire</p>';
            const list = document.createElement('ul');
            list.className = 'toc__list';

            const tocLinks = [];

            headings.forEach((heading, i) => {
                const id = 'section-' + i;
                heading.id = id;

                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#' + id;
                a.textContent = heading.textContent.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]\s*/gu, '').trim();

                if (heading.tagName === 'H3') {
                    a.className = 'toc__h3';
                }

                li.appendChild(a);
                list.appendChild(li);
                tocLinks.push({ el: a, id: id });
            });

            toc.appendChild(list);
            sidebar.appendChild(toc);

            // Scroll tracking with IntersectionObserver
            let activeId = null;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        activeId = entry.target.id;
                        tocLinks.forEach(link => {
                            link.el.classList.toggle('toc--active', link.id === activeId);
                        });
                    }
                });
            }, {
                rootMargin: '-80px 0px -70% 0px',
                threshold: 0
            });

            headings.forEach(heading => observer.observe(heading));
        }
    }

    // — Newsletter form (placeholder) —
    const newsletterForms = document.querySelectorAll('.cta__form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                form.innerHTML = '<p style="color: #fff; font-weight: 600; font-size: 1.1rem;">✅ Merci ! Vous êtes inscrit(e).</p>';
            }
        });
    });

    // — Scroll Reveal — REMOVED (all content visible immediately) —
    // Hero curtain reveal + snapIn animations are kept (CSS-only, page-load triggered)

});
