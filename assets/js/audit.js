(function() {
        // ========== SCORECARD LOGIC ==========
        var scores = {};
        var totalCategories = 6;

        document.addEventListener('click', function(e) {
            var btn = e.target.closest('.score-btn');
            if (!btn) return;

            var category = btn.closest('.score-category');
            if (!category) return;

            var catName = category.getAttribute('data-category');
            var value = parseInt(btn.getAttribute('data-value'));

            // Deselect siblings
            var siblings = category.querySelectorAll('.score-btn');
            for (var i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('selected');
            }
            btn.classList.add('selected');

            scores[catName] = value;

            // Check if all categories scored
            if (Object.keys(scores).length === totalCategories) {
                showScoreResult();
            }
        });

        function showScoreResult() {
            var total = 0;
            for (var key in scores) {
                total += scores[key];
            }

            var resultEl = document.getElementById('scoreResult');
            var numberEl = document.getElementById('scoreNumber');
            var stageEl = document.getElementById('scoreStage');
            var descEl = document.getElementById('scoreDesc');
            var noteEl = document.getElementById('autoStageNote');

            numberEl.textContent = total;

            // Remove old stage classes
            resultEl.classList.remove('stage-manual', 'stage-partial', 'stage-optimized');

            if (total <= 8) {
                resultEl.classList.add('stage-manual');
                stageEl.textContent = 'Manual Mode';
                descEl.textContent = "You're the bottleneck. Most of your operations depend on you or your team doing things by hand. The good news? This means the biggest gains are right in front of you. Even one or two automations will create an immediate, noticeable difference in your day-to-day.";
                noteEl.innerHTML = '<strong>Your stage: Manual Mode (Score: ' + total + '/18)</strong> — Focus on automations #1 and #2 first. These will have the single biggest impact on your revenue and free up hours of your week immediately. Don\'t try to build everything at once. Start with the two highest-priority automations below and expand from there.';
            } else if (total <= 15) {
                resultEl.classList.add('stage-partial');
                stageEl.textContent = 'Partial Automation';
                descEl.textContent = "You've got some pieces in place, but there are gaps. Leads are still slipping through cracks, follow-ups are inconsistent, and you're probably paying for tools that overlap. You're closer than you think to a fully dialed-in system.";
                noteEl.innerHTML = '<strong>Your stage: Partial Automation (Score: ' + total + '/18)</strong> — You likely already have basic lead capture and booking in place. Your biggest opportunity is in the nurture and reactivation stages, where most businesses leave money on the table. Focus on automations #3, #4, and #5 to fill the gaps in your current system.';
            } else {
                resultEl.classList.add('stage-optimized');
                stageEl.textContent = 'Optimized';
                descEl.textContent = "You're in rare territory. Your operations are largely automated and running without you. The question now is: are all your tools consolidated into one system? If you're paying for 5+ platforms to stay at this level, you're likely overspending by hundreds per month.";
                noteEl.innerHTML = '<strong>Your stage: Optimized (Score: ' + total + '/18)</strong> — Your automations are strong, but Part 2 below may reveal you\'re overpaying to maintain them. The biggest win at your stage is consolidation: moving everything into one platform to reduce cost, complexity, and the risk of things breaking between disconnected tools.';
            }

            resultEl.classList.add('visible');

            // Update progress
            document.getElementById('progStep1').classList.add('completed');
            document.getElementById('progStep1').classList.remove('active');
            document.getElementById('progLine1').classList.add('completed');
            document.getElementById('progStep2').classList.add('active');

            // Smooth scroll to result
            resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // ========== TOOL STACK CALCULATOR ==========
        var costInputs = document.querySelectorAll('.tool-cost-input');
        for (var i = 0; i < costInputs.length; i++) {
            costInputs[i].addEventListener('input', updateToolTotal);
        }

        function updateToolTotal() {
            var inputs = document.querySelectorAll('.tool-cost-input');
            var total = 0;
            for (var j = 0; j < inputs.length; j++) {
                var val = parseFloat(inputs[j].value) || 0;
                total += val;
            }

            document.getElementById('toolTotal').textContent = '$' + total.toLocaleString();
            document.getElementById('compCurrent').textContent = '$' + total.toLocaleString() + '/mo';

            var savings = total - 297;
            if (savings < 0) savings = 0;
            var yearly = savings * 12;
            document.getElementById('savingsAmount').textContent = '$' + savings.toLocaleString() + '/mo ($' + yearly.toLocaleString() + '/yr)';
        }

        // ========== SCROLL NAVIGATION ==========
        document.getElementById('scrollToPart2').addEventListener('click', function() {
            document.getElementById('progStep2').classList.add('completed');
            document.getElementById('progStep2').classList.remove('active');
            document.getElementById('progLine2').classList.add('completed');
            document.getElementById('progStep3').classList.add('active');
            document.getElementById('part2').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        document.getElementById('scrollToPart3').addEventListener('click', function() {
            document.getElementById('progStep3').classList.add('completed');
            document.getElementById('progStep3').classList.remove('active');
            document.getElementById('part3').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        // Progress step click navigation
        var progSteps = document.querySelectorAll('.progress-step');
        for (var p = 0; p < progSteps.length; p++) {
            progSteps[p].addEventListener('click', function() {
                var target = this.getAttribute('data-target');
                if (target) {
                    var el = document.getElementById(target);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }

        // ========== SCROLL ANIMATIONS ==========
        var scrollObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        var animItems = document.querySelectorAll('.score-category, .auto-card, .cta-box, .comparison-box, .part-label');
        animItems.forEach(function(el, i) {
            el.classList.add('animate-on-scroll');
            el.classList.add('animate-delay-' + Math.min((i % 3) + 1, 3));
            scrollObserver.observe(el);
        });

        // ========== MOBILE NAV ==========
        function initMobileNav() {
            var toggle = document.querySelector('.custom .mobile-toggle');
            var nav = document.querySelector('.custom .mobile-nav');
            if (!toggle || !nav) return;
            function openMenu() { toggle.classList.add('active'); nav.classList.add('open'); document.body.style.overflow = 'hidden'; }
            function closeMenu() { toggle.classList.remove('active'); nav.classList.remove('open'); document.body.style.overflow = ''; }
            toggle.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); if (nav.classList.contains('open')) { closeMenu(); } else { openMenu(); } });
            var navLinks = nav.querySelectorAll('a[href]');
            for (var k = 0; k < navLinks.length; k++) { navLinks[k].addEventListener('click', function() { closeMenu(); }); }
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initMobileNav);
        } else {
            initMobileNav();
        }
    })();

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