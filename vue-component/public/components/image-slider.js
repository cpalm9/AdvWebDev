Vue.component('image-slider', {
    template: `<div class="image-slider">
        <div class="images" v-for="img in [index]">
            <!-- use v-for and v-if to show the correct image here -->
            <img :src="images[index]">
        </div>
        <div class="image-slider-left" @click="previous"></div>
        <div class="image-slider-right" @click="next"></div>
    </div>`,
    methods: {
        next: function() {
            // go to the next image
            let index = this.index;
            if(index === this.images.length - 1){
                index = 0;
                setTimeout( ()=>{
                    this.$emit('index-change', index);
                })
            }
            else{
                index += 1
                this.$emit('index-change', index)
            }
        },
        previous: function() {
            // go to the previous image
            let index = this.index;
            if(index === 0){
                index = this.images.length - 1;
                this.$emit('index-change', index);
            }
            else{
                index -= 1;
                this.$emit('index-change', index);
            }
        }
    },
    props: {
        // define index and images properties
        index: Number,
        images: Array
    }
});