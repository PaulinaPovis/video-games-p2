const  {roomData} = require('../data/RoomData');

class RoomController {


    async getAllRooms(req,res){

        if (req) {
            console.log(req.body)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(roomData.rooms))
        }

        
  
    }

    async getRoomById(req,res){
           
        if (req) {
            let id = req.params.id;
            console.log('id '+id);
            const room = roomData.rooms.find(u => u.id == id);
            console.log('room'+ room);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(room));
        }

    }



    async createRoom(req,res){

        if (req) {
          const room =  JSON.parse(req.body);
          // obtener un id randon 
          room.id=Math.floor(Math.random() * 1000000) + 10;
          


        roomData.rooms.push(room);

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(roomData.rooms));
        }
      


    }

    async addUserOnRoom(req,res){

        if (req) {
          const user =  JSON.parse(req.body);
          let idRoom = req.params.id;
          console.log('idRoom '+idRoom);

          roomData.rooms.forEach(r =>{
                if(u => u.id == idRoom){
                      r.players.push(user);  
                }
          });

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(roomData.rooms));
        }
    
    }


    async deleteUserOnRoom(req,res){
        if (req) {
            const user =  JSON.parse(req.body);
            let idRoom = req.params.id;
            console.log('idRoom '+idRoom);
  
            roomData.rooms.forEach(r =>{
                  if(u => u.id == idRoom){
                        const plays = r.players.filter(f  => f.id !=user.id);
                        r.players = plays;  
                  }
            });
  
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(roomData.rooms));
          }

    }
    
}

window.onload = function() {
    if(window.localStorage != null) {
        guardarRoom();
    }
}
  
function guardarRoom() {
    if(window.localStorage != null) {
        var name = getElementbyId("name");
        var name = Name_object.value;
        localStorage.setItem("name", name);
        var userName = getElementbyId("userName");
        var userName = userName_object.value;
        localStorage.setItem("userName", userName);
    }

  const roomLocalStorage = window.localStorage;
  const name = roomLocalStorage.getItem("name");

}

function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('image', this.innerHTML);
}

function handleDragEnd(e) {
    items.forEach(function (item) {
        item.classList.remove('over');
      });
}
  
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
  return false;
}

function handleDrop(e) {
    e.stopPropagation();
    return false;
}

let items = document.querySelectorAll('.draggable');
items.forEach(function(item) {
  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('dragend', handleDragEnd);
  item.addEventListener('drop', handleDrop);
});
