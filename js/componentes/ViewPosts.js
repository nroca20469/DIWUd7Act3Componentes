import Post from './../../js/componentes/Post.js';
import router from './../../js/router.js'
import PostCreation from './PostCreation.js';

export default {
    name: "ViewPost",
    data() {
        return {
            articles: []
        }
        
    },
    template: `

        <ul v-if="articles.length"> <!-- Si hay articulos que se muestrem por pantalla-->
            <li v-for="(item, index) in articles">
                <post :pos="item" @edit-article="editArticle($event, item)" @delete-article="deleteArticle($event, item)"></post> 
            </li>
        </ul>` ,
    methods: {
        editArticle(e, item) {

            // //Add all the information on the inputs of the forms    
            // this.article.title = item.title;
            // this.article.content = item.content;
            // this.article.author = item.author;
            // this.article.id = item.id;
            // this.article.date = item.date;
            // this.article.image = item.image;
            // this.article.status = item.status;

            // this.editing = true;
            // Cambiar de pagina i pasar indice
            // router.addRoute({ path: '/edit:this.article', component: PostCreation });
            // ter.replace(router.currentRoute.value.fullPath);
        },
        deleteArticle(e, index) {
            console.log(index);      
            this.articles.splice(index, 1)
            //Buscar articulo
            localStorage.setItem('articles', JSON.stringify(this.articles));    
            // this.articles[item.id].splice(item.id, 1)
        }
    },
    async created() {  //Tmb funciona con mounted
        if(localStorage.getItem('articles')) {
            this.articles = JSON.parse(localStorage.getItem('articles'));

        }
        
        console.log(this.articles);
    },
    components: {
        Post
    }
}

