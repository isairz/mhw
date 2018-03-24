<template>
  <div id="app">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <a class="navbar-item title" href="/">
        몬스터 헌터 스킬 시뮬레이터
      </a>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
