import Vue from "vue";
import Router from "vue-router";
import Knapsack from "@/components/Knapsack";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Knapsack",
      component: Knapsack
    }
  ]
});
