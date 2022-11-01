import { WinStorage } from "./classes/WindowStorageManager.js";

/**
 * Recogemos nodos del DOM
 */
const menuHideOnLogin = document.getElementById('menu-hide-on-login');
const menuLogout = document.getElementById('menu-show-on-login');
const userDetail = document.getElementById('user-detail');

let user = WinStorage.getParsed('currentUser');

if(user !== null && user !== undefined){
    fetch('http://localhost:3000/api/users/' + user.id)
        .then(data => data.json())
        .then(response => {
            if(typeof response !== 'object'){
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
                document.querySelector('#user-detail span').innerHTML = response.userName;
                document.querySelector('#user-detail img').src = 'img/avatar-' + response.avatar.id + '.jpg'
            
            
                const btnLogout = document.getElementById('btn-logout');
                btnLogout.addEventListener('click', function(){
                    WinStorage.removeItem('currentUser');
                    menuLogout.classList.add('hide');
                    menuHideOnLogin.classList.remove('hide');
                    userDetail.classList.add('hide');
                    userDetail.classList.remove('user-detail');
                    window.location.href = '/login.html';
                })
            }
        })
        .catch(err => {
            console.log('Error fetch front', err);
            window.location.href = '/login.html';
        })
}
else{
    window.location.href = '/login.html';
}


