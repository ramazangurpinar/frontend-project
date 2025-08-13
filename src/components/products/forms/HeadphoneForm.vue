<template>
  <div>
    <h5 class="text-light mb-3">Headphone Specific Details</h5>

    <div class="form-group">
      <label class="text-info" for="manufacturer">Manufacturer</label>
      <input
        id="manufacturer"
        :value="modelValue.manufacturer || ''"
        @input="update('manufacturer', $event.target.value)"
        type="text"
        class="bg-dark border border-light text-light form-control"
        placeholder="e.g., Sony"
      />
    </div>

    <div class="form-group">
      <label class="text-info" for="battery-life">Battery Life</label>
      <input
        id="battery-life"
        :value="modelValue.batteryLife || ''"
        @input="update('batteryLife', $event.target.value)"
        type="text"
        class="bg-dark border border-light text-light form-control"
        placeholder="e.g., 30h"
      />
    </div>

    <div class="form-group">
      <label class="text-info" for="nc-type">Noise Cancellation Type</label>
      <input
        id="nc-type"
        :value="modelValue.noiseCancellationType || ''"
        @input="update('noiseCancellationType', $event.target.value)"
        type="text"
        class="bg-dark border border-light text-light form-control"
        placeholder="e.g., Hybrid ANC"
      />
    </div>

    <div class="form-group form-check">
      <input
        id="mic"
        class="form-check-input"
        type="checkbox"
        :checked="!!modelValue.mic"
        @change="update('mic', $event.target.checked)"
      />
      <label class="form-check-label text-info" for="mic">Microphone</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadphoneForm",
  props: { modelValue: { type: Object, required: true } },
  emits: ["update:modelValue"],
  methods: {
    update(key, value) {
      // parent objesini kopyalayıp tek alanı değiştir
      this.$emit("update:modelValue", { ...this.modelValue, [key]: value });
    },
  },
};
</script>
