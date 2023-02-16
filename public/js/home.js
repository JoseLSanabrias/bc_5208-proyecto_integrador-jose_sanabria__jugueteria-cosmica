
/*=================================================================================================================
=                                            float filter accordion section                                       =
=================================================================================================================*/

const productFilterButton = document.querySelector('.filter-button__filter-btn');


//  Contenedor de opciones para ordenar productos
const floatProductSortList = document.querySelector('.sort-list__small-display-container');

//  Lista de opciones para ordenar productos
// const sortListInputCollection =  document.querySelectorAll('.sort-list__input');

//  Acordeón con lista de opciones para filtrar productos
const smallFilterContainer = document.querySelector('.filter__small-display-container');


const scrollToViewportTop = () =>{
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })    
};

const toggleBlurScreenFilter = () =>{
    const screenBlackBlurFilter = document.querySelector('.screen-black-blur-filter');
    screenBlackBlurFilter.classList.toggle('shown-filter');
};

const toggleProductFilterAccordion = () => {
    smallFilterContainer.classList.toggle('hidden');
};

const toggleFilterBtn = () => productFilterButton.disabled = (true) ? false: true;

const fullAccordionDisplayProcess = () =>{
    scrollToViewportTop();
    toggleBlurScreenFilter();
    toggleProductFilterAccordion();
    toggleFilterBtn();
};

const fullFloatSortListDisplayProcess = () => {
    scrollToViewportTop();
    toggleBlurScreenFilter();
    toggleFloatSortList();
};

const hideFloatSortList = () =>{
    toggleBlurScreenFilter();
    toggleFloatSortList();
};

/*==================================  End of float filter accordion section  ====================================*/





/*=================================================================================================================
=                                            float sort list section                                              =
=================================================================================================================*/

document.addEventListener('click', e => {

    /* Abrir menú flotante filtro de productos
    ------------------------------------------------------------------------------------------------------------ */
    if(e.target.closest('.filter-button__filter-btn')){
        fullAccordionDisplayProcess();
        return;
    };
    /* End of Abrir menú flotante filtro de productos
    ------------------------------------------------------------------------------------------------------------ */



    /* Cerrar menú flotante filtro de productos 
    ------------------------------------------------------------------------------------------------------------ */
    if (e.target.id === 'product-filter-close-btn' || e.target.id === 'show-filtered-product-btn'){
        fullAccordionDisplayProcess();
        return;
    };
    /* End of Cerrar menú flotante filtro de productos 
    ------------------------------------------------------------------------------------------------------------ */



    /* Abrir menú flotante ordenar productos
    ------------------------------------------------------------------------------------------------------------ */
    if (e.target.closest('.filter-button__sort-btn')){
        fullFloatSortListDisplayProcess();
    };
    /* End of Abrir menú flotante ordenar productos
    ------------------------------------------------------------------------------------------------------------ */
});



/* Cerrar menú flotante ordenar productos
---------------------------------------------------------------------------------------------------------------- */
const toggleFloatSortList = () => {
    floatProductSortList.classList.toggle('hidden');
};

/*
    Opción de cerrar menú flotante "Ordenar productos" al darle click a alguna de las opciones
*/
// sortListInputCollection.forEach((label) => {
//     label.addEventListener('click', e => {
//         hideFloatSortList();
//     });
// });

/* End of Cerrar menú flotante ordenar productos
---------------------------------------------------------------------------------------------------------------- */

/* Cerrar menús flotantes de ordenar y filtrar productos al dar click por fuera de cada uno
---------------------------------------------------------------------------------------------------------------- */

//  Filtro negro con difuminado
const blurFilter = document.getElementById('blur-filter');

blurFilter.addEventListener('click', () =>{
    if(smallFilterContainer.classList.contains('hidden')){
        hideFloatSortList();
    } else {
        fullAccordionDisplayProcess();
    }
});
/* End of Cerrar menús flotantes de ordenar y filtrar productos al dar click por fuera de cada uno
---------------------------------------------------------------------------------------------------------------- */

/*======================================  End of float sort list section  =======================================*/