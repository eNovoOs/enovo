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
                stageEl.textContent = 'Mode manuel';
                descEl.textContent = "Vous êtes le goulot. La plupart de vos opérations dépendent de vous ou de votre équipe faisant les choses à la main. La bonne nouvelle? Cela signifie que les plus gros gains sont juste devant vous. Même une ou deux automations créeront une différence immédiate et perceptible dans votre quotidien.";
                noteEl.innerHTML = '<strong>Votre étape: Mode manuel (Score: ' + total + '/18)</strong> — Concentrez-vous d\'abord sur les automations #1 et #2. Celles-ci auront le plus grand impact sur vos revenus et libéreront des heures de votre semaine immédiatement. N\'essayez pas de tout construire à la fois. Commencez par les deux automations les plus prioritaires ci-dessous et développez à partir de là.';
            } else if (total <= 15) {
                resultEl.classList.add('stage-partial');
                stageEl.textContent = 'Automatisation partielle';
                descEl.textContent = "Vous avez quelques éléments en place, mais il y a des lacunes. Les leads glissent toujours entre les mailles, les suivis sont incohérents et vous payez probablement pour des outils qui se chevauchent. Vous êtes plus proche que vous ne le pensez d'un système entièrement au point.";
                noteEl.innerHTML = '<strong>Votre étape: Automatisation partielle (Score: ' + total + '/18)</strong> — Vous avez probablement déjà une capture de leads basique et une réservation en place. Votre plus grande opportunité est dans les étapes de nurture et de réactivation, où la plupart des entreprises laissent de l\'argent sur la table. Concentrez-vous sur les automations #3, #4 et #5 pour combler les lacunes dans votre système actuel.';
            } else {
                resultEl.classList.add('stage-optimized');
                stageEl.textContent = 'Optimisé';
                descEl.textContent = "Vous êtes en territoire rare. Vos opérations sont largement automatisées et fonctionnent sans vous. La question maintenant est: tous vos outils sont-ils consolidés dans un seul système? Si vous payez pour 5+ plateformes pour rester à ce niveau, vous dépensez probablement plusieurs centaines par mois en trop.";
                noteEl.innerHTML = '<strong>Votre étape: Optimisé (Score: ' + total + '/18)</strong> — Vos automations sont solides, mais la partie 2 ci-dessous peut révéler que vous payez trop pour les maintenir. Le plus grand gain à votre étape est la consolidation: déplacer tout dans une seule plateforme pour réduire les coûts, la complexité et le risque que les choses se cassent entre les outils déconnectés.';
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
            document.getElementById('compCurrent').textContent = '$' + total.toLocaleString() + '/mois';

            var savings = total - 297;
            if (savings < 0) savings = 0;
            var yearly = savings * 12;
            document.getElementById('savingsAmount').textContent = '$' + savings.toLocaleString() + '/mois ($' + yearly.toLocaleString() + '/an)';
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