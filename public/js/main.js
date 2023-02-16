//  Juguetería Cósmica
console.log(`Juguetería Cósmica ${location.pathname}\n-----------------------------------------------------`);

/* Nav list mobile-version
-------------------------------------------------------------------------------------------------------------------- */

const mainNavList = document.querySelector('.main-nav__list');
const mainNavToggle = document.getElementById('main-nav-toggle');

mainNavList.addEventListener('click', e => {
    if(e.target.tagName === 'A'){
        mainNavToggle.checked = false;
    }
});

/* End of mobile-version
-------------------------------------------------------------------------------------------------------------------- */



/*=====================================================================================================================
=                                                    footer-nav section                                               =
=====================================================================================================================*/

const mainFooter = document.querySelector('.main-footer');
const footerNavList = document.querySelector('.footer-nav-list');

footerNavList.addEventListener('click', e => {
    if (e.target.tagName === 'A'){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        }) 
    }
});

/*==========================================  End of footer-nav section  ============================================*/