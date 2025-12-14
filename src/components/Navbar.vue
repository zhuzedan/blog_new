<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-content">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <img src="../assets/logo.svg" alt="Zella" class="logo-img" />
          <span class="logo-text">Zella</span>
        </router-link>
      </div>
      <ul class="nav-menu">
        <li>
          <router-link to="/" class="nav-link" active-class="active">首页</router-link>
        </li>
        <li>
          <router-link to="/moments" class="nav-link" active-class="active">说说</router-link>
        </li>
        <li>
          <router-link to="/about" class="nav-link" active-class="active">关于</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Determine if scrolled
  isScrolled.value = scrollTop > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
@use '../styles/variables.scss' as *;
$navbar-height: 50px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $navbar-height;
  // 极简设计 - 默认状态为透明
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-bottom: none;
  box-shadow: none;
  z-index: 1000;
  transition: all 0.3s ease;

  // 滚动时显示纯色背景
  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .navbar-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    .logo-link {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
    }

    .logo-img {
      width: 30px;
      height: 30px;
      display: block;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: $text-dark;
      letter-spacing: -0.5px;
      transition: $transition;
      text-decoration: none;
    }

    .logo-link:hover {
      .logo-text {
        color: $primary-color;
        opacity: 0.85;
      }

      .logo-img {
        transform: translateY(-0.5px);
        transition: $transition;
      }
    }
  }

  .nav-menu {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;

    .nav-link {
      color: $text-light;
      font-size: 0.95rem;
      font-weight: 500;
      padding: 0.5rem 0;
      transition: $transition;
      background: transparent;
      text-decoration: none;
      display: inline-block;
      position: relative;

      // 悬停效果 - 简单的颜色变化和透明度
      &:hover {
        color: $primary-color;
        opacity: 0.8;
      }

      // 激活状态
      &.active {
        color: $primary-color;
        font-weight: 600;
      }
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .navbar {
    .navbar-content {
      padding: 0 1rem;
    }

    .logo .logo-text {
      font-size: 1.3rem;
    }

    .nav-menu {
      gap: 1rem;

      .nav-link {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
