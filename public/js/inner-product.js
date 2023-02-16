const quantitySelectorContainer = document.querySelector('.buying-section__quantity-selector');
const quantityInput = document.getElementById('quantity-input');

const inputMin = quantityInput.getAttribute('min');
const inputMax = quantityInput.getAttribute('max');


quantitySelectorContainer.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        stepper(e.target);
    }
});

const stepper = (btn) => {
    const inputId = btn.getAttribute('id');
    const inputStep = quantityInput.getAttribute('step');
    const inputValue = quantityInput.getAttribute('value');

    let calcInputStep = (inputId ===  'quantity-increment-btn') ? (inputStep * 1) : (inputStep * - 1);

    let newInputValue = parseInt(inputValue) + calcInputStep;

    if (newInputValue >= inputMin && newInputValue <= inputMax) {
        quantityInput.setAttribute('value' , newInputValue);
    }

    return newInputValue
}  