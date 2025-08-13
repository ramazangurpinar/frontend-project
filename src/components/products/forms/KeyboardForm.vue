<template>
  <div>
    <h5 class="text-light mb-3">Keyboard Details</h5>
    <div class="form-group form-check">
      <input
        id="is-mechanical"
        class="form-check-input"
        type="checkbox"
        :checked="!!modelValue.isMechanical"
        @change="update('isMechanical', $event.target.checked)"
      />
      <label class="form-check-label text-info" for="is-mechanical">Is Mechanical</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeyboardForm",
  props: { modelValue: { type: Object, required: true } },
  emits: ["update:modelValue"],
  methods: {
    update(key, value) {
      this.$emit("update:modelValue", { ...this.modelValue, [key]: value });
    },
  },
};
</script>
