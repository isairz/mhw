<template>
  <section class="section">
    <div class="container">
      <skill-input @input="submit"></skill-input>
      {{ filter }}
      <armor-set :sets="result"></armor-set>
      <armor-list :armors="candidate"></armor-list>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import * as _ from "lodash";

import ArmorSet from "./ArmorSet.vue";
import ArmorList from "./ArmorList.vue";
import SkillInput from "./SkillInput.vue";

function find(armors, parts, filter) {
  this.result = result;
}

export default {
  name: "Knapsack",
  components: { ArmorSet, ArmorList, SkillInput },
  mounted() {
    this.$store.dispatch("loadDatabase");
  },
  methods: {
    submit(tags) {
      let newFilter = {};
      for (let tag of tags) {
        if (tag.level > 0) newFilter[tag.name] = tag.level;
      }
      this.filter = newFilter;
    }
  },
  computed: {
    ...mapState(["parts", "armors", "skills"]),

    candidate() {
      return this.armors.filter(a => {
        if (a.set_level === "하위") return false;
        for (let s of a.skills) {
          if (this.filter[s.name]) return true;
        }
        return false;
      });
    },

    result() {
      const { filter } = this;
      const start = Date.now();
      let result = [];
      let now = [];

      const byParts = this.parts.map(part =>
        this.candidate.filter(armor => armor.part === part)
      );

      function recur(i, skill) {
        if (i == byParts.length) {
          for (let f in filter) {
            if (!skill.hasOwnProperty(f)) return;
            if (skill[f] < filter[f]) return;
          }
          result.push([...now]);
          return;
        }
        for (let a of byParts[i]) {
          // if (result.length >= 5) return;
          let nextSkill = { ...skill };
          for (let s of a.skills) {
            if (nextSkill.hasOwnProperty(s.name)) nextSkill[s.name] += s.level;
            else nextSkill[s.name] = s.level;
          }
          now[i] = a;
          recur(i + 1, nextSkill);
        }
      }
      recur(0, {});
      console.log(Date.now() - start);
      return result;
    }
  },
  data() {
    return {
      filter: { "가드 성능": 3, 포술: 3, "체력 증강": 2 },
      tags: []
    };
  }
};
</script>
