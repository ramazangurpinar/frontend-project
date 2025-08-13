<template>
  <div class="d-flex align-items-center justify-content-between mb-3 border-bottom border-secondary pb-2">
    <span class="h5 mb-0 text-info">{{ title }}</span>
    <RouterLink :to="cancelTo" class="btn btn-outline-danger btn-sm">Cancel</RouterLink>
  </div>
</template>

<script>
export default {
  name: "WizardHeader",
  props: {
    title: { type: String, default: "ProductType" },
    cancelTo: { type: [String, Object], default: "/" },
  },
};
</script>
