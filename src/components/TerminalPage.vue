<template>
  <div class="terminal-container">
    <!--    <div class="dropdown dropdown-hover">-->
    <!--      <div tabindex="0"  class="btn m-1">Themes</div>-->
    <!--      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">-->
    <!--        <li><a>Item 1</a></li>-->
    <!--        <li><a>Item 2</a></li>-->
    <!--      </ul>-->
    <!--    </div>-->
    <div class="window-container">
      <div v-for="(item,key) in terminals" :key="key">
        <div v-if="key === 'default' && item.show">
          <LocalTerminal :name="item.name"
                         :context="item.context"
                         :init-cmd="item.localInitCmd"
                         :show-header="item.showHeader"
                         :drag-conf="item.dragConf"
                         @on-active="onActive(key, $event)"
                         @close="closeWindow(key, item.name)">
          </LocalTerminal>
        </div>
        <div v-else-if="item.length > 0">
          <div v-for="(it,k) in item" :key="k">
            <LocalTerminal v-show="it.show"
                           :name="it.name"
                           :context="it.context"
                           :init-cmd="it.localInitCmd"
                           :show-header="it.showHeader"
                           :drag-conf="it.dragConf"
                           @on-active="onActive(key, $event)"
                           @close="closeWindow(key, it.name)">
            </LocalTerminal>
          </div>
        </div>
      </div>
    </div>
    <div class="editor-container" v-if="showEditor">
      <div class="editor-body">
        <nav class="navbar justify-center bg-base-300">
          <a class="btn btn-ghost text-lg">
            <img alt="SDB" :src="require('@/../public/logo.png')" class="w-4"/>
            功能列表
          </a>
        </nav>

        <nav class="flex justify-center bg-base-200">
          <ul class="menu menu-horizontal justify-center">
            <li>
              <a>
                <i class="fa-solid fa-file-contract text-secondary"></i>
                文档
              </a>
<!--              <pre> {{renderedMarkdown}}</pre>-->
            </li>
            <li>
              <a>
                <i class="fa-solid fa-book-open text-secondary"></i>
                Catalog
              </a>
            </li>
            <li>
              <a>
                <i class="fa-solid fa-newspaper text-secondary"></i>
                News
              </a>
            </li>
            <li>
              <a>
                <i class="fa-solid fa-rss text-secondary"></i>
                Blog
              </a>
            </li>
            <li>
              <a>
                <i class="fa-solid fa-users text-secondary"></i>
                Team
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  </div>
</template>

<script>

import TerminalPageJs from "@/components/TerminalPage.js";

export default TerminalPageJs;

</script>

<style scoped>
.terminal-container {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.terminal-container {
  display: flex;
  height: 100%;
}

.window-container {
  width: calc(100% - 500px);
  position: relative;
}

.editor-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.demo-btn {
  display: flex;
  justify-content: center;
  width: 100%;
}

.help-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.help-title {
  text-align: center;
}

.help-title, .help-list {
  color: white;
  width: 100%;
}

.help-list {
  margin-left: 74px;
  list-style: decimal;
  font-size: 20px;
  padding-top: 0;
  margin-top: 0;
}

.help-list li {
  margin: 15px;
}

.editor-icon {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
}

</style>

<style>
.btn-default {
  color: #3eaf7c;
  background-color: #ffffff;
}

.active {
  background-color: #70d095;
  color: white;
}

.t-header-container ul {
  display: flex;
}

.t-shell-dots-red {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.t-shell-dots-yellow {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.t-shell-dots-green {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
</style>
