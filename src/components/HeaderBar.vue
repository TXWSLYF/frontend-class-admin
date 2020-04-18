<template>
  <header>
    <div class="icon-container">
      <h3>前端课堂后台</h3>
    </div>
    <el-popover placement="bottom" trigger="hover">
      <div>
        <div
          @click="handleLogout"
          :style="{
            textAlign: 'center',
            cursor: 'pointer',
            padding: '10px'
          }"
        >
          退出登录
        </div>
      </div>
      <div slot="reference">
        <div class="avatar"  >
          <div class="no-avatar" v-if="!userInfo.avatar">未登录</div>
          <img  v-else :src="userInfo.avatar" />
          <i class="el-icon-arrow-down" />
        </div>
      </div>
    </el-popover>
  </header>
</template>

<script>
import { logout } from '@/api/auth';
import { mapMutations } from 'vuex';

export default {
  name: 'HeaderBar',
  props: ['userInfo'],
  methods: {
    ...mapMutations(['setUserInfo']),

    async handleLogout() {
      await logout();
      this.setUserInfo({
        isLogin: false,
        name: '',
        avatar: '',
        role: '',
      });
      this.$router.replace({
        path: '/login',
      });
    },
  },
};
</script>

<style lang="less" scoped>
@header-height: 60px;
@menu-width: 160px;

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: @header-height;
  background: rgba(64, 158, 255,0.6);

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: @menu-width;
    height: @header-height;

    > h3 {
      color: white;
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    height: 32px;
    cursor: pointer;
    margin-right: 20px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    i {
      margin-left: 10px;
      font-weight: bold;
      color: white;
    }
  }
  .avatar .no-avatar {
    height: 32px;
    width: 32px;
    line-height: 32px;
    text-align:center;
    font-size: 10px;
    font-weight: bolder;
    color: rgba(64, 158, 255,0.6);
    background: white;
    border-radius: 50%;
  }
}
</style>
