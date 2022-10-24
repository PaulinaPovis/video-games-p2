/**
 * Clas encargade de la gestión del localStorage
 */
export class WinStorage{
    /**
     * Setea un elemento en el localStorage
     * @param {String} key Clave/Nombre del elemento
     * @param {Object | Array} item Valor del elemento
     */
    static set(key, item){
        window.localStorage.setItem(key, JSON.stringify(item))
    };

    /**
     * Recupera un elemento del localStorage
     * @param {String} key Clave/Nombre del elemento
     * @return {Object | Array} Objeto o Array con los datos
     */
    static get(key){
        return window.localStorage.getItem(key)
    };

    /**
     * Recupera un elemento del localStorage y lo parsea
     * @param {String} key Clave/Nombre del elemento
     * @return {Object | Array} Objeto o Array con los datos parseados
     */
    static getParsed(key){
        return JSON.parse(window.localStorage.getItem(key))
    }
    /**
     * Borra un elemento del localstorage
     * @param {String} key Clave/Nombre del elemento
     */
    static removeItem(key){
        window.localStorage.removeItem(key);
    }
    /**
     * Borra todos los elementos del localstorage
     */
     static removeAll(){
        window.localStorage.clear();
    }
}