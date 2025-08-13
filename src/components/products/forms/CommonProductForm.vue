<template>
  <div>
    <h5 class="text-light mb-3">Product Details</h5>
    <div class="form-group">
      <label class="text-info" for="product-type">Product Type</label>
      <select id="product-type" v-model="form.productType" class="bg-dark border border-info text-light form-control" required>
        <option value="Headphone">Headphone</option>
        <option value="Keyboard">Keyboard</option>
      </select>
    </div>

    <div class="form-group">
      <label class="text-info" for="product-name">Product Name</label>
      <input id="product-name" v-model.trim="form.name" type="text" class="bg-dark border border-light text-light form-control" placeholder="Enter product name..." required />
    </div>

    <div class="form-group">
      <label class="text-info" for="product-desc">Description</label>
      <textarea id="product-desc" v-model.trim="form.description" class="bg-dark border border-light text-light form-control" rows="3" placeholder="Enter a short description..." />
    </div>

    <div class="form-group">
      <label class="text-info" for="product-price">Price</label>
      <input id="product-price" v-model.number="form.price" type="number" step="0.01" min="0" inputmode="decimal" class="bg-dark border border-light text-light form-control" placeholder="Enter product price..." required />
    </div>

    <div class="form-group">
      <label class="text-info" for="product-image">Image File Name</label>
      <input id="product-image" v-model.trim="form.imageFileName" type="text" class="bg-dark border border-light text-light form-control" placeholder="e.g., sony-wh1000xm5.jpg" />
    </div>

    <div class="form-group form-check">
      <input id="product-wireless" v-model="form.wireless" type="checkbox" class="form-check-input" />
      <label class="form-check-label text-info" for="product-wireless">Wireless</label>
    </div>

    <div class="form-group">
      <label class="text-info" for="product-weight">Weight</label>
      <input id="product-weight" v-model.trim="form.weight" type="text" class="bg-dark border border-light text-light form-control" placeholder="e.g., 250g" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonProductForm",
  props: { modelValue: { type: Object, required: true } },
  emits: ["update:modelValue"],
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(v) {
        this.$emit("update:modelValue", v);
      },
    },
  },
};
</script>
