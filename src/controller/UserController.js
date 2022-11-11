const  {userData} = require('../data/UserData');
class UserController {


    async getAllUsers(req,res){

        if (req) {
            console.log(req.body)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(userData.users))
        }

        
  
    }

    async getUserById(req,res){

        if (req) {
            let id = req.params.id;
            console.log('id '+id);
            const user = userData.users.find(u => u.id == id);
            console.log('user'+ user);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user));
        }

    }



    async createUser(req,res){

        if (req) {
        const user =  JSON.parse(req.body);
        // obtener un id randon 
        user.id=Math.floor(Math.random() * 1000000) + 10;
        const existe = userData.users.find(u =>(u.email == user.email));
        console.log('user'+user);

            if(user.userName !== '' && user.email !== '' && user.password !== ''){
                if(!existe){

                    userData.users.push(user);

                    res.writeHead(201, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify(user));
                }
                else{
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({mssg: "The user already exists!"}));
                }
            }
            else{
                res.writeHead(422, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({mssg: "Invalid data"}));
            }

        }
    }

    async deleteUser(req,res){


    }

    async login(req,res){
        if (req) {
            
            const userBody =  JSON.parse(req.body);
            const existe = userData.users.find(u =>(u.email == userBody.email && u.password == userBody.password));
            
            if(existe){
                res.writeHead(200, { 'Content-Type': 'application/json' });
            }
            else if(!existe){
                res.end(JSON.stringify({mssg: "The user does not exists! Please Sign-up!"}));
            }
            else 
                res.writeHead(400, { 'Content-Type': 'application/json' });

            res.end(JSON.stringify(existe));    


        } 

    }

    
}

const userController = new UserController();
module.exports ={userController};