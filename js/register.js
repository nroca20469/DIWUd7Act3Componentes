//Variables
let bd;  //Variable donde se almacenara la bd

//Crear db
function iniciarBaseDatos() {
    //let btnRegistrar = document.getElementById('save');  //Almacenamos el boton en una variable
    //btnRegistrar.addEventListener("click", almacenarUser);  //Al momento de clicar, se guardara el usuario en la DB

    let req = indexedDB.open("Save-Users-Nerea");

    req.addEventListener("error", mostrarError);
    req.addEventListener("success", comenzar);
    req.addEventListener("upgradeneeded", crearAlmacen);
}

// Crear db --> FUNCIONES
//Error
function mostrarError(e) {
    console.log('Error al crear/abrir la bd: ' . e.code);  //Mostrar error en la consola
}

//Success
function comenzar(e) {
    bd = e.target.result;  //Crear/guardar la bd en una variable
}

//Upgraded needed
function crearAlmacen(e) {
    let basedatos = e.target.result;  //Creamos la bd
    let almacen = basedatos.createObjectStore("Users", {keyPath: "username"}); //('nombre', 'valor principal') --> tiene que ser unica

    almacen.createIndex("SearchUsername", "username", {unique: true});  //('nombre', 'llave del indice', 'unica?')  //Creamos indice
    //Crear columnas
    almacen.createIndex('username', 'username', { unique: true });
    almacen.createIndex('email', 'email', { unique: true });
    almacen.createIndex('password', 'password', { unique: false });
    almacen.createIndex('profilePicture', 'profilePicture', { unique: false });
    almacen.createIndex('usertype', 'usertype', { unique: false });
    almacen.createIndex('estate', 'estate', { unique: false });

    console.log("CrearBaseDatos: Succes");
}

//Almacenar  Usuario
function almacenarUser() {

    //Guardar valores en variables de html
    let user = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;

    let profilePhoto;
    if(document.getElementById('userProfilePhoto1').checked) {  //Si esta chequeada
        profilePhoto = document.getElementById('profilePhoto1').getAttribute('src');  //Guardar la direccion en la que esta guardada la imagen
    } else if(document.getElementById('userProfilePhoto2').checked) {
        profilePhoto = document.getElementById('profilePhoto2').getAttribute('src');
    } else if(document.getElementById('userProfilePhoto3').checked) {
        profilePhoto = document.getElementById('profilePhoto3').getAttribute('src');
    }

    let userType;
    if(document.getElementById('admin').checked) {  //Si esta chequeada
        userType = "Admin";  //Guardamos el valor del campo('Admin' o 'User')
    } else if(document.getElementById('usera').checked) {   
        userType = "User";
    }
    console.log(userType);
    //console.log(document.getElementById('userType').checked);
    //Empezar transaccion para guardar
    var transaccion = bd.transaction(["Users"], "readwrite");
    //Crear almacen, desde la transaccion, de su objectStore
    let almacen = transaccion.objectStore("Users");

    //Añadimos en la bd(almacen), el usuario
    almacen.add({
        username: user,
        email: email,
        password: pass,
        profilePicture: profilePhoto,
        usertype: userType,
        estate: 'true'
    });

    //Vaciamos los campos
    document.getElementById('username').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";

    //Segun el tipo lo enviamos a diferentes lugares
    if(userType == 'Admin') {
        location.href = '../form/mostrarUsers.html';  //En ser administrador, lo mandamos a la ficha de los usuarios
    }else {
        location.href = '../form/profilePage.html';  //En ser ususario, lo nmandamos a la pagina de perfil de usuario
    }
    
}

//Al cargarse la pagina inicalizamos la base de datos
window.addEventListener('load', iniciarBaseDatos);