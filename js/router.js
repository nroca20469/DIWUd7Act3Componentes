// import Post from './componentes/Post.js';
import ViewPosts from './componentes/ViewPosts.js';
import PostCreation from './componentes/PostCreation.js';

let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [   
        { path: '/', name: "Post", component: ViewPosts },
        { path: '/post/:message', name: "PostCreation", component: PostCreation },
        { path: '/post/:message/:id', name: "Editing", component: PostCreation }
    ]
});

export default router;