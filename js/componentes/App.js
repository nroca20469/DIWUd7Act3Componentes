import Heade from './Header.js';  //Import the header component
import Foot from './Footer.js'; //Import the footer component

const { createApp } = Vue;

const app = createApp({
    data: () => {
        return {
            information: null
        }
    }, 
    components: {
        Foot,
        Heade
    }

}).mount('#app');