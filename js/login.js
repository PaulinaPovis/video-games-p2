//Importamos la clase que gestiona el localstorage
import { WinStorage } from "./classes/WindowStorageManager.js";

/**
 * Nodos del DOM
 */
const form = document.getElementById('login');

/**
 * Envío formulario Login
 */
form.addEventListener('submit', (e) => {
    /**
     * Prevenimos el comportamiento por defecto del navegador al enviar el
     * formulario para que no recargue la página
     */
    e.preventDefault();
    // Recogemos los campos del formulario
    const formData = new FormData(form);
    const email = formData.get('email');
    const pass = formData.get('pass');
    const invalidFields = document.querySelectorAll('.invalid-field');

    // Controlamos que los campos no vengan vacíos
    if(email !== '' && pass !== ''){
        console.log(email, pass)

        const data = {
            email: email,
            password: pass
        }
        //TODO: Eliminar cuando está la conexión con el backend
        //Simulación de una BBDD guardando los datos en localstorage.
        let users = WinStorage.getParsed('users');
        if(users !== null && users !== undefined){
            
            let userDB = users.find(user => user.email === email && user.password === pass)
            if(userDB !== undefined){
                WinStorage.set('currentUser', userDB)
                window.location.href = '/rooms.html';
            }
        }
        //TODO: Fin

        //FIXME: Cuando este la conexión con el backend
        // fetch('http://localhost:5000/register', {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {"Content-type": "application/json; charset=UTF-8"}
        // })
        // .then(response => response.json()) 
        // .then(json => console.log(json))
        // .catch(err => console.log(err))
        //FIXME: Fin
    }
    if(email === ''){
        invalidFields[0].innerHTML = 'Please enter your email';
    }
    else{
        invalidFields[0].innerHTML = '';
    }
    if(pass === ''){
        invalidFields[1].innerHTML = 'Please enter your password';
    }
    else{
        invalidFields[1].innerHTML = '';
    }


})