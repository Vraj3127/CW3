<template>
    <div>
        <h1>Welcome to products</h1>
        
        <div v-for="product in products" :key="products.id">
            <div class="row">
              <div class="col">
                <div class="card-body">
                  <span class=" fas fa-solid fa-book fa-4x"></span>
                  <h2>Lessons: {{product.lessons}}</h2>
                  <h5>Subject: {{product.subject}}</h5>
                  <h5>Location: {{product.location}}</h5>
                  <h5>Price: {{product.price}}</h5>
                  <h5>Spaces: {{product.spaces}}</h5>
                </div>
              </div>
            </div>
            <div class="col">
              <img class="" v-bind:src="product.img" height="250px" />
            </div>

            <div class="row">
              <div class="col text-center mt-2 mb-2">
                <button type="button" class="btn btn-dark" v-on:click="addToCard(product)" v-if="canAddToCart(product)">
                  Add to Cart
                </button>
               <div v-else>
                  <button class="btn btn-dark disabled">Add to Card</button>
                  <p>Out Of Stock!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
export default {
  name:"app",
  props:["products","imagesBaseURL", "card"],
  data () {
    return{}
  },
  methods:{
    addToCard: function (product) {
          if (product.spaces >= 1) {
            product.spaces = product.spaces - 1;
            this.card.push(product);
            if (!(this.tempcard.includes(product))) {
              this.tempcard.push(product);
            }
          }
        },
        canAddToCart(product) {
          return product.spaces > this.cardCount(product.id);
        },
        cardCount(id) {
          let count = 0;
          for (let i = 0; i < this.card.length; i++) {
            if (this.card[i] == id) {
              count++;
            }
          }
          return count;
        },
        
  }
}
</script>