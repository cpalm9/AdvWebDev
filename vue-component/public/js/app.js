const app = new Vue({
    el: "#app",
    data: {
        duration: 3,
        food: {
            images: ['images/food-1.jpeg', 'images/food-2.jpeg', 'images/food-3.jpeg'],
            index: 0
        },
        landscape: {
            images: ['images/landscape-1.jpeg', 'images/landscape-2.jpeg', 'images/landscape-3.jpeg', 'images/landscape-4.jpeg'],
            index: 1
        },
        pet: {
            images: ['images/pets-1.jpeg', 'images/pets-2.jpeg', 'images/pets-3.jpeg'],
            index: 0
        }
    },
    methods: {
        foodIndexChange: function(value) {
            this.food.index = value;
        },
        landscapeIndexChange: function(value) {
            this.landscape.index = value;
        },
        petIndexChange: function(value) {
            this.pet.index = value;
        }
    }
});