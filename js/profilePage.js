//Get variables(INPUTS)
const imgProfile = document.getElementById('imgProfile');
const username = document.getElementById('username');
const email = document.getElementById('email');
const userType = document.getElementById('userType');
const passOr = document.getElementById('password');
const newPass = document.getElementById('newPassword');
const repPass = document.getElementById('newPassword2');
 
//Constante de los elementos html(BOTONES)
const del = document.getElementById('delete');
const edit = document.getElementById('edit-prof');
const chgPass = document.getElementById('chg-pswd');
const chgAvatar = document.getElementById('chg-avatar');
const chgAvatarInternal = document.getElementById('chg-avatar2');
const chgPassInt = document.getElementById('chg-pswd-internal');

//Crear DB
let bd;
let almacen;

//Variables usadas en alguna parte en repetidas ocasiones del codigo
let mostrarUser;
let password;
let passwOrTrue = false;
let userDatos = {};  //Objeto de usuario
let profilePhoto;


// ABRIR/INICIALIZAR BD
//Inicio de esta misma
function iniciarBaseDatos() {
    mostrarUser = document.getElementById('caja-users');  //Almacenamos en variable el div para guardar los usuarios 

    let req = indexedDB.open("Save-Users-Nerea");  //Abrir bd

    req.addEventListener("error", mostrarError);
    req.addEventListener("success", comenzar);
    req.addEventListener("upgradeneeded", crearAlmacen);  //Si no existe, o necessita actualizacion

    req.addEventListener("success", mostrar);  //Al tener succes, mostrara los datos del usuario
}

// Mosgtrar error, en caso de error al inicializar la bd
function mostrarError(e) {
    console.log('Error al crear/abrir la bd: ' . e.code);
}

// Guardar BD
function comenzar(e) {
    bd = e.target.result;  //Guardar en variabble la bd
}

// En caso de no existir o de tener que actualizarse
function crearAlmacen(e) {
    bd = e.target.result;
    almacen = basedatos.createObjectStore("Users", {keyPath: "username"}); //('nombre', 'valor principal') --> tiene que ser unica

    almacen.createIndex("SearchUsername", "username", {unique: true});  //('nombre', 'llave del indice', 'unica?')
    console.log("CrearBaseDatos: Succes");
}

//FUNCIONES PARA MOSTRAR EL USUARIO POR PANTALLA
function mostrar() {

    //Iniciar transaccion
    let transaccion = bd.transaction(["Users"]);  //Si es en blanco, eld efecto es readonly
    almacen = transaccion.objectStore("Users");

    //Abrir puntero
    let puntero = almacen.openCursor();
    puntero.addEventListener("success", mostrarUsers); //Llamar a mostrar Users
}

//Mostrar usuario
function mostrarUsers(e) {
    let puntero = e.target.result; //HGuardar el valor del puntero

    //Mostrar si el puntero existe
    if(puntero) {
        if(puntero.value.estate == 'true' || puntero.value.estate == true) {  //Si el estado esta en true
            document.querySelector('#img').setAttribute('src', puntero.value.profilePicture);  //Añador al src el link de donde esta la img
            username.innerText = puntero.value.username; //Mostra el username
            userType.innerText = puntero.value.usertype; //Mostrar el tipo de usuario
            email.innerText = puntero.value.email;  //Mostrar el email
            user = puntero.value; //Guardar cual es ususario
        }
        puntero.continue();  //Sale todo por pantalla gracias a el.
    }
}

//FUNCIONES PARA EDITAR USUARIOS
function editarUser(e) {

    //Cerrar formularios
    let formAv = document.querySelector('.chg-avatar');  
    let formEdUs = document.querySelector('.edit-data');
    let formPass = document.querySelector('.chg-password');
    if(formAv.style.display == "block") {
        formAv.style.display = "none";
    }
    if(formEdUs.style.display == "block") {
        formEdUs.style.display = "none";
    } else {
        formEdUs.style.display = "block";
    } 
    if(formPass.style.display == "block") {
        formPass.style.display = "none";
    }

    //Abrir nueva transaccion
    let transaccion = bd.transaction(["Users"], "readwrite");  //Si es en blanco, eld efecto es readonly
    almacen = transaccion.objectStore("Users");
    
    let user = username.innerHTML;

    //Hacer una solicitud para ver los datos del usuario mediante la key(username)
    let solicitud = almacen.get(user);  //Agarra el del id key

    solicitud.addEventListener("success", function() {
        //Mostrar por pantalla el form de editar data
        document.querySelector('.edit-data').style.display = "block";
        
        //Mostrar los datos por pantalla
        document.querySelector('#username2').value = solicitud.result.username;
        document.querySelector('#email2').value = solicitud.result.email;
        document.querySelector('#usertype').value = solicitud.result.usertype;
        //Guardar le profilePhoto y la password
        profilePhoto = solicitud.result.profilePicture;
        password = solicitud.result.password;
    });

}

