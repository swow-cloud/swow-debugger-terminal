<template>
  <transition name="fade">
    <div class="notification" :class="type" v-show="show">
      <strong class="notification-title">{{ title }}</strong>
      <button class="notification-close" @click="closeNotification">&times;</button>
      <div class="notification-message">{{ message }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Notification'
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
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.notification {
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px; /* max width changed to a fixed value for better control */
  word-wrap: break-word;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: white;
  overflow: hidden;
}

.notification .notification-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.notification .notification-message {
  margin-bottom: 5px;
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

/* ... Expand with more types if needed ... */
</style>