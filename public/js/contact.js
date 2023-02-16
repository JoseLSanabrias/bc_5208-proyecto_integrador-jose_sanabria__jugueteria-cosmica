/*=================================================================================================================
=                                          City List for contact from section                                     =
=================================================================================================================*/

const startAjax = (url, method = 'get') => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();
    return xhr;
};

const contactFormCityInput = document.getElementById('contact-form-city-input');

const cityList = startAjax('https://www.datos.gov.co/resource/xdk5-pm3f.json');

cityList.addEventListener('load', loadEvent =>{
    const xhrResponseHeader = loadEvent.target.getResponseHeader('content-type');

    if(loadEvent.target.status === 200 && xhrResponseHeader.includes('application/json')){
        try{
            const cityListText = loadEvent.target.responseText;
            const cityListArray = JSON.parse(cityListText);

            cityListArray.forEach(city => {
                const cityValue = city.c_digo_dane_del_municipio;
                
                if(cityValue.includes('.')){
                    const cleanCityValue = cityValue.replace('.', '');
                    
                    const optionElement = document.createElement('option');
                    optionElement.innerHTML = city.municipio;
                    optionElement.classList.add('contact-form__option');
                    optionElement.value = cleanCityValue;
                    
                    contactFormCityInput.appendChild(optionElement);
                };
            });
        }catch (error){
            console.log(error);
        };
    };
});

/*=================================  End of City List for contact from section  =================================*/

/*=================================================================================================================
=                                            Generic Validation Functions                                         =
=================================================================================================================*/

/*  Generate custom Validity message */
const setCustomValidityMsg = (validityMsg, inputElement) => {
    const inputWrapper = inputElement.closest('.contact-form__input-wrapper');
    const validityMsgWrapper = inputWrapper.querySelector('.contact-form__custom-validity-wrapper');
    validityMsgWrapper.innerHTML = validityMsg;
    validityMsgWrapper.classList.toggle('visible', validityMsg);
};

/*  Clean the content input */
const cleanInputValue = inputValue => {
    const trimValue = inputValue.trim();
    const valueLength = trimValue.length;
    return valueLength;
};

const getInputStyles = (validationMsg, inputElement) => {
    if(validationMsg){
        inputElement.classList.add('contact-form__input--no-valid');
        return;
    }
    if(!validationMsg){
        inputElement.classList.remove('contact-form__input--no-valid');
        inputElement.classList.add('contact-form__input--validated');
    }
};


/*  Validates a text input */
const validateTextInput = (inputElement, inputValue, minLength, maxLength, customValidityMessage) => {
    noValidateMsg = '';
    const cleanInputContent = cleanInputValue(inputValue);
    noValidateMsg = customValidityMessage(cleanInputContent, minLength, maxLength, inputValue)
    setCustomValidityMsg(noValidateMsg, inputElement);
    getInputStyles(noValidateMsg, inputElement);
    return encodeURIComponent(inputValue);
}

/*  Validates a email input */
const validateEmailInput = (inputElement, inputValue, customValidityMessage) => {
    noValidateMsg = '';
    const cleanInputContent = cleanInputValue(inputValue);
    noValidateMsg = customValidityMessage(cleanInputContent, inputValue, inputElement)
    setCustomValidityMsg(noValidateMsg, inputElement);
    getInputStyles(noValidateMsg, inputElement);
    return encodeURIComponent(inputValue);
}

/*  Validates a phone input */
const validateNumberInput = (inputElement, inputValue, customValidityMessage) => {
    noValidateMsg = '';
    noValidateMsg = customValidityMessage(inputValue)
    setCustomValidityMsg(noValidateMsg, inputElement);
    if(noValidateMsg){
        return;
    }
    return encodeURIComponent(inputValue);
}

/*  Validates a select input */
const validateSelectInput = (inputElement, customValidityMessage) => {
    noValidateMsg = '';
    noValidateMsg = customValidityMessage(inputElement)
    setCustomValidityMsg(noValidateMsg, inputElement);
    if(noValidateMsg){
        return;
    }
    return encodeURIComponent(inputElement.value);
}

/*====================================  End of Generic Validation Functions  ====================================*/




/*=================================================================================================================
=                                            Custom Validation functions                                          =
=================================================================================================================*/

let noValidateMsg;

/* Customer name custom validity message */
const getCxNameValidityMsg = (content, minLength, maxLength, inputValue) => {
    if(!content){
        noValidateMsg = 'El nombre es necesario para poder continuar.';
    } else if (content < minLength){
        noValidateMsg = `El nombre debe contener ${minLength} caracteres como mínimo.`;
    } else if (content > maxLength){
        noValidateMsg = `El nombre no puede tener más de ${maxLength} caracteres`;
    } else {
        const cxNameRegExp = new RegExp(`^[A-ZÁÉÍÓÚÑÜ][a-zA-ZáéíóúñüZÁÉÍÓÚÑÜ ]{${minLength - 1},${maxLength - 1}}$`);
        if (!cxNameRegExp.test(inputValue)){
            noValidateMsg = `Cada nombre y apellido debe estar escrito con la 
                primera letra en mayúsculas y el resto en minúsculas.`;
        }
    }
    return noValidateMsg;
};

/* Customer email custom validity message */
const getCxEmailValidityMsg = (content, inputValue, inputElement) => {
    const cxEmailRegExp = new RegExp(/^.+@{1}.+\..+$/);
    if(!content){
        noValidateMsg = 'El correo es necesario para poder continuar.';
    } else if (!cxEmailRegExp.test(inputValue)){
        noValidateMsg = `Se debe ingresar un correo válido`;
    } else {
        inputElement.setCustomValidity('');
    }
    return noValidateMsg;
};

