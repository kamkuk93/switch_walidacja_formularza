const loginBtn = document.querySelector("#login-btn");
const signinBtn = document.querySelector("#signin-btn");
const underline = document.querySelector('.underline');

const loginFormBox = document.querySelector('.login-box')
const signinFormBox = document.querySelector('.signin-box')

const signinInputEmail = document.querySelector('#signin-input-email');
const signinInputPassword = document.querySelector('#signin-input-password');
const signinInputPasswordTwo = document.querySelector('#signin-input-password-two');

const signinBtnSend = document.querySelector('.submit-btn-second');


const checkBoxTos = document.querySelector('#tos');
const checkBoxTosSquare = document.querySelector('.tos-input-box');
const textLabel = document.querySelector('.tos-label');

let firstCorrectInput = false;
let secondCorrectInput = false;
let thirdCorrectInput = false;
let fourthCorrectInput = false;

// let $tab = [];


const loginBtnSend = document.querySelector('.login-btn-send');

const loginInputEmail = document.querySelector('#login-input-email');
const loginInputPassword = document.querySelector('#login-input-password');

let validEmail = false;
let validPassword = false;


// Kliknięcie na przycisk zaloguj się

const activeLoginBtn = () => {
    loginBtn.classList.add('active-btn');
    signinBtn.classList.remove('active-btn');
    signinBtn.classList.add('unactive-btn');
    underline.classList.remove('underline-right')
    // zmiana boxa formularza
    loginFormBox.style.display = "block"
    signinFormBox.style.display = "none"
}


// Kliknięcie na przycisk zarejestruj się

const activeSigninBtn = () => {
    signinBtn.classList.add('active-btn');
    loginBtn.classList.remove('active-btn');
    loginBtn.classList.add('unactive-btn');
    underline.classList.add('underline-right')
    // zmiana boxa formularza
    loginFormBox.style.display = "none"
    signinFormBox.style.display = "block"
}


const showError = (input, msg) => {
    const formBox = input.parentElement.parentElement;
    const errorMsg = formBox.querySelector('.signin-error');
    errorMsg.style.color = "red";
    errorMsg.textContent = msg;
}


const clearError = input => {
    const formBox = input.parentElement.parentElement;
    const errorMsg = formBox.querySelector('.signin-error');
    errorMsg.style.color = '#F7F7F7';
    errorMsg.textContent = 'ok';
}


const checkForm = input => {
    input.forEach(el => {
        if (el.value === '') {
            showError(el, 'Uzupełnij pole')
        } else {
            clearError(el);
        }
    })
}


const checkEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value)) {
        clearError(email);
        firstCorrectInput = true;
    } else {
        showError(email, 'Email jest niepoprawny');
        firstCorrectInput = false;
    }
}


const checkLength = (input, min) => {
    const uppercase = /[A-Z]{1}/g;
    if (input.value.length < min) {
        showError(input, `Za mało liter`);
        secondCorrectInput = false;
    } else if (uppercase.test(input.value)) {
        clearError(input);
        secondCorrectInput = true;
    } else {
        showError(input, `Brak dużej litery`)
        secondCorrectInput = false;

    }
};

const checkPassword = (pass1, pass2) => {
    if (pass1.value !== pass2.value) {
        showError(pass2, `Hasła do siebie nie pasują`);
        thirdCorrectInput = false;
    } else {
        thirdCorrectInput = true;
    }
};


const checkCheckBox = (e) => {
    if (e.checked === true) {
        fourthCorrectInput = true;
        checkBoxTosSquare.classList.remove('tos-input-box-error')
        textLabel.style.color = "black"
    } else {
        checkBoxTosSquare.classList.add('tos-input-box-error')
        textLabel.style.color = "#ED1C24"
        fourthCorrectInput = false;
    }
}


const checkCorrectInputs = () => {
    if (firstCorrectInput === true && secondCorrectInput === true && thirdCorrectInput === true && fourthCorrectInput === true) {
        saveToArr([signinInputEmail, signinInputPassword, signinInputPasswordTwo]);
        activeLoginBtn()
    }
}


const saveToArr = input => {
    tab = [];
    input.forEach(element => {
        tab.push(element.value);
    })
    console.log(tab);
}


const isCorrectEmail = (input, tab) => {
    if (input.value === tab[0]) {
        console.log('Poprawny email');
        validEmail = true;
    } else {
        console.log('zły email');
        validEmail = false;
    }
}

const isCorrectPassword = (input, tab) => {
    if (input.value === tab[1]) {
        console.log('Poprawne hasło');
        validPassword = true;
    } else {
        console.log('złe hasło');
        validPassword = false;
    }
}

const validData = () => {



    if (validEmail === true && validPassword === true) {
        console.log('poprawne dane');
        newView();
    }
}


const newView = () => {
    window.location = "/process.html";

}


loginBtn.addEventListener('click', activeLoginBtn);
signinBtn.addEventListener('click', activeSigninBtn);



checkBoxTos.addEventListener('click', () => {
    checkBoxTosSquare.classList.remove('tos-input-box-error')
    textLabel.style.color = "black"
})


// Singin Send

signinBtnSend.addEventListener('click', e => {
    e.preventDefault();
    checkForm([signinInputEmail, signinInputPassword, signinInputPasswordTwo]);
    checkEmail(signinInputEmail);
    checkLength(signinInputPassword, 5);
    checkPassword(signinInputPassword, signinInputPasswordTwo);
    checkCheckBox(checkBoxTos);
    checkCorrectInputs();

})


loginBtnSend.addEventListener('click', e => {
    e.preventDefault();
    isCorrectEmail(loginInputEmail, tab);
    isCorrectPassword(loginInputPassword, tab);
    validData();

    // newView();
})



