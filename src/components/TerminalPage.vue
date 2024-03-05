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

        <!--        <div class="demo-btn">-->
        <!--          <button :class="'btn ' + (terminals.default.show ? 'active' :'btn-default')"-->
        <!--                  @click="showDemo('default')">默认显示-->
        <!--          </button>-->
        <!--        </div>-->
        <!--        <div class="demo-btn">-->
        <!--          <button :class="'btn ' + (terminals.list.length > 0 ? 'active' :'btn-default')"-->
        <!--                  @click="showDemo('list')">多窗口示例（多次戳我）-->
        <!--          </button>-->
        <!--        </div>-->

        <!--        <div class="help-container">-->
        <!--          <h2 class="help-title">使用小技巧</h2>-->
        <!--          <ul class="help-list">-->
        <!--            <li>拖动窗口Header可以拖拽</li>-->
        <!--            <li>双击窗口Header可以全屏</li>-->
        <!--            <li>选中内容右键可以复制到剪切板</li>-->
        <!--            <li>输入时右键可以粘贴剪切板内容</li>-->
        <!--            <li>双击窗口可以强制获取焦点</li>-->
        <!--            <li>拖拽窗口四个角可以缩放大小</li>-->
        <!--          </ul>-->
        <!--        </div>-->

        <!--        <el-container>-->
        <!--          &lt;!&ndash; 顶部导航 &ndash;&gt;-->
        <!--          <el-header style="height: 100%">-->
        <!--            <img style="width: 250px" :src="require('@/../public/logo.png')" alt="SDB">-->
        <!--          </el-header>-->

        <!--          &lt;!&ndash; 页面主体 &ndash;&gt;-->
        <!--          <el-container>-->
        <!--            &lt;!&ndash; 主内容区与侧边栏区域 &ndash;&gt;-->
        <!--            <el-main>-->
        <!--              <div v-html="renderedMarkdown"></div>-->
        <!--            </el-main>-->
        <!--          </el-container>-->

        <!--          &lt;!&ndash; 底部信息 &ndash;&gt;-->
        <!--          <el-footer>-->
        <!--            底部信息如版权声明归@swow-cloud所有-->
        <!--          </el-footer>-->
        <!--        </el-container>-->
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
                <i class="fa-solid fa-shop text-secondary"></i>
                Shop
              </a>
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
</style>
