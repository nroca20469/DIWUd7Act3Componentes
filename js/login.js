//Constantes/Variables del html
const username = document.getElementById('username');
const password = document.getElementById('password');

const sub = document.getElementById('submit');
const home = document.getElementById('home');

const botons = document.getElementById('mostrar-botones');
const formulario = document.getElementById('form-login');

//Variables para usar en todo el codigo
let comprovara = 0;
let bd;

//FUNCIONES PARA ABRIR/CREAR LA BD
function iniciarBaseDatos() {
    let req = indexedDB.open("Save-Users-Nerea");

    req.addEventListener("error", mostrarError);
    req.addEventListener("success", comenzar);
    req.addEventListener("upgradeneeded", crearAlmacen);

    req.addEventListener('success', comprovar)
}

//En caso de tener algun error
function mostrarError(e) {
    console.log("Error al iniciar la base de datos: " + e.code);  //Mostrar el error por consola
}

//En caso de que funcione correctamente
function comenzar(e) {
    bd = e.target.result; //Guaradar la bd en la var de bd
}

//En caso de que necessite actualizarse/crearse
function crearAlmacen(e) {

    bd = e.target.result;
    let almacen = bd.createObjectStore("Users", {keyPath: "username"}); //('nombre', 'valor principal') --> tiene que ser unica

    almacen.createIndex("SearchUsername", "username", {unique: true});  //('nombre', 'llave del indice', 'unica?')
    console.log("CrearBaseDatos: Succes");
}

//Una vez acabado, comprovara si hay algun usuario loggeado
function comprovar() {
    
    //Iniciar transaccion
    let transaccion = bd.transaction(["Users"]);  //Si es en blanco, eld efecto es readonly
    let almacen = transaccion.objectStore("Users");
    comprovara = 0;  //Inicializamos comprovar a 0

    //Creamos el puntero/cursor
    let puntero = almacen.openCursor();
    puntero.addEventListener("success", comprovarUserLogIn);

}

//Comprovar si algun usuario esta loggeado
function comprovarUserLogIn(e) {
    
    let puntero = e.target.result;
    //Mostrar si el puntero existe
    if(puntero) {
        if(puntero.value.estate == "true" || puntero.value.estate == true) {  //Si hay algun usuario con estado true
            //Se sumara  al comprovar
            comprovara++;
        }
        puntero.continue();  //Recorremos todos los records
    }

    if(comprovara > 0) {  //Si hay algun usuario logeado, el formulario desaparecera y los botones se mostraran(go home && log out)
        botons.style.display = "block";
        formulario.style.display = "none";
    } else {  //Lo contrario si no hay nadie logeado
        formulario.style.display = "block";
        botons.style.display = "none";
    }
}


function comprovarIniciar(){
   //Iniciar transaccion
   let transaccion = bd.transaction(["Users"], 'readwrite');  //Si es en blanco, eld efecto es readonly
   almacen = transaccion.objectStore("Users");

   //Creamos puntero/cursor
   let puntero = almacen.openCursor();  
   comprovara = 0;  //Inicializamos/Actualizamos valor a 0
   puntero.addEventListener("success", comprovarUserExists);
}


function comprovarUserExists(e) {

    //Variables de la funcion
    let puntero = e.target.result;
    let contraseña = null;

    if(puntero) {
        if(puntero.value.username == username.value) {  //Si el nombre de usuario hace match a alguno de la bd

            comprovara ++;  //Se suma a la variable de comprovar el nUsers
            contraseña = puntero.value.password;  //Guardamos la contraseña para despues comparar

            comprovarContraseña(contraseña,puntero ,puntero.value); //Compramos si las contraseñas concuerdan
        }
        puntero.continue();
    }

    if(comprovara == 0) {
        location.href="../form/register.html"; //Si el usuario no exite, lo mandamos a registrarse directamente
    } 
    
}

function comprovarContraseña(contra,puntero, value) {
    
    //Si la contraseña es como la contraseña guardada en  la bd
    if(contra === password.value) {

        //Guardamos los cabios hy los ya guardados correctamente en una variable tipo objeto
        let user = {};
        user.username = value.username;
        user.email = value.email;
        user.password = value.password;
        user.profilePicture = value.profilePicture;
        user.usertype = value.usertype;
        user.estate = 'true';

        let resultadoUp = puntero.update(user);  //Hacemos update al user(es como put, pero este no te creara)
        
        resultadoUp.onsucces = () => {
            console.log('Update user estate correcto');  //Mostrar por consola que es estado esta correctamente update
        };
        resultadoUp.onerror = ()=> {
            console.log('Update user estate incorrecto');  //Lo contrario al otro por pantalla
        };

        //Segun el tipo de usuario lo mandamos a un sitio o al otro
        if(value.usertype == 'Admin') {  
            location.href = '../form/mostrarUsers.html';  //Si es admin, a gestionar los usuarios
        } else {
             location.href = '../index.html'; //Si no es admin, a la pagina home
        }
       
    }
}

//EVENTOS
sub.addEventListener('click', comprovarIniciar);
home.addEventListener('click', () => {
    location.href = '../index.html';  //Mandarlo directamente al home
});
window.addEventListener('load', iniciarBaseDatos);