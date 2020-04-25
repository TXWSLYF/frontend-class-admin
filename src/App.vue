<template>
  <div id="app">
    <HeaderBar :userInfo="userInfo" />
    <main>
      <div class="menu-container">
        <Menu />
      </div>
      <div class="router-container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Menu from '@/components/Menu.vue';
import HeaderBar from '@/components/HeaderBar.vue';

export default {
  name: 'App',
  components: { Menu, HeaderBar },
  computed: {
    ...mapState(['userInfo']),
  },
};
</script>

<style lang="less" scoped>
@header-height: 60px;
@menu-width: 160px;

#app {
  background-color: #f5f8fc;
  > main {
    display: flex;
    height: ~"calc(100vh - @{header-height})";

    .menu-container {
      width: @menu-width;
      flex-shrink: 0;

      /deep/ .menu {
        height: 100%;

        > ul {
          height: 100%;
        }
      }
    }

    > .router-container {
      width: ~"calc(100vw - @{menu-width})";
    }
  }
}
</style>
