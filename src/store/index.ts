import { state } from "./state";
import { getters } from "./getters";
import { actions } from "./actions";
import { defineStore } from "pinia";


export const useGlobalStore = defineStore("globalStore", {
  state,
  getters,
  actions,
});
