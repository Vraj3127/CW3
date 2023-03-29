<template>
    <div>
        <div class="col-md-10">
        <h1> Shopping Cart :</h1>
        <h2 class="text-center">Total subjects : {{ cardItemCount }}</h2>
        <br><br>
        
        <div v-for="product in tempcard">
          <img v-bind:src="product.img" height="250px" />
          <div class="card-body">
            <span class=" fas fa-solid fa-book fa-4x"></span>
            <h2>Lessons : {{product.lessons}}</h2>
            <h5>Subject:{{product.subject}}</h5>
            <h5>Location:{{product.location}}</h5>
            <h5>Price: {{product.price}}</h5>
            <h5>Total Space:{{product.spaces}}</h5>
            <h5>Spaces Selected:{{tcardCount(product)}}</h5>
            <div class="text-center">
              <button type="button" class="btn btn-dark" v-on:click="remove(product)">
                Remove
              </button>
            </div>
          </div>
        </div> 
    </div>
    <div>
          <strong> FirstName :</strong>
          <input type="text" v-model.trim="order.firstname" class="form-control" placeholder="Enter Your First Name" />

          <strong> LastName:</strong>
          <input type="text" v-model.trim="order.lastname" placeholder="Enter Your Last Name" class="form-control" />

          <strong> PhoneNumber:</strong>
          <input type="tel" v-model.number="order.number" placeholder="Enter your Mobile Number" class="form-control" />
        </div>
      <div class="col-md-12 verify">
        <h2>Order Summary</h2>
        <pre>
                First Name: {{order.firstname}}
                Last Name: {{order.lastname}}
                Phone Number: {{order.number}}
            </pre>
      </div> 
      <div class="text-center">
        <button type="submit" class="btn btn-dark" v-on:click="submitForm"> Place Your Order</button>
      </div>
    </div>
</template>

<script>
export default{
    name: "checkout",
    props: ["products","imageBaseURL","card", "tempcard", "order"],
    data() {
        return {}
    },
    methods:{
        remove(products) {
            this.$emit("remove-product", products);
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
        lessonsLeft(product) {
          return product.spaces - this.cardCount(product.id);
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
        tcardCount: function (product) {
          let c = 0;
          for (let i = 0; i < this.card.length; i++) {
            if (this.card[i] == product) {
              c = c + 1;
            }
          }
          return c;
        },
        submitForm() {
          if (/^[a-zA-Z]+$/.test(this.order.firstname) && /^[a-zA-Z]+$/.test(this.order.lastname) && /^\d+$/.test(this.order.number)) {
            let client = {
              name: this.order.firstname,
              lastname: this.order.lastname,
              number: this.order.number,
              datas: this.tempcard
            }
            console.log(client)
            alert("Congrulatation!!! We have recieved your order");
            fetch("http://subjectsapp-env.eba-jzdkm3cr.eu-west-2.elasticbeanstalk.com/collections/products/order", {
              method: "POST",
              headers: { "Content-Type": "application/json", },
              body: JSON.stringify(client)
            }).then(function (response) {
              response.text().then(function (text) { });
            });

            for (let i = 0; i < this.tempcard.length; i++) {

              let carr = this.tempcard[i];
              console.log(CartProduct.lessonLeft(carr));
              console.log(carr.id)
              fetch("http://subjectsapp-env.eba-jzdkm3cr.eu-west-2.elasticbeanstalk.com/collections/products/" + carr.id, {
                method: "PUT",
                headers: { "Content-Type": "application/json", }, body: JSON.stringify(
                  { "spaces": CartProduct.lessonLeft(carr) })
              }).then(function (response) {
                response.json().then(function (json) { console.log(json) });
              });

            }
          }
          else {
            alert("Error! validation failed")
          }

        },
    },
    computed: {
        cardItemCount: function () {
          return this.card.length || "";
        },
        showitems: function () {
          return this.product.cardItemCount;
        },
        
    } 
}
</script>