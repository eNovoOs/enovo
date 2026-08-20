/* ====================================================================
       EDIT THESE TWO LINES ONLY
       CHECKOUT_URL = where the "Start Now" buttons send people to buy.
       CALL_URL     = where the "Book a Call" buttons send people to book.
    ==================================================================== */
    const CHECKOUT_URL = "https://platform.osenovo.com/checkout/6a32e88bf2545e1f9733f017/6982320b67ddb968f9362bfc";
    const CALL_URL     = "https://calendar.prospectconnect.ai/calendar/69a1cad65155157c85f1739b";

    document.querySelectorAll('[data-cta="start"]').forEach(function(a){ a.href = CHECKOUT_URL; a.target = "_blank"; a.rel="noopener"; });
    document.querySelectorAll('[data-cta="call"]').forEach(function(a){ a.href = CALL_URL; a.target = "_blank"; a.rel="noopener"; });

    /* Scroll reveal */
    var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold:.12 });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
