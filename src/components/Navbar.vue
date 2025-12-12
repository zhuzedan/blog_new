<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, hidden: isHidden }">
    <div class="navbar-content">
      <div class="logo">
        <router-link to="/" class="logo-text">Zella</router-link>
      </div>
      <ul class="nav-menu">
        <li>
          <router-link to="/" class="nav-link" active-class="active">首页</router-link>
        </li>
        <li>
          <router-link to="/moments" class="nav-link" active-class="active">说说</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isHidden = ref(false)
let lastScrollTop = 0

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Determine if scrolled
  isScrolled.value = scrollTop > 10

  // More sensitive scroll detection for showing/hiding
  if (scrollTop > lastScrollTop && scrollTop > 10) {
    // Scrolling down - hide navbar
    isHidden.value = true
  } else if (scrollTop < lastScrollTop || scrollTop <= 10) {
    // Scrolling up or at top - show navbar
    isHidden.value = false
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
$primary-color: #0071e3;
$text-dark: #1d1d1f;
$text-light: #86868b;
$white: #ffffff;
$navbar-height: 60px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $navbar-height;
  // Poetize.cn style - clean and minimal
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  &.hidden {
    transform: translateY(-100%);
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
    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: $text-dark;
      letter-spacing: -0.5px;
      transition: $transition;
      text-decoration: none;

      &:hover {
        color: $primary-color;
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
      font-size: 1rem;
      font-weight: 500;
      padding: 0.5rem 0;
      transition: $transition;
      background: transparent;
      text-decoration: none;
      display: inline-block;
      position: relative;

      &:hover {
        color: $primary-color;
      }

      &.active {
        color: $primary-color;

        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: $primary-color;
          border-radius: 1px;
        }
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
