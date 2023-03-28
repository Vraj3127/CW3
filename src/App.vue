<template>
<div id="app">
  
      <header>
    <h1>{{sitename}}</h1>
    <button class="btn btn-dark" @click="toggleShowProduct" >
      {{cardItemCount}}
      <font-awesome-icon icon="fa-solid fa-cart-shopping"/>
      Shopping Cart
    </button>
    </header>

    <main>
      <br>
      <component :is="currentView" :products="products" :sortedproducts="sortedproducts" :imagesBaseURL="imagesBaseURL" :card="card"></component>
    </main>
  </div>
</template>

<script>
import ProductList from './components/products.vue'
import CheckoutList from './components/checkout.vue'


export default {
  name:"app",
  data () {
    return{
        sitename:"Subjects App",
        card:[],
        products:[],
        currentView: ProductList,
        imagesBaseURL:"",
        serverURL: "http://subjectsapp-env.eba-jzdkm3cr.eu-west-2.elasticbeanstalk.com/collections/products",
      }
  },
  components: { ProductList, CheckoutList},
  created: function () {
    let CartProduct = this;
        fetch("http://subjectsapp-env.eba-jzdkm3cr.eu-west-2.elasticbeanstalk.com/collections/products")
          .then(response => response.json())
          .then(json => {
            CartProduct.products = json;
          });
      },
  methods:{ 
    toggleShowProduct() {
      if (this.currentView === ProductList){
        this.currentView = CheckoutList;
      } else {
        this.currentView = ProductList;
      }
    },
  },
    computed: {
        cardItemCount: function () {
          return this.card.length || "";
        },
        sortedproducts() {
          function compare(a, b) {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
          }
          return this.products.sort(compare);
        },
  }
  };
</script>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
