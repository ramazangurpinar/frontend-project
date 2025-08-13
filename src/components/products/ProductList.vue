<template>
  <div class="row">
    <div class="col-md-8 offset-md-2 mt-5">
      <RouterLink to="/new" class="btn btn-dark text-light float-right">New Product</RouterLink>

      <table
        v-if="products.length > 0"
        class="table table-hover table-dark table-striped border-dark border shadow-lg"
      >
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Type</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Wireless</th>
            <th scope="col">Weight</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <ProductRow v-for="p in products" :key="p.id" :product="p" />
        </tbody>
      </table>

      <div v-else class="alert alert-primary border-0">
        No products have been added yet.
      </div>

    </div>
  </div>
</template>

<script>
import ProductRow from "./ProductRow.vue";

export default {
  name: "ProductsList",
  components: { ProductRow },
  computed: {
    products() {
      return this.$store.getters.getProducts; // make sure this getter exists
    },
  },
};
</script>
