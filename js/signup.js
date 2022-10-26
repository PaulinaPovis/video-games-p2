import { WinStorage } from "./classes/WindowStorageManager.js";

/**
 * Nodos del DOM
 */
const form = document.getElementById('signup');
const avatars = document.querySelectorAll('.avatars img');
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

//TODO: Eliminar cuando este la conexión a backend
//Array de usuarios vacío
let users = [];
users = WinStorage.getParsed('users');
//TODO: Fin


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
            password: pass,
            repeatPass: repeatPass
        }
        // Si se selecciona una imagen para el avatar se asigna al objeto data
        if(!avatar){
            const randomImg = Math.floor(Math.random() * avatarPics.length);
            Object.assign(data, {avatar: avatarPics.find((item, index) => index === randomImg)});
        }
        else{
            Object.assign(data, {avatar: avatar});
        }
        
        console.log(data);
        
        //TODO: Eliminar cuando está la conexión con el backend
        //Simulación de una BBDD guardando los datos en localstorage.
        //Comprobamos si existe este dato en el localStorage
        if(users === null || users === undefined){
            //Si no existen guardamos directamente el Objeto data en el localStorage
            WinStorage.set('users', [data]);
            //window.location.reload();
        }
        else{
            //Si existen los datos los recuperamos y los metemos en el array users

            //Añadimos el nuevo usuario (Objeto data) al array users
            users.push(data);
            //Guardamos los nuevos datos en el localStorage
            WinStorage.set('users', users);
        }
        //TODO: Fin

        //Limpiamos los campos
        document.getElementById("signup").reset();
        window.location.href = '/login.html';
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