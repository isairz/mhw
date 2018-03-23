<template>
  <div class="hello">
    <armor-set :sets="result"></armor-set>
    {{ checkTime }}
  </div>
</template>

<script>
import { mapState } from "vuex";

import ArmorSet from "./ArmorSet.vue";

export default {
  name: "Knapsack",
  components: { ArmorSet },
  mounted() {
    this.$store.dispatch("loadDatabase");
  },
  computed: {
    ...mapState(["byParts", "skills"]),

    checkTime() {
      const start = Date.now();
      let count = 0;
      const { byParts, result } = this;
      let now = [];
      let skills = {};
      function recur(i) {
        if (i == byParts.length) {
          count += 1;
          result.push([...now]);
          return;
        }
        for (let a of byParts[i]) {
          if (count >= 5) return;
          now[i] = a;
          skills[a.skills[i]];
          recur(i + 1);
        }
      }
      recur(0);
      return { count, time: Date.now() - start };
    }
  },
  data() {
    return {
      result: []
    };
  }
};
</script>
