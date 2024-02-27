import BotonesHeader from './BotonesHeader.js';

export default {
    name: "Heade", 
    props: ['location', 'srcLogo'], 
    template: `
        <header class="container-fluid text-light">
        <nav class="navbar navbar-expand-md navbar-light">
            <div class="container-xxl">
                <!-- Logo i texto del logo -->
                <p>
                    <img :src="srcLogo" alt="Bootstrap" width="60" height="60" id="logo" @click="redirigirPagina([location, 'index.html'])">
                    <a name="Tell" @click="redirigirPagina([location, 'index.html'])" class="logo">Tell me</a>  
                </p>
                                
                <!-- Offcanvas button -->
                <button class="btn d-lg-none offcanvas-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
                    <span class="icon-bar" style="width: 60; height: 60;"> 
                        <i class="bi bi-list"> </i>
                    </span>
                </button>


                <!-- Offcanvas part -->                
                <div class="offcanvas-lg offcanvas-end d-lg-none" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
                    <div class="offcanvas-header">
                        <BotonesHeader classe="nav-link"></BotonesHeader>
                    </div>
                    <div class="offcanvas-body">
                        <!-- Finder --> 
                        <div class="input-group m-3">
                            <div class="form-outline">
                            <input type="search"  class="form-control" placeholder="Search"/>
                            </div>
                            <button type="button" class="btn">
                            <i class="bi bi-search"></i>
                            </button>
                        </div>
                    
                        <!-- Topic finder -->
                        <div class="m-3">
                            <div class="text-center pt-3">
                                <p>TOPICS</p>
                            </div>
                            
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center cuerpo">
                                    <input class="bg-dark-subtleform-check-input mx-3" type="checkbox" value="deporte" id="deporte">
                                    <label for="deporte" class="mx-3">Deporte</label>
                                    <span class="badge rounded-pill mx-2 d-none d-sm-block d-md-block">4</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center cuerpo">
                                    <input class="bg-dark-subtleform-check-input mx-3" type="checkbox" value="amor" id="amor">
                                    <label for="amor" class="mx-3">Amor</label>
                                    <span class="badge bg-primary rounded-pill mx-2 d-none d-sm-block d-md-block">10</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center cuerpo">
                                    <input class="bg-dark-subtleform-check-input mx-3" type="checkbox" value="familia" id="familia">
                                    <label for="familia" class="mx-3">Familia</label>
                                    <span class="badge bg-primary rounded-pill mx-2 d-none d-sm-block d-md-block">15</span>
                                </li>
                            </ul>
                            <div class="d-grid justify-content-md-end mt-1"> 
                                <button class="btn">Search</button>   
                            </div>
                        </div> 
                
                        <!-- Close button -->
                        <button class="close-btn" type="button" aria-label="close">
                            <a class="nav-link" href="register.html">
                                <i class="bi bi-arrow-bar-right"></i>
                            </a>
                        </button>
                    </div>
                </div>

                <!-- navbar links -->
                <div class="d-grid gap-2 d-md-flex justify-content-md-end d-none d-md-none d-lg-block">
                    <BotonesHeader classe="btn me-2 md-2"></BotonesHeader>
                </div>
            </div>

        </nav>

    </header>
    `,
    methods: {
        redirigirPagina(array)  {
            console.log(array);
            let paginaReload=array[0] + array[1];
            console.log(paginaReload);

            location.href = paginaReload;

        }
    },
    components: {
        BotonesHeader
    }
}