const botones = document.getElementById('buttonsLogInRegister');
const botonLogOut = document.getElementById('logout');

let bd;
let almacen;
let contador = 0;
iniciarBaseDatos();
function iniciarBaseDatos() {
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
    puntero.addEventListener("success", comprvarUsers);  

   
}

//Mostrar usuarios por pantalla
function comprvarUsers(e) {
    let puntero =    e.target.result;

    //Mostrar si el puntero existe
    if(puntero) {
        if(puntero.value.estate == true || puntero.value.estate == 'true' || puntero.value.estate == "true")  {  //Si el estado esta en true

            contador ++; //Sumar al contador

        }
        puntero.continue();  //Que siga recorriendo el bd        
    }

    mostrarBotones();
}

function mostrarBotones() {
    if(contador == 0){  //Si el contador es 0, se mostrara los botones de registro i login, sino, el boton de logout
        botones.style.display = "block";
        botonLogOut.style.display = "none";
    } else {
        botones.style.display = "none";
        botonLogOut.style.display = "block"; 
    }
}