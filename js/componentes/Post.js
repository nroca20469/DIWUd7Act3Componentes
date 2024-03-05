export default {
    name: "Post", 
    props: ['pos'],
    template: `
        Title: {{ pos.title }} <br>
        Content: {{ pos.content }} <br>
        Author: {{ pos.author }} <br>
        Image: <img :src=pos.image width="20" heigh="20"/> <br>
        Status: {{ pos.status }} <br>
        Date: {{ pos.date }} <br>
        <button @click.prevent="editArticle(pos)"> Edit </button>
       <!-- <router-link to="/post/editing/true"> <button> Edit </button> </router-link> -->
        <button @click.prevent="deleteArticle($event, pos)"> Delete </button>
    `,
    methods: {
        editArticle(pos) {
            this.$emit('editArticle', pos);

            this.$router.push({ path: '/post/editing/' + pos.id });
        },
        deleteArticle(e, pos) {
            this.$emit('deleteArticle', [e, pos]);       
        }
    }
}