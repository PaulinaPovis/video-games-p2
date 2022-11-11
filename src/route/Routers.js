const { userController } = require('../controller/UserController');
const { roomController } = require('../controller/RoomController');
const { user } = require('../model/User');
class Routers {
    /** 
     * Guarda aquí todas tus rutas: {method:'get', path: '/foo/:id', controller: callback}
    */

    routes = [
        { method: 'get', path: '/users', controller: userController.getAllUsers },
        { method: 'get', path: '/users/:id', controller: userController.getUserById },
        { method: 'post', path: '/users', controller: userController.createUser },
        { method: 'delete', path: '/users', controller: userController.deleteUser },
        { method: 'post', path: '/login', controller: userController.login },
        { method: 'get', path: '/rooms', controller: roomController.getAllRooms },
        { method: 'get', path: '/rooms/:id', controller: roomController.getRoomById },
        { method: 'post', path: '/rooms', controller: roomController.createRoom },
        { method: 'post', path: '/rooms/:id/users', controller: roomController.addUserOnRoom},
        { method: 'post', path: '/rooms/:id/delete-user', controller: roomController.deleteUserOnRoom},
        

    ]

}
const routers = new Routers()
module.exports = { routers }