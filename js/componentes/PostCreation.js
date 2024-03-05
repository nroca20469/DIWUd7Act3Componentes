export default {
    name: 'PostCreation',
    data() { 
        return {
            article: {
                title: "",
                content: "",
                author: "", 
                id: "",
                image: "",
                status: "",
                date: ""
            },
            articles: [],
            editing: false
        }
    },
    template: `
        <h2 v-if="editing"> {{ editArticle() }} Edit Article </h2>
        <h2 v-else> Create Article </h2>

        <form>
            <label for="title"> Title </label><br>
            <input v-model="article.title" name="title"><br>

            <label for="content"> Content </label><br>
            <input v-model="article.content" name="" id="content"><br>  
            
            <label for="author"> Author </label><br>
            <input v-model="article.author" name="" id="content"><br>

            <label for="img" v-if="editing"> Actual Image: </label><input v-if="editing" type="image" :src="article.image"><br>
            <label for="img"> Image  </label><br>
            <input type="file" v-bind:model="article.image" ref="img" class="notRadius" accept="image/*" id="image" @change="updateImage"><br><br>

            <label for="date"> Date </label> <br>
            <input v-model="article.date" name="" id="date" type="date" class="notRadius"><br><br>

            <label for="status" style="margin-right: 5px"> Status </label>
            <select id="status" v-model="article.status" @change="updateStatus">
                <option value=""> </option>
                <option value="draft"> Draft </option>
                <option value="published"> Published </option>
                <option value="removed  "> Removed </option>
            </select>
            
            <input v-if="editing" v-model="article.id" id="id" hidden><br><br>  
            <button v-if="editing" v-on:click.prevent="saveArticle($event, article.id)"> Save Changes </button>
            <button v-else @click.prevent="crearArticle"> Create Article </button>
        </form> 
        `,
    methods:{
        crearArticle: function () {
            let id;

            //Le damos un id para poder editar y borrar tranquilamente
            if(this.articles.length > 0) {
                let length = (this.articles.length);
                id = this.articles[length-1].id;
                id += 1;
            } else {
                id = 0;
            }

            //Lo añadimos al array
            this.articles.push( {
                title: this.article.title,
                content: this.article.content,
                author: this.article.author,
                id: id,
                image: this.article.image,
                status: this.article.status,
                date: this.article.date
            });

            //Empty alll the values
            this.article.title = "";
            this.article.content = "";
            this.article.author = "";
            this.$refs.img.value=null;
            // document.getElementById('image').value = null;
            this.article.date = "";
            this.article.status = "";

            localStorage.setItem('articles', JSON.stringify(this.articles));

        },
        editArticle: function() {
            if(this.$route.params.id) {
                 for(let i = 0; i < this.articles.length; i++) {
                    if(this.articles[i].id == this.$route.params.id) {
                        //Add all the information on the inputs of the forms    
                        this.article.title = this.articles[i].title;
                        this.article.content = this.articles[i].content;
                        this.article.author = this.articles[i].author;
                        this.article.id = this.articles[i].id;
                        this.article.date = this.articles[i].date;
                        this.article.image = this.articles[i].image;
                        this.article.status = this.articles[i].status;
                    }
                }
                
                this.editing = true;
            }
         
           
        },  
        saveArticle(e) {
            console.log(this.article.content);

            console.log(this.article.id);
            this.articles[this.article.id] = {
                title: this.article.title,
                content: this.article.content,
                author: this.article.author,
                id: this.article.id,
                image: this.article.image,
                status: this.article.status,
                date: this.article.date
            };

            console.log(this.article.image);

            console.log(this.articles[this.article.id]);

            this.article.title = "";
            this.article.content = "";
            this.article.author = "";
            
            this.editing = false;


            localStorage.setItem('articles', JSON.stringify(this.articles));
        },
        updateImage(e) {
            console.log(e.target.name, e.target.files);
            // console.log(JSON.stringify(e.target.files[0]));   
            let name = e.target.files[0] ?? null;
            this.article.image = URL.createObjectURL(name);
            console.log(name);
            console.log(this.article);
            
        },
        updateStatus(e) {
            console.log(e.target.value);
            this.article.status = e.target.value;
            console.log(this.article.status);
        }
    },
   
    created() {  //Tmb funciona con mounted
        if(localStorage.getItem('articles')) {
            this.articles = JSON.parse(localStorage.getItem('articles'));
            
        }

         if(this.$route.params.id) {
            console.log('HI');
            this.editing = true;
            
        }
    }

}