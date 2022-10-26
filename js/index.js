import { User } from "./classes/User.js";
import { WinStorage } from "./classes/WindowStorageManager.js";

/**
 * Recogemos nodos del DOM
 */
const menuHideOnLogin = document.getElementById('menu-hide-on-login');
const menuLogout = document.getElementById('menu-show-on-login');
const userDetail = document.getElementById('user-detail');

if(!User.isLoged()){
    // Si el usuario no está logueado se va a ocultar el boton de logout
    menuLogout.classList.add('hide')
    menuHideOnLogin.classList.remove('hide');

    userDetail.classList.add('hide');
    userDetail.classList.remove('user-detail');

}
else{
    //Si el usuario esta logueado se muestra el boton logout y se ocultan los botones login y register
    menuLogout.classList.remove('hide');
    menuHideOnLogin.classList.add('hide');

    userDetail.classList.remove('hide');
    userDetail.classList.add('user-detail');
    document.querySelector('#user-detail span').innerHTML = User.getUser().userName;
    document.querySelector('#user-detail img').src = 'img/avatar-' + User.getUser().avatar.id + '.jpg'


    const btnLogout = document.getElementById('btn-logout');
    btnLogout.addEventListener('click', function(){
        WinStorage.removeItem('currentUser');
        window.location.reload();
    })
}

