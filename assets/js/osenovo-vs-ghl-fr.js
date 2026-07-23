function initMobileNav(){var t=document.querySelector('.custom .mobile-toggle'),n=document.querySelector('.custom .mobile-nav');if(!t||!n)return;function o(){t.classList.add('active');n.classList.add('open');document.body.style.overflow='hidden';}function c(){t.classList.remove('active');n.classList.remove('open');document.body.style.overflow='';}t.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();n.classList.contains('open')?c():o();});var l=n.querySelectorAll('a[href]');for(var i=0;i<l.length;i++){l[i].addEventListener('click',function(){c();});}}
        if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initMobileNav);}else{initMobileNav();}

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