//Guardar datos de usuario
function saveUser() {
    //Guardar valores en variaables
    let user = document.querySelector('#username2').value;
    let mail = document.querySelector('#email2').value;
    let type = document.querySelector('#usertype').value;

    //Hacer transacciones --> todo lo que se haga con info de la bd --> ej: almacenar contacot(1) --> borrarlo o eliminarlo
    let transaccion = bd.transaction(['Users'], "readwrite") //--> que tipo de transaccion necessitas
    let almacen = transaccion.objectStore('Users');
    transaccion.addEventListener("complete", mostrar);

    //Ya podemos almacenar los contractos
    almacen.put({  //Si la llave utilizada ya existe, actualiza los datos, i si no existe es como un add
        username: user,
        email: mail,
        password: password,
        profilePicture: profilePhoto,
        usertype: type,
        estate: 'false'
    });

    document.querySelector('.edit-data').style.display = "none";  //Hacer que el formulario no se muestre por pantalla mas
}

//FUNCIONES PARA ELIMINAR USUARIOS
function eliminarUser() {
    let username = document.getElementById('username').innerHTML;

    var reply = confirm("¿Seguro que desea eliminar el usuario?");
  
    //Inicializar transaccion
    let transaccion = bd.transaction(["Users"], 'readwrite');  //Si es en blanco, el defecto es readonly
    almacen = transaccion.objectStore("Users");

    let puntero = almacen.openCursor();
    puntero.addEventListener("success", eliminarUsers(username));  
    
    //Eliminar el usuario por username
    if(reply == true) {
        var soliciud = almacen.delete(username);
    }
}

function eliminarUsers(username) {

    //Elimianr
    var soliciud = almacen.delete(username);
    soliciud.addEventListener('success', () => {  
        location.href = '../index.html';  //Redirige al indice/Home
    });
}

//FUNCION PARA ACTUALIZAR LA CONTRASEÑA
function actualizarPassword() {

    //Cerrar formularios
    let formAv = document.querySelector('.chg-avatar');  
    let formEdUs = document.querySelector('.edit-data');
    let formPass = document.querySelector('.chg-password');

    if(formAv.style.display == "block") {
        formAv.style.display = "none";
    }
    if(formEdUs.style.display == "block") {
        formEdUs.style.display = "none";
    } 
    if(formPass.style.display == "block") {
        formPass.style.display = "none";
    } else {
        formPass.style.display = "block";
    }

}

//Al hacer clic a actualizar contraseña(e boton de submit del form)
function checkPassword() {

    let transaccion = bd.transaction(["Users"]);  //Si es en blanco, eld efecto es readonly
    almacen = transaccion.objectStore("Users");

    let puntero = almacen.openCursor();
    puntero.addEventListener("success", chckPsswd); 
    
}

//Ver si la contrasela es posicble de actualizar
function chckPsswd(e) {

    let pointer = e.target.result;

    let passwd = pointer.value.password;  //Guardar el valor de la contrseña guardado en la bd

    if(passwd.localeCompare(passOr.value) == 0) {
        //Check if the first password is possible
        if(psswd1Correct() == true ) {
            //Check if the two passwords are identical
            if(identicalPasswords(newPass.value, repPass.value)) {
                actualizarUserContraseña();  //Si ha pasado por todos los parametros, se actualizara la contraseña
            } else {
                console.log('Not identical passwords');  //Si la contraseña y la contraseña de repeticion no son iguales
            }
        } else {
            console.log('Password not valid');  //Si la contraseña no ha pasado por los parametros para ser valida
        }
    } else {
        console.log('Incorrect password');  //Si las contraseñas no es igual a la original
    }

}

