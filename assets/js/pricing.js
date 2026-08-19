// ============================================================
//  CTA DESTINATIONS
//  Each plan deep-links to its own checkout, so the matching plan
//  arrives pre-selected. Any plan left blank falls back to the
//  "Schedule a Call" URL, so no button is ever dead.
// ============================================================
const CALL_URL = "https://calendar.prospectconnect.ai/calendar/69a1cad65155157c85f1739b";
const CHECKOUT_BASE = "https://platform.osenovo.com/checkout";
const ACCOUNT_ID = "6982320b67ddb968f9362bfc";
const TRIAL_URLS = {
    starter: CHECKOUT_BASE + "/6a32e88bf2545e1f9733f017/" + ACCOUNT_ID,
    growth:  CHECKOUT_BASE + "/6a85e40768bbf98f8bd5e123/" + ACCOUNT_ID,
    scale:   CHECKOUT_BASE + "/6a85e4a068bbf98f8bd5e5d5/" + ACCOUNT_ID
};

document.querySelectorAll('[data-cta="trial"]').forEach(function (el) {
    var plan = el.getAttribute('data-plan');
    var url = (TRIAL_URLS[plan] || "").trim() || CALL_URL;
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener";
});

document.querySelectorAll('[data-cta="call"]').forEach(function (el) {
    el.href = CALL_URL;
    el.target = "_blank";
    el.rel = "noopener";
});

// ============================================================
//  MONTHLY / ANNUAL BILLING TOGGLE
//  Every price string lives in the markup as a data attribute so
//  both the EN and FR pages can share this script untouched.
// ============================================================
function initBillingToggle() {
    var toggle = document.querySelector('.custom .billing-toggle');
    if (!toggle) return;

    var buttons = toggle.querySelectorAll('button[data-billing]');
    var cards = document.querySelectorAll('.custom .plan-card');

    function render(mode) {
        buttons.forEach(function (b) {
            var on = b.getAttribute('data-billing') === mode;
            b.classList.toggle('active', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });

        cards.forEach(function (card) {
            var amount = card.querySelector('.plan-amount');
            var period = card.querySelector('.plan-period');
            var billed = card.querySelector('.plan-billed');
            if (!amount || !period || !billed) return;

            amount.textContent = card.getAttribute('data-amount-' + mode) || amount.textContent;
            period.textContent = card.getAttribute('data-period-' + mode) || period.textContent;
            billed.innerHTML = card.getAttribute('data-billed-' + mode) || '';
        });
    }

    buttons.forEach(function (b) {
        b.addEventListener('click', function () {
            render(b.getAttribute('data-billing'));
        });
    });

    render('monthly');
}

// ============================================================
//  SCROLL ANIMATIONS
// ============================================================
const scrollObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.plan-card, .faq-item, .compare-scroll, .cta-box').forEach(function (el, i) {
    el.classList.add('animate-on-scroll');
    el.classList.add('animate-delay-' + Math.min((i % 3) + 1, 3));
    scrollObserver.observe(el);
});

document.querySelectorAll('.section-label, .section-title, .section-subtitle').forEach(function (el) {
    el.classList.add('animate-on-scroll');
    scrollObserver.observe(el);
});

// ============================================================
//  MOBILE NAVIGATION
// ============================================================
function initMobileNav() {
    var toggle = document.querySelector('.custom .mobile-toggle');
    var nav = document.querySelector('.custom .mobile-nav');
    if (!toggle || !nav) return;

    function openMenu() {
        toggle.classList.add('active');
        nav.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (nav.classList.contains('open')) { closeMenu(); } else { openMenu(); }
    });

    var navLinks = nav.querySelectorAll('a[href]');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', closeMenu);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        initMobileNav();
        initBillingToggle();
    });
} else {
    initMobileNav();
    initBillingToggle();
}

// ============================================================
//  LANGUAGE SWITCHER
// ============================================================
document.addEventListener('click', function (e) {
    var switchers = document.querySelectorAll('.lang-switcher');
    switchers.forEach(function (s) {
        if (s.contains(e.target)) {
            if (e.target.closest('.lang-switcher-btn')) {
                s.classList.toggle('open');
            }
        } else {
            s.classList.remove('open');
        }
    });
});
