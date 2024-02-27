//Constantes del html
const imgProfile = document.getElementById('img1');
const imgProfile1 = document.getElementById('img2');
const username = document.getElementById('username');
const divUser = document.getElementById('user');
const divUser1 = document.getElementById('user1');
const email = document.getElementById('email');

//Variables generales 
let bd;
let mostrarUser;
let contador = 0;
let almacen;

//Abrir/Crear db
function iniciarBaseDatos() {
    mostrarUser = document.getElementById('caja-users');  //Dar valor a la var de mostrarUser

    let req = indexedDB.open("Save-Users-Nerea");

    req.addEventListener("error", mostrarError);
    req.addEventListener("success", comenzar);
    req.addEventListener("upgradeneeded", crearAlmacen);

    req.addEventListener("success", mostrar);
}

// FUNCIONES DE ABRIR/CREAR DB
// Si hay algun fallo
function mostrarError(e) {
    console.log('Error al crear/abrir la bd: ' . e.code);  //Mostrar por consola el error
}

//Si se ha inicializado correctamente
function comenzar(e) {
    bd = e.target.result; //Guardar la bd en la var de bd
}

//Si necessita crearse/actualizarse
function crearAlmacen(e) {

    bd = e.target.result;
    let almacen = bd.createObjectStore("Users", {keyPath: "username"}); //('nombre', 'valor principal') --> tiene que ser unica

    almacen.createIndex("SearchUsername", "username", {unique: true});  //('nombre', 'llave del indice', 'unica?')
    console.log("CrearBaseDatos: Succes");
}

//MOSRTRAR POR PANTALLA EL USUSARIO
function mostrar() {
    //Iniciar transaccion
    let transaccion = bd.transaction(["Users"]);  //Si es en blanco, por defecto es readonly
    almacen = transaccion.objectStore("Users");

    let puntero = almacen.openCursor(); //Abrimos el cursor/punero
    contador = 0;  //Incializar el contador a 0
    puntero.addEventListener("success", mostrarUsers);  

}

//Mostrar usuarios por pantalla
function mostrarUsers(e) {
    let puntero = e.target.result;

    //Mostrar si el puntero existe
    if(puntero) {
        if(puntero.value.estate == true || puntero.value.estate == 'true' || puntero.value.estate == "true")  {  //Si el estado esta en true
            
            //Mostrar por pantalla el div del usuario
            divUser.style.display = "block";
            
            //Mostrar y coger los valores por pantalla
            let userImg = puntero.value.profilePicture;
            imgProfile.setAttribute('src', userImg);
            imgProfile1.setAttribute('src', userImg);
            
            username.innerText = puntero.value.username;
            email.innerText = puntero.value.email;
            console.log(puntero.value.profilePicture);

            if(puntero.value.usertype == 'Admin') {  //Que tipo de usuario es(segun el tipo, vera algunos botones o no)
                document.getElementById('see').style.display = "block";
            } else {
                document.getElementById('see').style.display = "none"; 
            }

            contador ++; //Sumar al contador

        }
        puntero.continue();  //Que siga recorriendo el bd        
    }

    if(contador == 0){  //Si el contador es 0, no se mostrara el div de usuario
        // divUser.style.display = "none";
        // divUser1.style.display = "none";
    }
   
}

window.addEventListener('load', iniciarBaseDatos);