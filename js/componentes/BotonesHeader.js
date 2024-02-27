export default {
    name: "BotonesHeader",
    props: ['classe'],
    template: `
            <div class="btn-group m-3">
                <button type="button" class="btn">
                    <a :class="classe" @click="redirigirPagina(['#', 'instagram'])">
                        <i class="bi bi-instagram"></i>
                    </a>
                </button>
                <button type="button" class="btn">
                    <a :class="classe" @click="redirigirPagina(['#', 'facebook'])">
                        <i class="bi bi-facebook"></i>
                    </a>
                </button>
                <button type="button" class="btn">
                    <a :class="classe" @click="redirigirPagina(['#', 'instagram'])">
                        <i class="bi bi-twitch"></i>
                    </a>
                </button>
                <button class="btn me-2" type="button" id="btn-clea" >
                    <a :class="classe" id="clea" @click="redirigirPagina(['#', 'clear'])">
                        <i class="bi bi-brightness-high"></i>
                    </a>
                </button>
                <button class="btn me-2" type="button" id="btn-dar">
                    <a :class="classe" id="dar" @click="redirigirPagina(['#', 'dark'])">
                        <i class="bi bi-moon-fill"></i>
                    </a>
                </button>
            </div>`, 
    methods: {
        redirigirPagina(array)  {
            console.log(array);
            let paginaReload=array[0] + array[1];
            console.log(paginaReload);

            location.href = paginaReload;

        }
    }
    
}