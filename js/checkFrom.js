//Variables des del html
const form = document.getElementById('form');
const tryFrom = document.getElementById('save');
const nomusuari = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const userProfilePhoto = document.getElementById('userPhoto');
//const userType = document.getElementById('userType'); 

//document.querySelector('input[name="userType"]:checked');
//Esconder el boton de registro de submit, i mostrar el falso
// document.getElementById('sub').style.display =userType "block";
// document.getElementById('save').style.display = "none";

//Variables usadas en el codigo
let userImg = '';
let type = '';

//Comprovar todos los campos estan rellenados
function esObligartori(inputArray, img, type){
    let correcte = 0;
    //Recorrer el array de inputs y mirar que no esten vacios
    inputArray.forEach((input) => {
        if(input.value.trim() === '') { //Si esta vacio mostrar un error(con el texto de error)
            mostraError(input,`${prenNomInput(input)} és obligatori.`);
        } else {
            correcte ++; //Si esta correcto se suma
        }
    });
    
    let missatgeError = document.getElementById('missatgeImg');
    
    //Comprovar los de opcion(uno o otro)
    if(img === '') {   //Para la imagen
        missatgeError.innerText = "La imatge de usuari és obligatoria";
        missatgeError.style.visibility = "visible";
    } else {
        missatgeError.style.visibility = "hidden";
        correcte ++;
    }

    let missatgeErrorTipo = document.getElementById('missatgeType');
    console.log(type);
    if(type === '') {  //Para el tipo de usuario
        missatgeErrorTipo = document.getElementById('missatgeType');
        missatgeErrorTipo.innerText = "El tipo de usuari és obligatori";
        missatgeErrorTipo.style.visibility = "visible";
    } else {
        missatgeErrorTipo.style.visibility = "hidden";
        correcte ++;
    }

    return correcte;
}

//Comprovar la longuitud minima
function comprovaLonguitud(input, min, max){

    if(input.value.length < min) {  //Comprovar que no sea menor al minimo
        
        mostraError(input, `${prenNomInput(input)} ha de tenir un minim de ${min} caracters`);
        return false;
    
    } else if(input.value.length > max) {  //I mayor al maximo
        
        mostraError(input, `${prenNomInput(input)} ha de tenir menys de ${max} caracters`);
        return false;
    
    } else { //Si no, es correcto

        return true;

    }
}

//Comprovar si el email es valid
function esEmailValid(input) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    //Exresion --> galimatias--> la simbologia de cont re, comprueba y busca cosas en una cadena --> es como un filtro

    if(re.test(input.value.trim())) {  //Comprovar si el input(email), contiene al menos uno de cada
        return true;
    } else { 
        let missatge = `${prenNomInput(input)} no te el format correcte.`; //O si no es correcta, mostrar el error de que no tiene formato correcto
        mostraError(input, missatge);
        return false;
    } 
}

//Comprovar si la contraseña es correcta/valida
function esPasswordValid(input) {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
    //Regex para compprovacion de contrasenaq con 1may, 1min, 1car especial, min6

    if(re.test(input.value.trim())) {  //Comparar si es valida o no
        return true;
    } else {
        let missatge = `${prenNomInput(input)} no te el format correcte.`;
        mostraError(input, missatge);
        return false;
    }   
}

//Comprovar si la contraseña y la repeticion de contraseña son iguales
function comprovaContrasenesIguales(input1, input2) {

    if(input1.value !== input2.value) { //Si no lo son, devolver un error y mostrar que son desiguales
        let missatge = `${prenNomInput(input2)} ha de ser igual a ${prenNomInput(input1)}.`;
        mostraError(input2, missatge);
        return false;
    } else {
        return true;
    }

}

//Mostrar error en el div de error
function mostraError(input, missatge) {
    const formControl = input.parentElement;
    formControl.className = "mb-3 error";  //Para que se vea el error
    const label = formControl.querySelector('label');
    const small = formControl.querySelector('small');
    small.innerText = missatge; //Mostrar error
}

//Mostrar en el texto de error el texto con la primera letra en mayuscula
function prenNomInput(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1); 
}

//Guardar el valor de la Profile Picture
function getUserPicture(e) {
    let userProfileimg = e.target.getAttribute('id');
    
    if(userProfileimg == 'userProfilePhoto1') {
        userImg = '../img/perfil/perfil4.png';
    } else if(userProfileimg == 'userProfilePhoto2'){
        userImg = '../img/perfil/perfil5.png';
    } else if (userProfileimg == 'userProfilePhoto3'){
        userImg = '../img/perfil/perfil6.png';
    }       
}

//Funcion para comprovar el formulario
function tryFormulario(e) {
    e.preventDefault(); //Evitamos que recarge de manera automatica
    //userType = userType.value;
    let type = document.querySelector('input[name="userType"]:checked').value;
    let nCorrectes = esObligartori([nomusuari, email, password, password2], userImg, type);  //Comprovar el numero de campos correctos

    let cLongtudNom = comprovaLonguitud(nomusuari, 3, 15);  //True/False(longuitud del nombre del usuario)
    if(cLongtudNom) { //Si devuelve true, pos si se mostraba el error, lo escondemos
            let error = nomusuari.parentElement;
            error.className = "mb-3";
            let labl = error.querySelector('label');
            let smll = error.querySelector('small');
            smll.style.visibility = "hidden";
    }

    let cLongitudPass = comprovaLonguitud(password, 8, 25);  //True/False(longuitud de la contraseña)
    if(cLongitudPass) { //Si devuelve true, se escondera el el error
        let error = password.parentElement;
        error.className = "mb-3";
        let labl = error.querySelector('label');
        let smll = error.querySelector('small');
        smll.style.visibility = "hidden";
    }

    let valid = esEmailValid(email);  //Comprovamos si el email es valido
    
    let pass = esPasswordValid(password);
    let comprovar = comprovaContrasenesIguales(password, password2);
   
    if(pass) {  //Si la password es valida

        if(comprovar) {  //Comprovamos si las contraseñas son iguales

            let formControl = password2.parentElement;
            formControl.className = 'mb-3';
            let label = formControl.querySelector('label');
            let small = formControl.querySelector('small');
            small.style.visibility = "hidden";
            
        }

    }

    if(nCorrectes == 6) {  //Si todas estan puestas
        console.log(cLongitudPass, cLongtudNom, valid, comprovar, pass, type != null);
        if(cLongitudPass && cLongtudNom && valid && comprovar && pass && type != null ) {  //Si esta todo correcto
            // document.getElementById('sub').style.display = "none";  //I escondemos el boton falso(de comprovacion)
            // document.getElementById('save').style.display = "block"; //Mostramos el boton definitivo        
            almacenarUser();
        }

    } 
   // console.log(type);
}

//EVENTS
userProfilePhoto.addEventListener("click", getUserPicture);  //Para escoger el tipo de Profile Photo

//userType.addEventListener("change", getUserType);  //Escoge el tipo de usuario

tryFrom.addEventListener('click', tryFormulario);  //Boton de omprovaciones