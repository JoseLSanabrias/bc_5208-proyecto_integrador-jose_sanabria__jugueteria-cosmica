
    /*=================================================================================================================
    =                                            Generic Validation Functions                                         =
    =================================================================================================================*/
    
    /*  Generate custom Validity message */
    const setCustomValidityMsg = (validityMsg, inputElement) => {
        const inputWrapper = inputElement.closest('.edit-form__input-wrapper');
        const validityMsgWrapper = inputWrapper.querySelector('.edit-form__custom-validity-wrapper');
        validityMsgWrapper.innerHTML = validityMsg;
        validityMsgWrapper.classList.toggle('visible', validityMsg);
    };

    /*  Clean the content input */
    const cleanInputValue = inputValue => {
        const trimValue = inputValue.trim();
        const valueLength = trimValue.length;
        return valueLength;
    };
    
    /*  Validates a text input */
    const validateTextInput = (inputElement, inputValue, minLength, maxLength, customValidityMessage) => {
        noValidateMsg = '';
        const cleanInputContent = cleanInputValue(inputValue);
        noValidateMsg = customValidityMessage(cleanInputContent, minLength, maxLength, inputValue)
        setCustomValidityMsg(noValidateMsg, inputElement);
        if(noValidateMsg){
            inputElement.classList.add('edit-form__input--no-valid');
            return;
        }
        if(!noValidateMsg){
            inputElement.classList.remove('edit-form__input--no-valid');
            inputElement.classList.add('edit-form__input--validated');
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

    /*  Validates a file input */
    const validateFileInput = (fileInputEl, minLength, maxLength, customValidityMessage) => {
        noValidateMsg = '';
        noValidateMsg = customValidityMessage(fileInputEl, minLength, maxLength,)
        setCustomValidityMsg(noValidateMsg, fileInputEl);
        if(noValidateMsg){
            return;
        }
        return encodeURIComponent(fileInputEl.files);
    }

    /*====================================  End of Generic Validation Functions  ====================================*/




    /*=================================================================================================================
    =                                            Custom Validation functions                                          =
    =================================================================================================================*/

    let noValidateMsg;

    /* Toy name custom validation message */
    const getToyNameValidityMsg = (content, minLength, maxLength, inputValue) => {
        if(!content){
            noValidateMsg = 'El nombre es necesario para poder continuar.';
        } else if (content < minLength){
            noValidateMsg = `El nombre debe contener ${minLength} caracteres como mínimo.`;
        } else if (content > maxLength){
            noValidateMsg = `El nombre no puede tener más de ${maxLength} caracteres`;
        } else {
            const toyNameRegExp = new RegExp(`^[A-ZÁÉÍÓÚÑÜ][a-zA-ZáéíóúñüZÁÉÍÓÚÑÜ0-9|\.\&'’® -]{${minLength - 1},${maxLength - 1}}$`);
            if (!toyNameRegExp.test(inputValue)){
                noValidateMsg = `Cada palabra debe estar escrita con la 
                    primera letra en mayúsculas y el resto en minúsculas.`;
            }
        }
        return noValidateMsg;
    };

    /* Toy price custom validation message */
    const getPriceValidityMsg = (content, minLength, maxLength, inputValue) => {
        if(!content){
            noValidateMsg = 'El precio es necesario para continuar.';
        } else if (!/^[1-9]\d*$/.test(inputValue)){
            noValidateMsg = 'Debe ingresarse un monto válido (sólo números del 0 al 9 iniciando por uno diferente a 0)';
        } else if (content < minLength){
            noValidateMsg = `El precio debe contener ${minLength} dígitos mínimo.`;
        } else if (content > maxLength){
            noValidateMsg = `El precio no debe superar los ${maxLength} dígitos.`;
        }
        return noValidateMsg;
    };

    /* Toy stock custom validation message */
    const getStockValidityMsg = (content, minLength, maxLength, inputValue) => {
        const priceRegExp = new RegExp(/^\d*$/);

        if (!priceRegExp.test(inputValue)){
            noValidateMsg = 'Sólo se permite número de 0 al 9 (no letras, no símbolos)';
        } else if(!content){
            noValidateMsg = 'El stock del producto es necesario para continuar.';
        } else if (content < minLength){
            noValidateMsg = `El stock debe contener ${minLength} dígitos mínimo.`;
        } else if (content > maxLength){
            noValidateMsg = `El stock no debe superar los ${maxLength} dígitos.`;
        }
        return noValidateMsg;
    };

    /* Toy brand custom validation message */
    const getToyBrandValidityMsg = (content, minLength, maxLength, inputValue) => {
        if(!content){
            noValidateMsg = 'La marca es necesaria para poder continuar.';
        } else if (content < minLength){
            noValidateMsg = `La marca debe contener ${minLength} caracteres como mínimo.`;
        } else if (content > maxLength){
            noValidateMsg = `La marca no puede tener más de ${maxLength} caracteres`;
        } else {
            const toyBrandRegExp = new RegExp(`^[A-ZÁÉÍÓÚÑÜ][a-zA-ZáéíóúñüZÁÉÍÓÚÑÜ0-9|\.\&'’® -]{${minLength - 1},${maxLength - 1}}$`);
            if (!toyBrandRegExp.test(inputValue)){
                noValidateMsg = `El nombre de la marca debe estar escrito con la primera letra en Mayúscula`;
            }
        }
        return noValidateMsg;
    };
    
    /* Toy category custom validation message */
    const getToyCategoryValidityMsg = selectElement => {
        if(selectElement.selectedIndex === 0){
            noValidateMsg = 'Es necesario elegir una categoría para poder continuar';
        }
        return noValidateMsg;
    };
    
    /* Toy brand custom validation message */
    const getDescriptionValidityMsg = (content, minLength, maxLength, inputValue) => {
        if(!content){
            noValidateMsg = 'Esta descripción es necesaria para poder continuar.';
        } else if (content < minLength){
            noValidateMsg = `La descripción debe contener ${minLength} caracteres como mínimo.`;
        } else if (content > maxLength){
            noValidateMsg = `La descripción no puede tener más de ${maxLength} caracteres`;
        } else {
            const shortDescriptionRegExp = new RegExp(`^[a-zA-ZáéíóúüñÁÉÓÚÜÑ0-9_.,¿?()® -]{${minLength - 1},${maxLength - 1}}$`);
            if (!shortDescriptionRegExp.test(inputValue)){
                noValidateMsg = `Solo se aceptan caracteres del español, no símbolos/caracteres especiales`;
            }
        }
        return noValidateMsg;
    };

    /* Toy age custom validation message */
    const getToyAgeValidityMsg = selectElement => {
        if(selectElement.selectedIndex === 0){
            noValidateMsg = 'Es necesario elegir un rango de edad para poder continuar.';
        }
        return noValidateMsg;
    };

    /* Toy photo validation message */
    const getPhotoValidityMsg = (fileInputEl, minLength, maxLength,) => {
        const filesQuantity = fileInputEl.files.length;
        if(filesQuantity < minLength){
            noValidateMsg = `Se debe seleccionar los ${maxLength} archivos válidos.`;
        } else if (filesQuantity > maxLength){
            noValidateMsg = `No se aceptan más de ${maxLength} archivos válidos.`;
        }
        return noValidateMsg;
    };


    /*=====================================  End of Custom Validation functions =====================================*/




    /*=================================================================================================================
    =                                                Validate Input Section                                           =
    =================================================================================================================*/
    
    const validateToyName = () => {
        const validToyName = validateTextInput(nameInput, nameInput.value, 3, 45, getToyNameValidityMsg);
        return validToyName;
    };

    const validatePrice = () => {
        const validPriceInput = validateTextInput(priceInput, priceInput.value, 4, 11, getPriceValidityMsg);
        return validPriceInput;
    };

    const validateStock = () => {
        const validPriceInput = validateTextInput(stockInput, stockInput.value, 1, 3, getStockValidityMsg);
        return validPriceInput;
    };

    const validateBrand = () => {
        const validPriceInput = validateTextInput(brandInput, brandInput.value, 3, 45, getToyBrandValidityMsg);
        return validPriceInput;
    };

    const validateCategory = () => {
        const validCategory = validateSelectInput(categoryInput, getToyCategoryValidityMsg);
        return validCategory;
    };

    const validateShortDescription = () => {
        const validShortDescription = validateTextInput(shortDescriptionInput, shortDescriptionInput.value, 10, 65, getDescriptionValidityMsg);
        return validShortDescription;
    };

    const validateLongDescription = () => {
        const validLongDescription = validateTextInput(longDescriptionInput, longDescriptionInput.value, 10, 290, getDescriptionValidityMsg);
        return validLongDescription;
    };
    
    const validateAgeRank = () => {
        const validAgeRank = validateSelectInput(ageRankInput, getToyAgeValidityMsg);
        return validAgeRank;
    };

    const validateFiles = () => {
        const validFiles = validateFileInput(photoInput, 2, 4, getPhotoValidityMsg);
        return validFiles;
    };
    
    /*========================================  End of Validate Input Section =======================================*/




    /*=================================================================================================================
    =                                          edit Form Validation Section                                       =
    =================================================================================================================*/

    const editForm = document.querySelector('.edit-form');
    const nameInput = document.getElementById('edit-form-name-input');
    const priceInput = document.getElementById('edit-form-price-input');
    const stockInput = document.getElementById('edit-form-stock-input');
    const brandInput = document.getElementById('edit-form-brand-input');
    const categoryInput = document.getElementById('edit-form-category-input');
    const shortDescriptionInput = document.getElementById('edit-form-short-description');
    const longDescriptionInput = document.getElementById('edit-form-long-description');
    const ageRankInput = document.getElementById('edit-form-long-min-age');
    const photoInput = document.getElementById('edit-form-photos');

    photoInput.addEventListener('change', () => {
        validateFiles();
    });


    const editValidityInputEvent = (input, validityFunction) => {
        input.addEventListener('input', () => {
            editForm.reportValidity();
            validityFunction();
        });
    };

    const editValidityChangeEvent = (input, validityFunction) => {
        input.addEventListener('change', e => {
            editForm.reportValidity();
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

    editForm.addEventListener('submit', e => {
        e.preventDefault();

        const toyValidationArray = [];
        
        addValidInputToArray(validateToyName, toyValidationArray);
        addValidInputToArray(validatePrice, toyValidationArray);
        addValidInputToArray(validateStock, toyValidationArray);
        addValidInputToArray(validateBrand, toyValidationArray);
        addValidInputToArray(validateCategory, toyValidationArray);
        addValidInputToArray(validateShortDescription, toyValidationArray);
        addValidInputToArray(validateLongDescription, toyValidationArray);
        addValidInputToArray(validateAgeRank, toyValidationArray);
        addValidInputToArray(validateFiles, toyValidationArray);
    
        if (toyValidationArray.length === 9){
            e.target.submit();
        }

    });

    editValidityInputEvent(nameInput, validateToyName);
    editValidityInputEvent(priceInput, validatePrice);
    editValidityInputEvent(stockInput, validateStock);
    editValidityInputEvent(brandInput, validateBrand);
    editValidityChangeEvent(categoryInput, validateCategory);
    editValidityInputEvent(shortDescriptionInput, validateShortDescription);
    editValidityInputEvent(longDescriptionInput, validateLongDescription);
    editValidityChangeEvent(ageRankInput, validateAgeRank);

    /*===================================  End of edit Form Validation Section ==================================*/

