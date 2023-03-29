<template>
<div id="app">
  
      <header>
    <h1>{{sitename}}</h1>
    <button class="btn btn-dark" @click="toggleShowProduct" >
      {{cardItemCount}}
      <font-awesome-icon icon="fa-solid fa-cart-shopping"/>
      Shopping Cart
    </button>
    <div class="btn-group btn-group-sm mt-2" aria-label="Basic example">
        <button type="button" class="btn  btn-primary mr-2" @click="deleteAllCaches">Delete All Caches</button>
        <button type="button" class="btn  btn-primary mr-2" @click="reloadPage">Reload Page</button>
        <button type="button" class="btn  btn-primary mr-2" @click="unregisterAllServiceWorkers">Unregister Service
          Worker</button>
        <a href="#" :href="serverURL" class="link-info">Lessons link</a>
      
      </div>
    </header>

    <main>
      <br>
      <component :is="currentView" :products="products" :sortedproducts="sortedproducts" 
      :imagesBaseURL="imagesBaseURL" :tempcard="tempcard" :addToCard="addToCard" :card="card" 
       :order="order"></component>
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
        currentView: ProductList,
        products:[],
        tempcard:[],
        imagesBaseURL:"",
        serverURL: "http://subjectsapp-env.eba-jzdkm3cr.eu-west-2.elasticbeanstalk.com/collections/products",
        order: {
          firstname: "",
          lastname: "",
          number: "",
        },
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
    addToCard: function (product) {
          if (product.spaces >= 1) {
            product.spaces = product.spaces - 1;
            this.card.push(product);
            if (!(this.tempcard.includes(product))) {
              this.tempcard.push(product);
            }
          }
        },
        searchItem: function (product) {
          fetch("http://subjectsapp-env.eba-jzdkm3cr.eu-west-2.elasticbeanstalk.com/collections/products/search?=" + CardProduct.filtertext).then(function (response) {
            response.json().then(function (json) {

              CartProduct.products = json;
            });
          });
        },
        remove: function (product) {
          if (this.card.includes(product)) {
            let index = this.card.indexOf(product);
            this.card.splice(index, 1);
            for (let i = 0; i < this.products.length; i++) {
              if (product == this.products[i]) {
                this.products[i].spaces++;
              }
            }
          }
        },
    toggleShowProduct() {
      if (this.currentView === ProductList){
        this.currentView = CheckoutList;
      } else {
        this.currentView = ProductList;
      }
    },
    canAddToCart(product) {
          return product.spaces > this.cardCount(product.id);
        },
        deleteAllCaches() {
      caches.keys().then(function (names) {
        for (let name of names)
          caches.delete(name);
      });
    },
    //method to unregister service worker
    unregisterAllServiceWorkers() {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister()
        }
      });
      console.log("ServiceWorkers Unregistered");
    },
    reloadPage() {
      window.location.reload();
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
        created() {
    this.CartProduct();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("serviceworker.js");
    }
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
