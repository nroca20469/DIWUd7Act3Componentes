//Consonantes del HTML
const mostrarUser = document.getElementById('caja-users');

//Crear DB
let bd;

//Variables locales
let usuarioActual;
let profilePhoto;
let password;
let estate;
let user = {};

//FUNCIONES PARA ABRIR/CREAR LA BD
function iniciarBaseDatos() {

    let req = indexedDB.open("Save-Users-Nerea");

    req.addEventListener("error", mostrarError);
    req.addEventListener("success", comenzar);
    req.addEventListener("upgradeneeded", crearAlmacen);

    req.addEventListener("success", mostrar);

}
// Mostrar error en la consola en caso de error al inicializar la bd
function mostrarError(e) {
    console.log('Error al crear/abrir la bd: ' . e.code);  //Mostrar por pantall
}

// En caso de quela inicializacion sea correcta
function comenzar(e) {
    bd = e.target.result;  // Inicializacion de la variable con la bd
}

//Si la bd necesita una actualizacion/crearse
function crearAlmacen(e) {
    bd = e.target.result;
    let almacen = bd.createObjectStore("Users", {keyPath: "username"}); //('nombre', 'valor principal') --> tiene que ser unica

    almacen.createIndex("SearchUsername", "username", {unique: true});  //('nombre', 'llave del indice', 'unica?')
    console.log("CrearBaseDatos: Succes");
}

//Si se esta correctamente, se mostraran los usuarios
function mostrar() {

    //Incializamos el HTML del div mostrarUser
    mostrarUser.innerHTML = "";

    //Iniciar transaccion
    let transaccion = bd.transaction(["Users"]);  //Si es en blanco, eld efecto es readonly
    let almacen = transaccion.objectStore("Users");

    let puntero = almacen.openCursor();
    puntero.addEventListener("success", mostrarUsers);
}

//Mostrar usuarios
function mostrarUsers(e) {    
    
    let puntero = e.target.result;

    //Mostrar si el puntero existe
    if(puntero) {
        
        let id='resetPassword' + puntero.value.username;  //Id paar poder ver el password reseteador 
        
        //Acumular los usarios en el div de mostrarUser por divs
        mostrarUser.innerHTML += "<div class=\"p-2\">" + 
            "Username: " + puntero.value.username + " <br> " + 
            "Email: " +puntero.value.email + " <br> " + 
            "Profile Picture: " + puntero.value.profilePicture + "<br>" +
            "User Type: " + puntero.value.usertype + "<br>" +
            '<div id="'+ id + '" style="background-color:red, width: 100px"></div>' +  //Div vacio para mostrar la contraseña reseteado
            "<input type='button' class='btn-editar' value='Editar' onclick='editarUser(\""+puntero.value.username+ "\" )'>" + //Boton de editar con el usuario
            "<input type='button' class='btn-editar' value='Borrar' onclick='eliminarUser(\""+puntero.value.username+ "\" )'>" +  //Boton de eliminar usuario
            "<input type='button' class='btn-editar' value='Reset Password' onclick='resertPassword(\""+puntero.value.username+ "\" )'>" +  //Boton de resetear la contraseña
            "</div>";
            if(puntero.value.estate == true || puntero.value.estate == 'true' || puntero.value.estate == "true")  {  //Si el estado esta en true
                usuarioActual = puntero.value.username;
            }

        puntero.continue();  //Sale todo por pantella gracias a el.
    }

}

//FUNCION PARA ELIMINAR EL USUARIO
function eliminarUser(username) {

    var reply = confirm("¿Seguro que desea eliminar el usuario?");

    let transaccion = bd.transaction(["Users"], 'readwrite');  //Si es en blanco, eld efecto es readonly
    almacen = transaccion.objectStore("Users");
    
    //Actualizar pagina
    transaccion.addEventListener('complete', mostrar);
    
    //Eliminar el usuario por username
    if(reply == true) {
        var soliciud = almacen.delete(username);
    }
   
    
    //Lo redirigimos si es el mismo usuario deleteado al home
    if(username === usuarioActual) {
        location.href = "../index.html";
    }
}   

