import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const state = {
  armors: [],
  skills: [],
  parts: ["머리", "몸통", "팔", "허리", "다리"],
  byParts: []
};

const getters = {};

const actions = {
  loadDatabase({ commit }) {
    axios.get("/static/armors.json").then(res => {
      commit("setArmors", Array.from(res.data));
    });
    axios.get("/static/skills.json").then(res => {
      commit("setSkills", Array.from(res.data));
    });
  }
};

const mutations = {
  setArmors(state, armors) {
    state.armors = armors;
    state.byParts = state.parts.map(part =>
      armors.filter(armor => armor.part === part && armor.set_level !== "하위")
    );
  },
  setSkills(state, skills) {
    state.skills = skills;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
