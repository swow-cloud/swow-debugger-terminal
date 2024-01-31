<template>
  <div class="content">
    <div class="left">
      <img src="../asset/logo.png" class="people p-animtion" alt="people">
      <img src="../asset/img1.png" class="sphere s-animtion" alt="sphere">
    </div>
    <div class="right">
      <div class="form-wrappepr">
        <h1>欢迎进入SDB调试!🚀🏆</h1>
        <input class="inputs user" v-model="form.account" placeholder="请输入账号">
        <input class="inputs pwd" v-model="form.password" placeholder="请输入密码">
        <button class="myButton" @click="login(form)">登录</button>
        <div class="other-login">
          <!-- <div class="divider">
              <span class="line"></span>
              <span class="divider-text">or continue with</span>
              <span class="line"></span>
          </div> -->
          <!-- <div class="other-login-wrapper">
              <div class="other-login-item">
                  <img src="../asset/QQ.png" alt="QQ">
              </div>
              <div class="other-login-item">
                  <img src="../asset/WeChat.png" alt="WeChat">
              </div>
          </div> -->
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import '@/asset/style.css'
// import '@/asset/style.scss'

export default {
  name: 'Login', // 组件名称
  // eslint-disable-next-line vue/no-unused-components
  data() {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },
  mounted() {
    // 如果你需要保留这些动画效果，可以将它们移入这里
    this.$nextTick(() => {
      document.querySelector(".people").addEventListener('animationend', function () {
        this.classList.remove('p-animtion');
        this.classList.add('p-other-animtion');
      });

      document.querySelector(".sphere").addEventListener('animationend', function () {
        this.classList.remove('s-animtion');
        this.classList.add('s-other-animtion');
      });
    });
  },
  methods: {
    login(form) {
      if (form.account === '' || form.password === '') {
        this.$notify.error({
          message: '账号或密码不能为空',
        })
      } else {
        this.$notify.success({
          message: '登录成功',
        })
        this.$emit('update:login', false);
      }
    }
  },
}
</script>