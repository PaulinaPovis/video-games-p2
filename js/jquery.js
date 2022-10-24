//JS abrir ventana seleccion avatar perfil

const avatar_selector = document.querySelector('.avatar_img');
const avatar_img = document.querySelector('.avatar_img');
const lightoff = document.querySelector('.lightoff');
const menu_avatar = document.querySelector('selector_avatar');
const img_perfil = document.querySelector('.img_perfil');

console.log(avatar_selector);

avatar_selector.addEventListener('click', ()=> {
    alert("hola");
    //lightoff.classList.toggle('show');
    //menu_avatar.classList.toggle('show');
}
lightoff.addEventListener("clicl", (e)=>{
    if(e.target !==img_perfil){
        menu_avatar.classList.toggle('show');
        lightoff.classList.toggle('show');
    }
})

img_perfil.addEventListener("click", ()=> {
    //añadir código para cambiar imagen del div avatar_img    
    menu_avatar.classList.toggle('show');
    lightoff.classList.toggle('show');
})

)


