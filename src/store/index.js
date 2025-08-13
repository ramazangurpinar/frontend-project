// src/store/index.js
import { createStore } from "vuex";
import axios from "axios";
import { buildProductRequest } from "@/utils/productRequest.js";

const api = axios.create({
  baseURL: "https://localhost:42057/api",
});

const store = createStore({
  state: () => ({
    products: [],
  }),

  mutations: {
    INIT_PRODUCTS(state, products) {
      state.products = products;
    },
    ADD_PRODUCT(state, product) {
      state.products = [...state.products, product];
    },
    DELETE_PRODUCT(state, products) {
      state.products = products;
    },
  },

  actions: {
    async getProducts({ commit }) {
      const { data } = await api.get("/Product"); // <-- /api/Product
      commit("INIT_PRODUCTS", data);
    },
    async addProduct({ commit }, { common, specific }) {
      if (!common || !common.productType) {
        throw new Error("productType is required");
      }
      const { endpoint, payload } = buildProductRequest(common, specific);
      const { data } = await api.post(endpoint, payload);
      const created =
      data && (data.id != null || data.Id != null) ? data : { ...payload, id: Date.now() };
      commit("ADD_PRODUCT", created);
      return created;
    },
    async deleteProduct({ commit }, id) {
      if (!id) {
        throw new Error("id is required");
      }
      console.log("deleteProduct -> id:", id);
      await api.delete(`/Product/${id}`); // <-- /api/Product/{id}
      commit("DELETE_PRODUCT", this.state.products.filter((p) => p.id !== id));
    }   
  },

  getters: {
    getProducts(state) {
      return state.products;
    },
  },
});

export default store;
