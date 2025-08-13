<template>
  <tr>
    <td class="text-light">{{ product.id }}</td>
    <td class="text-light">{{ product.productType }}</td>
    <td class="text-light">{{ product.name }}</td>
    <td class="text-light">{{ product.description }}</td>
    <td class="text-light">{{ product.price }}₺</td>
    <td class="text-light">{{ product.wireless ? "Yes" : "No" }}</td>
    <td class="text-light">{{ product.weight }}</td>

    <td class="text-nowrap actions-cell">
      <div class="d-flex align-items-center gap-2">
        <button
          class="btn btn-sm btn-outline-danger p-1"
          @click="onDelete(product.id)"
          aria-label="Delete"
          title="Delete"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "ProductRow",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDelete(id) {
      return this.$store.dispatch("deleteProduct", id);
    },
  },
};
</script>
