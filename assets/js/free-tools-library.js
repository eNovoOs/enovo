// Initialize calculator on page load
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof updateSpend === 'function') updateSpend();
        });

        // Tool Spending Calculator
        function addToolRow() {
            const area = document.getElementById('toolInputsArea');
            const idx = area.children.length;
            const placeholders = ['e.g. HubSpot', 'e.g. ActiveCampaign', 'e.g. Kajabi', 'e.g. Pipedrive', 'e.g. Zapier', 'e.g. Typeform', 'e.g. ConvertKit', 'e.g. Teachable'];
            const ph = placeholders[idx % placeholders.length];
            const row = document.createElement('div');
            row.className = 'tool-row';
            row.dataset.index = idx;
            row.innerHTML = `
                <input type="text" placeholder="${ph}" oninput="updateSpend()">
                <div class="dollar-prefix"><input type="number" placeholder="0" min="0" oninput="updateSpend()"></div>
                <button class="btn-remove-tool" onclick="removeToolRow(this)" title="Remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            `;
            area.appendChild(row);
            row.querySelector('input[type="text"]').focus();
        }

        function removeToolRow(btn) {
            const area = document.getElementById('toolInputsArea');
            if (area.children.length <= 1) return; // keep at least one row
            btn.closest('.tool-row').remove();
            updateSpend();
        }

        function updateSpend() {
            const rows = document.querySelectorAll('.tool-row');
            let total = 0;
            let filledCount = 0;

            rows.forEach(row => {
                const cost = parseFloat(row.querySelector('input[type="number"]').value) || 0;
                if (cost > 0) { total += cost; filledCount++; }
            });

            const annual = total * 12;
            const avg = filledCount > 0 ? Math.round(total / filledCount) : 0;

            document.getElementById('totalMonthly').textContent = '$' + total.toLocaleString() + '/mo';
            document.getElementById('totalAnnual').textContent = '$' + annual.toLocaleString();
            document.getElementById('toolCountDisplay').textContent = filledCount;
            document.getElementById('avgCostDisplay').textContent = '$' + avg.toLocaleString();
        }

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.tool-card, .section-label, .faq-item, .cta-box').forEach((el, i) => {
            el.classList.add('animate-on-scroll');
            el.classList.add('animate-delay-' + Math.min((i % 3) + 1, 3));
            scrollObserver.observe(el);
        });

        // Mobile navigation
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