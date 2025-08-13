<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <form class="card mt-5 p-3 border border-dark bg-dark shadow" @submit.prevent="onSubmit">
        <!-- Dynamic Header Component -->
        <WizardHeader :title="`${common.productType} Product`" cancel-to="/" />

        <!-- Step 1: Common fields -->
        <CommonProductForm v-if="step === 1" v-model="common" />

        <!-- Step 2: Type-specific fields (dynamic component) -->
        <component v-else :is="typeComponent" v-model="specific" :key="common.productType" />

        <div class="d-flex justify-content-between mt-3">
          <button type="button" class="btn btn-outline-light" :hidden="step === 1" @click="prev">Back</button>
          <div>
            <button v-if="step === 1" type="button" class="btn btn-outline-light mr-2" @click="next">Next</button>
            <button v-else type="submit" class="btn btn-outline-success">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CommonProductForm from "@/components/products/forms/CommonProductForm.vue";
import HeadphoneForm from "@/components/products/forms/HeadphoneForm.vue";
import KeyboardForm from "@/components/products/forms/KeyboardForm.vue";
import WizardHeader from "@/components/products/WizardHeader.vue";

const typeFormMap = {
  Headphone: HeadphoneForm,
  Keyboard: KeyboardForm,
};

const SPEC_TEMPLATES = Object.freeze({
  Headphone: Object.freeze({
    manufacturer: "",
    batteryLife: "",
    noiseCancellationType: "",
    mic: false,
  }),
  Keyboard: Object.freeze({
    isMechanical: false,
  }),
});

function newSpecific(productType) {
  const tpl = SPEC_TEMPLATES[productType] || {};
  if (typeof structuredClone === "function") return structuredClone(tpl);
  return JSON.parse(JSON.stringify(tpl));
}

const DEFAULT_COMMON = Object.freeze({
  productType: "Headphone",
  name: "",
  description: "",
  price: 0,
  imageFileName: "",
  wireless: false,
  weight: "",
});

export default {
  name: "NewProductWizard",
  components: { CommonProductForm, HeadphoneForm, KeyboardForm, WizardHeader },

  data() {
    return {
      step: 1,
      common: { ...DEFAULT_COMMON },
      specific: newSpecific(DEFAULT_COMMON.productType),
      isSubmitting: false,
    };
  },

  computed: {
    typeComponent() {
      return typeFormMap[this.common.productType] || HeadphoneForm;
    },
    isStep1Valid() {
      const { name, price } = this.common;
      return Boolean(name?.trim()) && Number(price) >= 0;
    },
  },

  watch: {
    "common.productType": {
      handler(val) {
        this.specific = newSpecific(val);
      },
      immediate: true,
    },
  },

  methods: {
    next() {
      if (!this.isStep1Valid) return;
      this.step = 2;
    },
    prev() {
      this.step = 1;
    },
    resetAll() {
      this.common = { ...DEFAULT_COMMON };
      this.specific = newSpecific(DEFAULT_COMMON.productType);
      this.step = 1;
    },
    async onSubmit() {
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      try {
        await this.$store.dispatch("addProduct", {
          common: this.common,
          specific: this.specific,
        });
        this.$router.push("/");
      } catch (err) {
        alert(err.response.data.title);
        console.error("Add product failed:", err);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
