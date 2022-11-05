const  {roomData} = require('../data/RoomData');

class RoomController {


    async getAllRooms(req,res){
        //Necesarios para el control de error CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

        if (req) {
            console.log(req.body)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(roomData.rooms))
        }

        
  
    }

    async getRoomById(req,res){
        //Necesarios para el control de error CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

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
        //Necesarios para el control de error CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

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
        //Necesarios para el control de error CORS
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        
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

const roomController = new RoomController();
module.exports ={roomController};