// Comparar las contraseñas
function identicalPasswords(pas1, pas2) {
    if(pas1.localeCompare(pas2) == 0) {
        return true;
    } else {
        return false;
    }
}

//Comprovar si la contraseña es valida
function psswd1Correct() {
    let passy = newPass.value; //Guardamos el valor de la contrasenya
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/;  //Regex de contraseña valida

    if(re.test(passy.trim())) {  //Devolvemos el valor
        return true;
    } else {
        return false;
    } 
}

//Actalizar la contraseña en la bd
function actualizarUserContraseña() {

    //Inicializar la transaccion
    let transaccion = bd.transaction(['Users'], "readwrite") //--> que tipo de transaccion necessitas
    let almacen = transaccion.objectStore('Users');

    //Guardar los valores del formularion HTML
    let userna = username.innerHTML;
    let mail = email.innerHTML;
    let profilePicture = document.querySelector('#img').getAttribute('src');   
    let usertype = userType.innerHTML;

    //Guardamos los valores con la variable tipo objeto
    let user = {};
    user.username = userna;
    user.email = mail;
    user.estate = 'true';
    user.password = newPass.value;
    user.profilePicture = profilePicture;
    user.usertype = usertype; 

    var requestUpdate = almacen.put(user); //Actualizamos con put(si no existe, se crea)
    
    requestUpdate.onerror = function (e) { //Mostrar error al actualizar por consol
      console.log('Error al actualizar la contraseña');
    };
    requestUpdate.onsuccess = function (e) {  //Mostrar que se ha actualiado correctamente
        console.log('Actualizada correctamente la contraseña');
    };

    document.querySelector('.chg-password').style.display = "none"; //Cerramos el formulario de contraseña
}

//FUNCIONES PARA ACTUALIZAR EL AVATAR
function desplegarFormAvatar(e) {  //Para mostrar el form por pantalla

    //Cerrar formularios
    let formAv = document.querySelector('.chg-avatar');  
    let formEdUs = document.querySelector('.edit-data');
    let formPass = document.querySelector('.chg-password');

    if(formAv.style.display == "none") {
        formAv.style.display = "block";
        let srcActual = document.getElementById('img').getAttribute('src');  //Guardar el src del avatar actual
        document.getElementById('actual-avatar').setAttribute('src', srcActual);  //Mostrar por pantalla mediante el div
    } else {
        formAv.style.display = "none";
    }
    if(formEdUs.style.display == "block") {
        formEdUs.style.display = "none";
    } 
    if(formPass.style.display == "block") {
        formPass.style.display = "none";
    } 

}

//Guardar el valor del avatar escogido
function guardarAvatar() {
    //Agarrar el src del avatar escogido
    if(document.getElementById('userProfilePhoto1').checked) {
        profilePhoto = document.getElementById('profilePhoto1').getAttribute('src');
    } else  if(document.getElementById('userProfilePhoto2').checked) {
        profilePhoto = document.getElementById('profilePhoto2').getAttribute('src');
    } else if(document.getElementById('userProfilePhoto3').checked) {
        profilePhoto = document.getElementById('profilePhoto3').getAttribute('src');
    }

    let transaccion = bd.transaction(['Users'], 'readwrite');   
    let almacen = transaccion.objectStore('Users');

    user.profilePicture = profilePhoto;  //Actalizar la imagen

    var requestUpdate = almacen.put(user);  //Actualizar el usuario
    requestUpdate.addEventListener('error', () => {
        console.log('error: ' + e.code);  //En caso de error se vera por consola
    });
    requestUpdate.addEventListener('success', () => {
        console.log('Avatar updated succesfullly');  //Mostrar por consola que se ha actualizado correctamebte
    });
    
    location.reload(); //Recargar la pagina para aplicar los cambios
}

//EVENTOS
edit.addEventListener('click', editarUser);
del.addEventListener('click', eliminarUser);

chgPass.addEventListener('click', actualizarPassword);
chgPassInt.addEventListener('click', checkPassword);

chgAvatar.addEventListener('click', desplegarFormAvatar);
chgAvatarInternal.addEventListener('click', guardarAvatar);

window.addEventListener('load', iniciarBaseDatos);