/* Customer phone custom validity message */
const getCxPhoneValidityMsg = (inputValue) => {
    if(!inputValue){
        return;
    }
    if(!/^\(\+[0-9 ]*$/.test(inputValue)){
        noValidateMsg = 'Se debe especificar el indicativo entre paréntesis "(+)", sólo se permiten dígitos';
    } else {
        noValidateMsg = '';
    }
    return noValidateMsg;
};

/* Customer location custom validation message */
const getCxLocationValidityMsg = selectElement => {
    if(selectElement.selectedIndex === 0){
        noValidateMsg = 'Es necesario elegir una ubicación para poder continuar';
    }
    return noValidateMsg;
};

/* Customer zipCode custom validity message */
const getCxZipCodeValidityMsg = (inputValue) => {
    if(!inputValue){
        return;
    }
    if(!/^\d{6}$/.test(inputValue)){
        noValidateMsg = 'El código postal debe ser de 6 dígitos';
    } else {
        noValidateMsg = '';
    }
    return noValidateMsg;
};

/* Customer location custom validation message */
const getCxPQRValidityMsg = selectElement => {
    if(selectElement.selectedIndex === 0){
        noValidateMsg = 'Es necesario elegir una categoría de motivo para poder continuar';
    }
    return noValidateMsg;
};

/* Customer OrderID custom validity message */
const getCxOrderIDValidityMsg = (inputValue) => {
    if(!inputValue){
        return;
    }
    if(!/^\d{10}\-+\d{3}$/.test(inputValue)){
        noValidateMsg = 'Ingresar un número de orden válido (Ej: 0123456789-123)';
    } else {
        noValidateMsg = '';
    }
    return noValidateMsg;
};

/*=====================================  End of Custom Validation functions =====================================*/




/*=================================================================================================================
=                                                Validate Input Section                                           =
=================================================================================================================*/

const validateCxName = () => {
    const validCxName = validateTextInput(cxNameInput, cxNameInput.value, 3, 45, getCxNameValidityMsg);
    return validCxName;
};

const validateCxEmail = () => {
    const validCxName = validateEmailInput(cxEmailInput, cxEmailInput.value, getCxEmailValidityMsg);
    return validCxName;
};

const validateCxPhone = () => {
    const validCxPhone = validateNumberInput(cxPhoneInput, cxPhoneInput.value, getCxPhoneValidityMsg);
    return validCxPhone;
};

const validateLocation = () => {
    const validCategory = validateSelectInput(cxLocationInput, getCxLocationValidityMsg);
    return validCategory;
};

const validateCxZipCode = () => {
    const validCxPhone = validateNumberInput(cxZipCodeInput, cxZipCodeInput.value, getCxZipCodeValidityMsg);
    return validCxPhone;
};

const validateCxPQR = () => {
    const validCxPhone = validateSelectInput(cxPQRInput, getCxPQRValidityMsg);
    return validCxPhone;
};

const validateCxOrderId = () => {
    const validCxPhone = validateNumberInput(cxOrderIdInput, cxOrderIdInput.value, getCxOrderIDValidityMsg);
    return validCxPhone;
};

/*========================================  End of Validate Input Section =======================================*/




/*=================================================================================================================
=                                          Register Form Validation Section                                       =
=================================================================================================================*/

const contactForm = document.querySelector('.contact-form');
const cxNameInput = document.getElementById('contact-form-name-input');
const cxEmailInput = document.getElementById('contact-form-email-input');
const cxPhoneInput = document.getElementById('contact-form-phone-input');
const cxLocationInput = document.getElementById('contact-form-city-input');
const cxZipCodeInput = document.getElementById('contact-form-zip-code-input');
const cxPQRInput = document.getElementById('contact-form-pqr-input');
const cxOrderIdInput = document.getElementById('contact-form-order-id-input');

cxEmailInput.addEventListener('input', e => {
    cxEmailInput.setCustomValidity(' ');
    validateCxEmail();
});

cxPhoneInput.addEventListener('input', e => {
    validateCxPhone();
});

cxZipCodeInput.addEventListener('input', e => {
    validateCxZipCode();
});

cxOrderIdInput.addEventListener('input', e => {
    validateCxOrderId();
});

const registerValidityInputEvent = (input, validityFunction) => {
    input.addEventListener('input', () => {
        contactForm.reportValidity();
        validityFunction();
    });
};

const registerValidityChangeEvent = (input, validityFunction) => {
    input.addEventListener('change', e => {
        contactForm.reportValidity();
        validityFunction();
    });
};

const addValidInputToArray = (validityFunction, outputArray) => {
    const validInput = validityFunction();
    if(validInput){
        outputArray.push(validInput);
    }
    return outputArray;
};

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const customerValidationArray = [];
    
    addValidInputToArray(validateCxName, customerValidationArray);
    addValidInputToArray(validateCxEmail, customerValidationArray);
    addValidInputToArray(validateLocation, customerValidationArray);
    addValidInputToArray(validateCxPQR, customerValidationArray);

    
    if (customerValidationArray.length === 4){
        e.target.submit();
    }
});

registerValidityInputEvent(cxNameInput, validateCxName);
registerValidityInputEvent(cxEmailInput, validateCxEmail);
registerValidityChangeEvent(cxLocationInput, validateLocation);
registerValidityChangeEvent(cxPQRInput, validateCxPQR);

/*===================================  End of Register Form Validation Section ==================================*/












