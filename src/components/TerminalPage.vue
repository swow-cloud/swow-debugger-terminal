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
        <nav class="flex justify-center bg-base-200" style="border-radius: 10px">
          <img alt="SDB" :src="require('@/../public/logo.png')" class="w-20"/>
          <ul class="menu menu-horizontal justify-center">
            <li>
              <a @click="renderedMarkdown">
                <i class="fa-solid fa-file-contract text-secondary"></i>
                文档
              </a>
            </li>
            <li>
              <a>
                <i class="fa-solid fa-book-open text-secondary"></i>
                CatLog
              </a>
            </li>
            <li>
              <a>
                <i class="fa-solid fa-newspaper text-secondary"></i>
                服务状态
              </a>
            </li>
          </ul>
        </nav>
        <div class="markdown-content" v-html="renderedMarkdownContent"></div>
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
  margin-top: 10px;
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

.markdown-content {
  margin-top: 1em; /* Add some space between the navbar and the content */
  max-width: 800px; /* Set a max-width to keep the content readable */
  margin-left: auto; /* Center the container */
  margin-right: auto; /* Center the container */
  padding: 1em; /* Add some padding inside the container */
  background-color: #fff; /* Optionally set a background color */
  border-radius: 8px; /* Optionally round corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optionally add a subtle shadow */
}
</style>
