import { state } from "./state";
import { actions } from "./actions";
import { defineStore } from "pinia";


export const useGlobalStore = defineStore("globalStore", {
  state,
  actions,
});
