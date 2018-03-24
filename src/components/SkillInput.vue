<template>
  <div>
    <section>
      <b-field v-for="tag in tags" horizontal :label="tag.name">
        <b-input v-model="tag.level" type="number" :min="tag.min" :max="tag.max"></b-input>
      </b-field>
      <b-field grouped>
        <b-autocomplete
          v-model="newTag"
          placeholder="스킬 이름"
          :keep-first="true"
          :open-on-focus="true"
          :data="filteredTags"
          field="name"
          @select="onSelect"
          @keydown.native="keydown"
          >
        </b-autocomplete>
      </b-field>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SkillInput",
  methods: {
    onSelect(option) {
      if (!option) return;

      this.addTag(option);
      this.$nextTick(() => {
        this.newTag = "";
      });
    },
    addTag(tag) {
      const tagToAdd = {
        name: tag.name,
        level: tag.desc.length,
        min: 0,
        max: tag.desc.length
      };

      // Add the tag input if it is not blank or previously added.
      if (tagToAdd && this.tags.indexOf(tagToAdd) === -1) {
        this.tags.push(tagToAdd);
        this.$emit("input", this.tags);
        this.$emit("add", tagToAdd);
      }

      this.newTag = "";
    },
    removeTag(index) {
      var tag = this.tags.splice(index, 1)[0];
      this.$emit("input", this.tags);
      this.$emit("remove", tag);
      return tag;
    },
    removeLastTag() {
      if (this.tagsLength > 0) {
        this.removeTag(this.tagsLength - 1);
      }
    },
    keydown(event) {
      if (
        this.removeOnKeys.indexOf(event.keyCode) !== -1 &&
        !this.newTag.length
      ) {
        this.removeLastTag();
      }
    }
  },
  computed: {
    ...mapState(["skills"]),
    filteredTags() {
      return this.skills.filter(s => {
        return s && s.name && s.name.indexOf(this.newTag) >= 0;
      });
    }
  },
  data() {
    return {
      tags: [
        { name: "가드 성능", level: 3, min: 0, max: 5 },
        { name: "포술", level: 3, min: 0, max: 3 },
        { name: "체력 증강", level: 2, min: 0, max: 3 }
      ],
      newTag: "",
      removeOnKeys: [8]
    };
  }
};
</script>
