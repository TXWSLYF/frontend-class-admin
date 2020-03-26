<template>
  <div
    class="login"
    :style="{
      backgroundImage: `url(${backgroundUrl})`,
      backgroundSize: 'cover'
    }"
  >
    <main>
      <header>
        <h4>登陆</h4>
      </header>
      <p>前端课堂后台</p>
      <el-form
        label-width="45px"
        label-position="left"
        :model="{ name: name, password: password }"
        :rules="rules"
        ref="form"
      >
        <el-form-item prop="name">
          <i slot="label" class="el-icon-user" style="font-size:20px" />
          <el-input v-model="name" />
        </el-form-item>
        <el-form-item prop="password">
          <i slot="label" class="el-icon-lock" style="font-size:20px" />
          <el-input v-model="password" type="password" />
        </el-form-item>
      </el-form>
      <div class="btn-container">
        <el-button type="text" style="width:200px" @click="$_login">登录</el-button>
      </div>
    </main>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { login } from '@/api/auth';

export default {
  name: 'LogIn',
  data() {
    return {
      backgroundUrl: 'https://s2.ax1x.com/2020/02/16/3ShwYq.jpg',
      name: '',
      password: '',
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },

  methods: {
    ...mapMutations(['setUserInfo']),
    $_login() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { name, password } = this;
          const res = await login({ name, password });
          this.setUserInfo({ isLogin: true, ...res });
          this.$router.replace({
            path: '/',
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  > main {
    background: white;
    box-shadow: 0 2px 10px 0 rgba(56, 35, 219, 0.2);
    padding: 20px;
    border-radius: 6px;
    width: 350px;

    > header {
      background: linear-gradient(60deg, #66bb6a, #388e3c);
      box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2), 0 13px 24px -11px rgba(76, 175, 80, 0.6);
      color: white;
      margin: -40px 20px 15px;
      border-radius: 3px;
      padding: 20px 0;
      text-align: center;
    }

    > p {
      margin-bottom: 10px;
      text-align: center;
      font-size: 14px;
    }

    .btn-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
