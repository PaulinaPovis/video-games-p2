import { WinStorage } from "./classes/WindowStorageManager.js";

const elementRooms = document.querySelectorAll('.card');
const titleRooms = document.querySelectorAll('.card-text');
const imageRooms = document.querySelectorAll('.card-header img');


fetch('http://localhost:3000/api/rooms')
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

// Función que asigna un click a cada room y salva la room seleccionada en el localStorage
function saveRoom(){
    elementRooms.forEach(element => {
        element.addEventListener('click', () => {
            
            let user = WinStorage.getParsed('currentUser');
            
            fetch('http://localhost:3000/api/rooms/' + element.id + '/users', {
                method: "POST",
                body: JSON.stringify(user)            
            })
                .then(data => data.json()) 
                .then(response => {
                    console.log(response)
                    const room = response.find(item => item.id === Number(element.id));
                    WinStorage.set('roomSelected', room);
                })
                .catch(err => console.error(err))
            
        });

    });
}


    