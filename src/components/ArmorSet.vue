<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="part in parts" :key="part">
          {{ part }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(set, idx) in sets" :key="idx">
        <td v-for="item in set" :key="item.idx">
          {{item.name}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "armor-set",
  props: ["sets"],
  computed: {
    ...mapState(["parts"])
  },
  data() {
    return {};
  }
};
</script>
