<template>
  <div id="app">
    <div v-if="editMode">
      <terminal-page @close="editMode=false" :init-cmd="localInitCmd"></terminal-page>
    </div>
    <div v-else>
      <div>
        <img :src="require('@/assert/logo.svg')" class="logo" alt="terminal-logo">
        <h1 class="title">SDB</h1>
        <p class="des">一个轻量、功能强大可以与swow构建的server进行终端调试。</p>

      </div>
      <div class="btn-box">
        <button v-show="!editMode" @click="editMode=true" class="btn btn-local">点击进入</button>
      </div>
    </div>

  </div>
</template>

<script>
import AppJs from './App.js'

export default AppJs
</script>

<style scoped>
h1, p {
  text-align: center;
}

.des {
  left: 0;
  right: 0;
  margin: 15px auto;
  font-weight: 300;
}

.btn-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  left: 0;
  right: 0;
  height: 100px;
  padding-bottom: 100px;
}

.btn-local {
  color: #ffffff;
  background-color: #3eaf7c;
  border-color: rgba(240, 246, 252, 0.1);
  box-shadow: 0 0 transparent, 0 0 transparent;
  border-bottom: 1px solid #389d70;
}

.btn-local:hover {
  background-color: #4abf8a;
}

.logo {
  width: 300px;
  height: 250px;
  position: relative;
  left: 50%;
  right: 0;
  margin-left: -150px;
  margin-top: 150px;
}

.title {
  margin-bottom: 50px;
  color: #2c3e50;
  font-size: 2.5em;
}

.des {
  color: #6a8bad;
  font-size: 22px;
}

@media screen and (max-width: 768px) {
  .btn-box {
    width: 100%;
  }

  .title {
    font-size: 2em;
  }

  .des {
    width: 95%;
    font-size: 1em;
  }

  .logo {
    width: 200px;
    height: 170px;
    margin: 50px 0 20px -100px;
  }
}

@media screen and (max-width: 960px) and (min-width: 768.1px) {
  .des {
    width: 70%;
  }

  .title {
    margin: 80px 0
  }

  .logo {
    margin-top: 50px;
  }
}

@media screen and (max-width: 1200px) and (min-width: 960.1px) {
  .des {
    width: 100%;
  }

  .logo {
    margin-top: 80px;
  }
}

@media screen and (min-width: 1200.1px) {
  .logo {
    margin-top: 150px;
  }
}
</style>

<style>
body, html, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  font-family: Menlo, Consolas, monospace;
  overflow: auto;
}

/* github link style */
.github-corner {
  display: inline-block;
  position: relative;
  width: 150px;
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave {
  0%, 100% {
    transform: rotate(0)
  }
  20%, 60% {
    transform: rotate(-25deg)
  }
  40%, 80% {
    transform: rotate(10deg)
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none
  }

  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out
  }
}

.github-cat {
  fill: #151513;
  color: #151513;
  border: 0;
  transform: rotateZ(315deg);
  position: absolute;
  left: 0px;
  top: -42px;
}

.github-tag {
  display: inline-block;
  position: absolute;
  width: 130px;
  font-size: 10px;
  font-weight: 400;
  top: -26px;
  left: 70px;
  background-color: white;
  color: #151515;
  border: 1px solid #cfced1;
  padding: 2px;
  border-left: none;
  z-index: 1;
  font-family: monospace;
  height: 16px;
  line-height: 16px;
  border-radius: 2px;
}

.github-tag:hover {
  color: #2396a6;
}

.github-tag:after {
  content: '';
  width: 15px;
  height: 15px;
  position: absolute;
  left: -8px;
  top: 2px;
  z-index: -1;
  transform: rotateZ(45deg);
  border: 1px solid #cfced1;
  background-color: white;
  border-radius: 3px;
  border-right: none;
  border-top: none;
}

.btn {
  margin: 15px;
  padding: 0.5em 1.5em;
  font-size: 1.2em;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 15px rgb(0 0 0 / 20%);
  transition: background-color .1s ease;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: bold;
}
</style>
