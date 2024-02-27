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
        <button @click.prevent="editArticle($event, pos)"> Edit </button>
        <button @click.prevent="deleteArticle($event, pos)"> Delete </button>
    `,
    methods: {
        editArticle: function(e, pos) {
            this.$emit('editArticle', [e, pos]);
        },
        deleteArticle(e, pos) {
            this.$emit('deleteArticle', [e, pos]);       
        }
    }

}