import { WinStorage } from "./WindowStorageManager.js";
/**
 * Clase encargada de la gestión del usuario
 */
export class User{

    static isLoged(){

        let users = WinStorage.getParsed('users');
        let currentUser = WinStorage.getParsed('currentUser');
        if(users !== null && users !== undefined && currentUser !== null && currentUser !== undefined){
            
            let userDB = users.find(user => user.email === currentUser.email && user.password === currentUser.password);
            
            if(userDB === undefined){
                return false
            }
            return true
        }
        return false
    }

    static getUser(){

        return WinStorage.getParsed('currentUser');
    }
}