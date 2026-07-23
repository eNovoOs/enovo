function toggleFaq(el) {
            const answer = el.nextElementSibling;
            const arrow = el.querySelector('.faq-arrow svg');
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            // Close all
            document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = '0px');
            document.querySelectorAll('.faq-arrow svg').forEach(a => {
                a.innerHTML = '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>';
            });
            // Open clicked if it was closed
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                arrow.innerHTML = '<line x1="5" y1="12" x2="19" y2="12"/>';
            }
        }

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.value-card, .pstep, .benefit-card, .who-card, .faq-item, .section-label, .cta-box').forEach((el, i) => {
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