import PasswordValidator from 'password-validator';

// Create a schema
const schema = new PasswordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces



function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
    if (value == "") {
        setEmailError("")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Email no valido")
    }
}

function validatePassword(value, setPasswordError) {
    if (!schema.validate(value)) {
        setPasswordError("Al menos 8 caracteres, una mayúscula, una minúscula y un número")
    } else {
        setPasswordError("")
    }
}

const utils = {
    isValidEmail,
    validateEmail,
    validatePassword
};

export default utils;