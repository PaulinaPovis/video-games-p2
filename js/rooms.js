import { WinStorage } from "./classes/WindowStorageManager.js";

const elementRooms = document.querySelectorAll('.card');
const titleRooms = document.querySelectorAll('.card-text');
const imageRooms = document.querySelectorAll('.card-header img');
const errorMessage = document.querySelector('.error-message');
const user = WinStorage.getParsed('currentUser');
$('#btn-go').prop('disabled', true);
//Drag and Drop
//Recogemos los elementos del DOM. El avatar y las tarjetas donde queremos que entre el avatar
const imagen = document.querySelector('#avatar-output img');
const cardItems = document.querySelectorAll('.card');
//Fin Drag and Drop

function setRooms(){
    return fetch('http://localhost:3000/api/rooms')
        .then(data => data.json()) 
        .then(response => {

            response.forEach((item, index) => {
                elementRooms[index].id = item.id;
                titleRooms[index].innerHTML = item.name;
                imageRooms[index].src = 'img/' + item.image + '.jpg';
            });

            saveRoom();

        })
        .catch(err => console.log('Error fetch front', err))
}

setRooms();

//Drag and Drop
//Asignamos un escuchador al avatar con el evento DragStart
imagen.addEventListener('dragstart', handleImageDragStart)

//Función que se ejecuta tras el evento DragStart del avatar
function handleImageDragStart(e) {

    //Asignamos el usuario del localStorage al objeto DataTransfer
    e.dataTransfer.setData('currentUser', JSON.stringify(user));

    e.dataTransfer.setDragImage(e.target, 50,50);

}

// Recorremos el array de las cards
cardItems.forEach(item => {
    //Asignamos un escuchador a cada card con el evento DragOver
    item.addEventListener('dragover', allowDrop);
    //Asignamos un escuchador a cada card con el evento Drop
    item.addEventListener('drop', drop);
    
});

//Función para recoger el elemento soltado
function drop(ev) {
    //Previene el comportamiento por defecto del navegador
    ev.preventDefault();    

}

//Función necesaria para permitir el Drag and Drop
function allowDrop(ev) {
    ev.preventDefault();
}

//Fin Drag and Drop


// Función que asigna un click a cada room y salva la room seleccionada en el localStorage
function saveRoom(){
    elementRooms.forEach(element => {
        element.addEventListener('dragover', allowDrop);
        element.addEventListener('drop', (ev) => {
            
            //Previene el comportamiento por defecto del navegador
            ev.preventDefault();
            //Creamos una variable a la que se le asigna el valor de lo que contiene el objeto dataTransfer
            const currentUser = ev.dataTransfer.getData("currentUser");

            if(!currentUser){
                //Animación jQuery
                showAlert('unsuccess', 'Please drag & drop your avatar!', {
                    "bottom": '0' 
                })
            }
            else{
                fetch('http://localhost:3000/api/rooms/' + element.id + '/users', {
                    method: "POST",
                    body: currentUser           
                })
                .then(data => data.json()) 
                .then(response => {

                    if(response.mssg && response.mssg === 'The room is full! Please choose another room!' || response.mssg && response.mssg === 'You are already in a room, please exit the room!'){
                        errorMessage.innerHTML = response.mssg;
                        errorMessage.classList.remove('hide');
                        errorMessage.classList.add('show');

                        //Animación jQuery
                        hideAlert();
                    }
                    else {
                        errorMessage.innerHTML = "";
                        console.log('Respuesta front fetch', response)


                        console.log(response)
                        const room = response.find(item => item.id === Number(element.id));
                        WinStorage.set('roomSelected', room);

                        //Animación jQuery
                        const alertMessage = 'You choose the ' + room.name + ' Press Go! to enter.';
                        showAlert('success', alertMessage, {
                            "bottom": '0' 
                        });
                        //Fin Animación jQuery
                        $('#btn-go').prop('disabled', false);
                        
                    }
                    
                })
                .catch(err => {
                    console.error(err);
                    errorMessage.innerHTML = err;
                    errorMessage.classList.remove('hide');
                    errorMessage.classList.add('show');
                    console.log('Error fetch front', err);
                });
            }
            
        });

    });
};

//Función mostrar alerta animación jQuery
function showAlert(type, text, animation) {
    const alertRoom = $('.alert-room');
    if(type === 'success'){
        alertRoom.removeClass('unsuccess')
    }
    else{
        alertRoom.removeClass('success')
    }
    alertRoom.addClass(type);
    alertRoom.text(text);
    alertRoom.animate(animation);
};

//Función ocultar alerta animación jQuery
function hideAlert(){
    $('.alert-room').animate({
        "bottom": '-100%' 
    });
}

//función asignar avatar escogido
if(user !== null && user !== undefined){
    fetch('http://localhost:3000/api/users/' + user.id)
            .then(data => data.json())
            .then(response => {
                const image = document.querySelector('#avatar-output img');
                image.src ='img/avatar-' + response.avatar.id + '.jpg';
                image.setAttribute('id', response.avatar.id);
            
            })
}
else{
    window.location.href = '/login.html';
}


    