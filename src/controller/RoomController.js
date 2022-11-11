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
          var isAddUser = false;
        //   roomData.rooms[0].players.push(user);
            const selectedRoom = roomData.rooms.find(item => item.id === Number(idRoom));

            roomData.rooms.forEach(room => {

                if(room.players.some(item => item.id === Number(user.id))){
                    isAddUser = true;
                }
                
            });

            if(selectedRoom.players.length < 2 && !isAddUser){
                selectedRoom.players.push(user);
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(roomData.rooms));
            }
            else if(selectedRoom.players.length === 2){
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({mssg: "The room is full! Please choose another room!"}));
            }
            else{
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({mssg: "You are already in a room, please exit the room!"}));
            }
        }
    
    }

    async deleteUserOnRoom(req,res){
        if (req) {
            const user =  JSON.parse(req.body);
            let idRoom = req.params.id;
            console.log('idRoom delete '+idRoom);
  
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

const roomController = new RoomController();
module.exports ={roomController};