// import Post from './../js/componentes/Post.js';
import Heade from './../js/componentes/Header.js';
import Foot from './../js/componentes/Footer.js';
import router from './../js/router.js';
import ViewPosts from '../js/componentes/ViewPosts.js';

const { createApp } = Vue;
        

// FALTA BORRAR LAS CASILLAS DE IMAGEN, ESTADO Y FECHA
createApp({
    data() { 
        return {
            // article: {
            //     title: "",
            //     content: "",
            //     author: "", 
            //     id: "",
            //     image: "",
            //     status: "",
            //     date: ""
            // },
            // articles: [],
            // creating: false,
            // editing: false
        }
    },
    methods: {

        // crearArticle: function () {
        //     let id;

        //     //Le damos un id para poder editar y borrar tranquilamente
        //     if(this.articles.length > 0) {
        //         let length = (this.articles.length);
        //         id = this.articles[length-1].id;
        //         id += 1;
        //     } else {
        //         id = 0;
        //     }

        //     //Lo añadimos al array
        //     this.articles.push( {
        //         title: this.article.title,
        //         content: this.article.content,
        //         author: this.article.author,
        //         id: id,
        //         image: this.article.image,
        //         status: this.article.status,
        //         date: this.article.date
        //     });

        //     //Empty alll the values
        //     this.article.title = "";
        //     this.article.content = "";
        //     this.article.author = "";
        //     this.$refs.img.value=null;
        //     // document.getElementById('image').value = null;
        //     this.article.date = "";
        //     this.article.status = "";

        //     localStorage.setItem('articles', JSON.stringify(this.articles));

        // },
        // editArticle(e, item) {

        //     //Add all the information on the inputs of the forms    
        //     this.article.title = item.title;
        //     this.article.content = item.content;
        //     this.article.author = item.author;
        //     this.article.id = item.id;
        //     this.article.date = item.date;
        //     this.article.image = item.image;
        //     this.article.status = item.status;

        //     this.editing = true;


        // },  
        // saveArticle(e) {
        //     console.log(this.article.content);

        //     console.log(this.article.id);
        //     this.articles[this.article.id] = {
        //         title: this.article.title,
        //         content: this.article.content,
        //         author: this.article.author,
        //         id: this.article.id,
        //         image: this.article.image,
        //         status: this.article.status,
        //         date: this.article.date
        //     };

        //     console.log(this.article.image);

        //     console.log(this.articles[this.article.id]);

        //     this.article.title = "";
        //     this.article.content = "";
        //     this.article.author = "";
            
        //     this.editing = false;


        //     localStorage.setItem('articles', JSON.stringify(this.articles));
        // },
        deleteArticle(e, index) {
            console.log(index);      
            this.articles.splice(index, 1)
            //Buscar articulo
            // this.articles[item.id].splice(item.id, 1)
        }
        // updateImage(e) {
        //     console.log(e.target.name, e.target.files);
        //     // console.log(JSON.stringify(e.target.files[0]));   
        //     let name = e.target.files[0] ?? null;
        //     this.article.image = URL.createObjectURL(name);
        //     console.log(name);
        //     console.log(this.article);
            
        // },
        // updateStatus(e) {
        //     console.log(e.target.value);
        //     this.article.status = e.target.value;
        //     console.log(this.article.status);
        // }
    },
    components: {
        // Post,
        Heade,
        Foot,
        ViewPosts
    }, 
    async created() {  //Tmb funciona con mounted
        if(localStorage.getItem('articles')) {
            this.articles = JSON.parse(localStorage.getItem('articles'));
            
        }
    }
}).use(router).mount('#app');