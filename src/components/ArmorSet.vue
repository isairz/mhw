<template>
  <div>
    {{sets.length}}
    <table class="table">
      <thead>
        <tr>
          <th v-for="part in parts" :key="part">
            {{ part }}
          </th>
          <th>Skill</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(set, idx) in sets" :key="idx">
          <td v-for="item in set" :key="item.idx">
            <div>{{item.name}}</div>
            <div>{{item.slots}}</div>
          </td>
          <td>
            <div v-for="(level, name) in sumSkill(set)">
              <span>{{name}} {{level}}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "armor-set",
  props: ["sets"],
  computed: {
    ...mapState(["parts"])
  },
  methods: {
    sumSkill(armors) {
      let skill = {};
      for (let a of armors) {
        for (let s of a.skills) {
          if (skill.hasOwnProperty(s.name)) skill[s.name] += s.level;
          else skill[s.name] = s.level;
        }
      }
      return skill;
    }
  },
  data() {
    return {};
  }
};
</script>
