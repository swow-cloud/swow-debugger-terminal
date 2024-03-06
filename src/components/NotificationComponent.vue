<template>
  <transition name="fade">
    <div class="notification" :class="['notification', type]" v-show="show">
      <strong class="notification-title text-accent-content">
        <span class="icon-container"><i class="fa-solid fa-bell text-amber-500"></i></span>{{ title }}
      </strong>
      <button class="notification-close" @click="closeNotification" aria-label="Close">&times;</button>
      <div class="notification-message" v-html="message" />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '您有一条新消息!'
    },
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    closeNotification() {
      this.show = false;
    }
  },
  mounted() {
    setTimeout(() => {
      this.closeNotification();
    }, this.duration);
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.notification {
  max-width: 300px;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: white;
  padding-right: 40px; /* 增加右内边距为关闭按钮留出空间 */
}

.notification .notification-title {
  font-weight: bold;
  display: flex;        /* 使用flex容器使icon和标题分开并能控制间距 */
  align-items: center;  /* 垂直居中 */
  overflow: hidden;     /* 隐藏超出容器的文本 */
  text-overflow: ellipsis; /* 末尾显示省略号 */
  margin-bottom: 5px;
  z-index: 1; /* 确保标题在关闭按钮下层 */
  /* 不再需要定义display: block; 因为使用了flex布局 */
}

.notification .notification-message {
  font-size: 0.9em;
  color: #666;
  word-break: break-word;
}
.notification-icon {
  height: 16px; /* 或其他适当的高度 */
  width: 16px;  /* 或其他适当的宽度 */
  margin-right: 10px; /* 按需调整间距大小 */
  vertical-align: middle; /* 使图标垂直居中 */
}
.notification .notification-close {
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  z-index: 2; /* 提高关闭按钮的z-index */
}

.notification .icon-container {
  margin-right: 10px; /* 按需调整间距大小 */
  display: flex;      /* 如果图标内有多个元素，确保它们不会换行 */
  align-items: center;/* 如果图标是SVG或复杂结构，此项将保持垂直居中 */
}
/* Type-specific class definitions for color */
.notification.success {
  border-left: 4px solid #4CAF50;
}

.notification.warning {
  border-left: 4px solid #FFC107;
}

.notification.error {
  border-left: 4px solid #F44336;
}

.notification.info {
  border-left: 4px solid #2196F3;
}
</style>