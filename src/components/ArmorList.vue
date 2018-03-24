<template>
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Level</th>
        <th>Rare</th>
        <th>Slot</th>
        <th>Part</th>
        <th>Skill</th>
        <th>Items</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="armor in armors" :key="armor.idx">
        <td>{{armor.name}}</td>
        <td>{{armor.set_level}}</td>
        <td>{{armor.rare}}</td>
        <td>{{armor.slots}}</td>
        <td>{{armor.part}}</td>
        <td>
          <div v-for="s in armor.skills">
            <span>{{s.name}} {{s.level}}</span>
          </div>
        </td>
        <td>
          <div v-for="i in armor.items">
            <span>{{i.name}} {{i.count}}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "armor-list",
  props: ["armors"],
  computed: {
    // ...mapState(["armors"])
  },
  data() {
    return {};
  }
};
</script>