//FUNCION PARA EDITAR EL USUARIO
function editarUser(username) {

    //Empezar transaccion
    let transaccion = bd.transaction(['Users'], "readwrite");
    let almacen = transaccion.objectStore('Users');

    //Empezar solicitud/request
    let solicitud = almacen.get(username);  //Agarra el del id key
    solicitud.addEventListener("success", () => {

        document.getElementById('editar-user').style.display = "block";  //Mostramos el formulario por pantalla

        //Damos los valores a los inputs del formulario
        document.querySelector('#username').value = solicitud.result.username;
        document.querySelector('#email').value = solicitud.result.email;
        document.querySelector('#usertype').value = solicitud.result.usertype;
        
        //Guardamos la foto de perfil i la password, para actualizar despues
        profilePhoto = solicitud.result.profilePicture;
        password = solicitud.result.password;
        estate = solicitud.result.estate;
    
    });

}

//Funcion de guardar usuario(desde HTML lo llama, div usuario)
function saveUser() {

    //Guardamos los valores del formulario
    let user = document.querySelector('#username').value;
    let mail = document.querySelector('#email').value;
    let type = document.querySelector('#usertype').value;

    //Hacer transacciones --> todo lo que se haga con info de la bd --> ej: almacenar contacot(1) --> borrarlo o eliminarlo
    let transaccion = bd.transaction(['Users'], "readwrite") //--> que tipo de transaccion necessitas
    let almacen = transaccion.objectStore('Users');
    transaccion.addEventListener("complete", mostrar);  //Actualizamos la pagina

    //Ya podemos almacenar los contractos
    almacen.put({  //Si la llave utilizada ya existe, actualiza los datos, i si no existe es como un add
        username: user,
        email: mail,
        password: password,
        profilePicture: profilePhoto,
        usertype: type,
        estate: estate
    });

    //Vaciar los valores
    document.querySelector('#username').value = "";
    document.querySelector('#email').value = "";
    document.querySelector('#usertype').value = ""; 

    //Cerrar el formualrio de edit-user
    document.getElementById('editar-user').style.display = "none";

}

//Funcion para resetear la contraseña desde el HTML(div)
function resertPassword(username) {

    //Creamos la transaccion
    let transaccio = bd.transaction(['Users'], 'readwrite');
    let almacen = transaccio.objectStore('Users');

    //Creamos el pointer/cursor
    let pointer = almacen.openCursor();
    pointer.addEventListener('success', resetPwd);
}

//Funcion llamada desde el cursor de resetPassword()
function resetPwd(e) {
    //Creammos el pointer
    let pointer = e.target.result;

    //Damos valor al user
    user = pointer.value; //Save all the user data in a variable to be able to manipulate and then update it automatically

    //Escogemos una contraseña estandard para que puedan resetear la contraseña
    let estandard = '123Abcd.'; //Create an standarrd password for the reset
    user.password = estandard; //Damos el valor al password del user

    //Creamos otra transaccion
    let transaccio = bd.transaction(['Users'], 'readwrite');
    let almacen = transaccio.objectStore('Users');

    let req = almacen.put(user);  //Update the user and save the update version
    req.addEventListener('success', () => {  //Si se ejecuta correctamente
        let id = 'resetPassword' + user.username;   //Damos valor a id como variable(mas leible i limpio)
        let showRstPass = document.getElementById(id);   //Agarramos el div de resetear password propio del usuario(ssolo se muestra en el suyo)
        showRstPass.innerHTML = 'Reseted Password: ' + estandard;  //Also show in the user div(only his/her)
    });

    req.addEventListener('error', ()=>{   //En caso de error
        console.log("We couldn't reset the password, try again later");  //In case of error it will be showed in the console
    });
    
}

window.addEventListener('load', iniciarBaseDatos);