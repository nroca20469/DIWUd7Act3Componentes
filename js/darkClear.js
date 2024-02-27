//DAY --> <i class="bi bi-brightness-high"></i>
//NIGHT --> <i class="bi bi-moon-fill"></i>

const clear = document.getElementById('clear');
const dark = document.getElementById('dark');
const clearOffcanvas = document.getElementById('clea');
const darkOffcanvas = document.getElementById('dar');

// document.getElementById('btn-dar').style.display = "none";
// document.getElementById('btn-dark').style.display = "none";

if(localStorage.getItem('color') !== undefined){
    if(localStorage.getItem('color') == 'clear') {
        cambiarColorAClaro();
    } else if(localStorage.getItem('color') == 'dark'){
        cambiarColor();
    }
} else {
    guardarColor('clear');
}

function guardarColor(color) {
    localStorage.setItem('color', color);
}

function cambiarColor(e) {
    document.getElementById('btn-clear').style.display = "none";
    document.getElementById('btn-clea').style.display = "none";
    document.getElementById('btn-dark').style.display = "inline-block";
    document.getElementById('btn-dar').style.display = "inline-block";
    guardarColor('dark');
    document.querySelector('.clear').className = "dark";
    cambiarLogo('../img/tellme.png');
}

function cambiarColorAClaro(e) {
    document.getElementById('btn-dark').style.display = "none";
    document.getElementById('btn-dar').style.display = "none";
    document.getElementById('btn-clear').style.display = "inline-block";
    document.getElementById('btn-clea').style.display = "inline-block";
    guardarColor('clear');
    document.querySelector('.dark').className = "clear";
    cambiarLogo('../img/WhiteLogo.png');
}

function cambiarLogo(src) {
    // document.querySelector('.logo');
    console.log(document.getElementById('logo').getAttribute('src'));
    document.getElementById('logo').setAttribute('src', src);

}

// clear.addEventListener('click', cambiarColor);
// dark.addEventListener('click', cambiarColorAClaro);

// clearOffcanvas.addEventListener('click', cambiarColor);
// darkOffcanvas.addEventListener('click', cambiarColorAClaro);