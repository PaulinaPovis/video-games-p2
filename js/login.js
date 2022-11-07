//Importamos la clase que gestiona el localstorage
import { WinStorage } from "./classes/WindowStorageManager.js";

/**
 * Nodos del DOM
 */
const form = document.getElementById('login');
const errorMessage = document.querySelector('.error-message');

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

        fetch('http://localhost:3000/api/login', {
            method: "POST",
            body: JSON.stringify(data)            
        })
        .then(data => data.json()) 
        .then(response => {

            if(response.mssg && response.mssg === 'The user does not exists! Please Sign-up!'){
                errorMessage.innerHTML = response.mssg;
                errorMessage.classList.remove('hide');
                errorMessage.classList.add('show');
            }
            else {
                //TODO: Eliminar cuando está la conexión con la BBDD
                //Simulación de una BBDD guardando los datos en localstorage.
                WinStorage.set('currentUser', response)
                //TODO: Fin

                window.location.href = '/rooms.html';
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