//Constantes/Variables de los botones
const cerrarSession = document.getElementById('cerrar-session');

//FUNCTIONS
function cerrarSessiones() {
    //Iniciar transaccion
    let transaccion = bd.transaction(["Users"], 'readwrite');  //Si es en blanco, eld efecto es readonly
    almacen = transaccion.objectStore("Users");

    let puntero = almacen.openCursor();
    puntero.addEventListener('success', cerrarSessions);
}

function cerrarSessions(e) {
    let puntero = e.target.result;

    if(puntero) {
        if(puntero.value.estate == "true" || puntero.value.estate == true) { //Si hay un inicio de session

            let user = {};  //Creamos una varaible de objeto
            user.username = puntero.value.username;
            user.email = puntero.value.email;
            user.password = puntero.value.password;
            user.profilePicture = puntero.value.profilePicture;
            user.usertype = puntero.value.usertype;
            user.estate = 'false';

            let resultadoUp = puntero.update(user);  //Creamos una accion(update)
            
            resultadoUp.onsucces = () => {
                console.log('Cerrado de session correcto');
            };
            resultadoUp.onerror = ()=> {
                console.log('Cerrado de session incorrecto');
            };
        }
        puntero.continue();
    } 
    comprovara = 0;
    location.reload(); //Recargar la pagina para que se actualizen los cambios y se vean
}

//EVENT
cerrarSession.addEventListener('click', cerrarSessiones); //Al clicar en el boton de cerrar session, se iniciara laa funcion