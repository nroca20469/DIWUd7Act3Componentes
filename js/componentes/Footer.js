export default {
    name: "Foot", 
    props: ['location'],
    template: `<footer> 
        <nav class="navbar navbar-expand-md navbar-light" >
            <div class="container-fluid">
                <button class="btn">Contact</button>
                <div class="justify-content-end align-center" id="buttonsLogInRegister">
                    <button class="btn" @click="redirigirPagina([location, 'form/register.html'])">Register</button>
                    <button class="btn" @click="redirigirPagina([location, 'form/login.html'])">Log in</button>
                </div>
                <div class="justify-content-end align-center" id="logout">
                    <button class="btn logout" id="cerrar-session" @click="cerrarSession">Logout</button> 
                </div>
            </div>
        </nav>
    </footer>`,
    methods: {
        redirigirPagina(array) {
            console.log(array);
            let paginaReload=array[0] + array[1];
            console.log(paginaReload);

            location.href = paginaReload;
        },
        cerrarSession() {

        }
    }
}