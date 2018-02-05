Vue.component('image-slider', {
    template: `<div class="image-slider">
        <div class="images" v-for="img in images">
            <!-- use v-for and v-if to show the correct image here -->
            <img :src="img">
        </div>
        <div class="image-slider-left" @click="previous"></div>
        <div class="image-slider-right" @click="next"></div>
    </div>`,
    methods: {
        next: function() {
            // go to the next image
            
        },
        previous: function() {
            // go to the previous image
            
        }
    },
    props: {
        // define index and images properties
        index: Number,
        images: Array
    }
});