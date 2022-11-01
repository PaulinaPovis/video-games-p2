import { WinStorage } from "./classes/WindowStorageManager.js";

/**
 * Nodos del DOM
 */
const form = document.getElementById('signup');
const avatars = document.querySelectorAll('.avatars img');
const errorMessage = document.querySelector('.error-message');
let selectedAvatar = undefined;

const avatarPics = [
    {
        id: '1',
        name: 'Furious',
        message: 'Meaww!!'
    },
    {
        id: '2',
        name: 'Sweety',
        message: 'Yummy!!'
    },
    {
        id: '3',
        name: 'Blue',
        message: 'Grrrrr!!'
    },
    {
        id: '4',
        name: 'Draco',
        message: 'We are gonna have fun!!'
    }
];

const avatarOutput = document.getElementById('avatar-output');


avatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
        selectedAvatar = avatarPics.find(item => item.id === avatar.getAttribute('data-id'));
        avatarOutput.innerHTML = 'You choose the avatar ' + selectedAvatar.name + ', ' + selectedAvatar.message;
    });
});

/**
 * Envío formulario Registro
 */
form.addEventListener('submit', (e) => {
    /**
     * Prevenimos el comportamiento por defecto del navegador al enviar el
     * formulario para que no recarge la página
     */
    e.preventDefault();
    // Recogemos los campos del formulario
    const formData = new FormData(form);
    const avatar = selectedAvatar;
    const username = formData.get('username');
    const email = formData.get('email');
    const pass = formData.get('pass');
    const repeatPass = formData.get('repeatPass');
    
    // Se recoge array de campos para mostrar errores
    const invalidFields = document.querySelectorAll('.invalid-field');

    // Controlamos que los campos no vengan vacíos
    if(username !== '' && email !== '' && pass !== '' && repeatPass !== '' && pass === repeatPass){
        // OK mandar el formulario al back
        const data = {
            userName: username,
            email: email,
            password: pass
        }
        // Si se selecciona una imagen para el avatar se asigna al objeto data
        if(!avatar){
            const randomImg = Math.floor(Math.random() * avatarPics.length);
            Object.assign(data, {avatar: avatarPics.find((item, index) => index === randomImg)});
        }
        else{
            Object.assign(data, {avatar: avatar});
        }

        fetch('http://localhost:3000/api/users', {
            method: "POST",
            body: JSON.stringify(data)            
        })
        .then(data => data.json()) 
        .then(response => {
            if(response.mssg && response.mssg === 'The user already exists!'){
                errorMessage.innerHTML = response.mssg;
                errorMessage.classList.remove('hide');
                errorMessage.classList.add('show');
            }
            else{
                //Limpiamos los campos
                document.getElementById("signup").reset();
                //TODO: Eliminar cuando está la conexión con la BBDD
                //Simulación de una BBDD guardando los datos en localstorage.
                WinStorage.set('currentUser', response)
                //TODO: Fin
                window.location.href = '/login.html';
            }
            console.log('Respuesta front fetch', response)
        })
        .catch(err => {
            errorMessage.innerHTML = err;
            errorMessage.classList.remove('hide');
            errorMessage.classList.add('show');
            console.log('Error fetch front', err);
        })
    }
    if(username === ''){
        invalidFields[0].innerHTML = 'Please enter your Username';
    }
    else{
        invalidFields[0].innerHTML = '';
    }
    if(email === ''){
        invalidFields[1].innerHTML = 'Please enter your email';
    }
    else{
        invalidFields[1].innerHTML = '';
    }
    if(pass === ''){
        invalidFields[2].innerHTML = 'Please enter your password';
    }
    else{
        invalidFields[2].innerHTML = '';
    }
    if(repeatPass === ''){
        invalidFields[3].innerHTML = 'Please repeat your password';
    }
    else if(repeatPass !== pass){
        invalidFields[3].innerHTML = 'Your password does not match';
    }
    else{
        invalidFields[3].innerHTML = '';
    }


})