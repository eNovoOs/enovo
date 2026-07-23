function switchTab(tab) {
            // Update buttons
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            event.currentTarget.classList.add('active');

            // Update content
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById('tab-' + tab).classList.add('active');
        }

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.objective-card, .biz-card, .section-label, .cta-box').forEach((el, i) => {
            el.classList.add('animate-on-scroll');
            el.classList.add('animate-delay-' + Math.min((i % 3) + 1, 3));
            scrollObserver.observe(el);
        });

function initMobileNav() {
            var toggle = document.querySelector('.custom .mobile-toggle');
            var nav = document.querySelector('.custom .mobile-nav');
            if (!toggle || !nav) return;
            function openMenu() { toggle.classList.add('active'); nav.classList.add('open'); document.body.style.overflow = 'hidden'; }
            function closeMenu() { toggle.classList.remove('active'); nav.classList.remove('open'); document.body.style.overflow = ''; }
            toggle.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); if (nav.classList.contains('open')) { closeMenu(); } else { openMenu(); } });
            var navLinks = nav.querySelectorAll('a[href]');
            for (var i = 0; i < navLinks.length; i++) { navLinks[i].addEventListener('click', function() { closeMenu(); }); }
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initMobileNav);
        } else {
            initMobileNav();
        }

document.addEventListener('click', function(e) {
        var switchers = document.querySelectorAll('.lang-switcher');
        switchers.forEach(function(s) {
            if (s.contains(e.target)) {
                if (e.target.closest('.lang-switcher-btn')) {
                    s.classList.toggle('open');
                }
            } else {
                s.classList.remove('open');
            }
        });
    });