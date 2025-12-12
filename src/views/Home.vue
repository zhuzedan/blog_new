<template>
  <div class="home-container">
    <!-- Fixed Navigation Bar -->
    <Navbar />

    <!-- Hero Section - Full Background Image -->
    <section class="hero-section">
      <div class="hero-background">
        <img
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1920&q=80"
          alt="Background"
          class="hero-image"
        />
      </div>

      <!-- Typing Effect Only -->
      <div class="hero-content">
        <div class="typed-wrapper">
          <span ref="typedElement" class="typed-text"></span>
        </div>
      </div>

      <!-- Wave Effect -->
      <WaveEffect />

      <!-- Scroll Down Arrow -->
      <div class="scroll-down" @click="scrollToContent">
        <DownOutlined class="scroll-icon" />
      </div>
    </section>

    <!-- Main Content -->
    <div id="articles" class="main-content">
      <div class="content-wrapper">
        <!-- Left Section: Articles -->
        <div class="articles-section">
          <h2 class="section-title">
            <span class="title-icon">🔥</span>
            最新文章
          </h2>

          <div class="articles-grid">
            <a-card
              v-for="article in paginatedArticles"
              :key="article.id"
              hoverable
              class="article-card"
              @click="goToArticle(article.id)"
            >
              <template #cover>
                <img :src="article.cover" :alt="article.title" class="article-cover" />
              </template>
              <a-card-meta :title="article.title" :description="article.summary"> </a-card-meta>
              <div class="article-meta">
                <a-tag color="blue">{{ article.category }}</a-tag>
                <span class="meta-item"> <EyeOutlined /> {{ article.views }} </span>
                <span class="meta-item"> <CalendarOutlined /> {{ article.date }} </span>
              </div>
            </a-card>
          </div>

          <!-- Pagination -->
          <div class="pagination-wrapper">
            <a-pagination
              v-model:current="currentPage"
              v-model:page-size="pageSize"
              :total="articles.length"
              :show-size-changer="false"
              :show-total="(total) => `共 ${total} 篇文章`"
              @change="onPageChange"
            />
          </div>
        </div>

        <!-- Right Sidebar -->
        <aside class="sidebar">
          <!-- Random Recommendations -->
          <a-card title="🔥 随机推荐" class="sidebar-card">
            <div v-for="article in recommendedArticles" :key="article.id" class="recommend-item">
              <img :src="article.cover" alt="" class="recommend-cover" />
              <div class="recommend-info">
                <h4 class="recommend-title" @click="goToArticle(article.id)">
                  {{ article.title }}
                </h4>
                <a-button type="link" size="small" @click="goToArticle(article.id)"
                  >立刻围观</a-button
                >
              </div>
            </div>
          </a-card>

          <!-- Latest Comments -->
          <a-card title="💬 最新评论" class="sidebar-card">
            <p style="text-align: center; color: #999">暂无评论</p>
          </a-card>

          <!-- Latest Dynamics -->
          <a-card title="📢 最新动态" class="sidebar-card">
            <a-timeline>
              <a-timeline-item v-for="dynamic in dynamics" :key="dynamic.id">
                <p>{{ dynamic.content }}</p>
                <small>{{ dynamic.time }}</small>
              </a-timeline-item>
            </a-timeline>
          </a-card>

          <!-- Author Recommendations -->
          <a-card title="🌟 作者推荐" class="sidebar-card">
            <a-list size="small" :data-source="recommendedArticles">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a @click="goToArticle(item.id)">{{ item.title }}</a>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../store/blog'
import { EyeOutlined, CalendarOutlined, DownOutlined } from '@ant-design/icons-vue'
import Typed from 'typed.js'
import WaveEffect from '../components/WaveEffect.vue'
import Navbar from '../components/Navbar.vue'

const router = useRouter()
const blogStore = useBlogStore()

const typedElement = ref(null)
const currentPage = ref(1)
const pageSize = ref(6)
let typed = null

const articles = computed(() => blogStore.latestArticles)
const authorInfo = computed(() => blogStore.authorInfo)
const recommendedArticles = computed(() => blogStore.recommendedArticles)
const dynamics = computed(() => blogStore.dynamics)

// Paginated articles
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return articles.value.slice(start, end)
})

const goToArticle = (id) => {
  router.push(`/article/${id}`)
}

const onPageChange = (page) => {
  currentPage.value = page
  // Scroll to articles section
  scrollToContent()
}

const scrollToContent = () => {
  const contentElement = document.getElementById('articles')
  if (contentElement) {
    contentElement.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // Initialize Typed.js
  typed = new Typed(typedElement.value, {
    strings: [
      '春风得意马蹄疾，不信人间有别离',
      '再渺小的星光，也有属于他的光芒',
      '代码改变世界，技术驱动未来',
      '保持热爱，奔赴山海'
    ],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  })
})

onUnmounted(() => {
  // Cleanup
  if (typed) {
    typed.destroy()
  }
})
</script>

<style scoped lang="scss">
// Variables - Updated to minimal theme
$primary-color: #0071e3;
$secondary-color: #303030;
$text-dark: #1d1d1f;
$text-light: #86868b;
$bg-light: #f5f5f7;
$white: #ffffff;
$navbar-height: 70px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

.home-container {
  min-height: 100vh;
  background: $bg-light;
}

// Hero Section
.hero-section {
  position: relative;
  height: 60vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.9);
    }
  }

  .hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    text-align: center;
  }

  .typed-wrapper {
    min-height: 60px;
    padding: 2rem 3rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(30px) saturate(150%);
    border-radius: 20px;
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.5) inset;
    border: 1px solid rgba(255, 255, 255, 0.3);
    max-width: 80%;
    margin: 0 auto;

    .typed-text {
      font-size: 1.8rem;
      color: $text-dark;
      font-weight: 600;
      line-height: 1.6;
    }
  }
}

// Scroll Down Arrow
.scroll-down {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  cursor: pointer;
  animation: bounce 2s infinite;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: $transition;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
    animation: none;
    transform: translateX(-50%) scale(1.2);
  }

  .scroll-icon {
    font-size: 1.8rem;
    color: $white;
    transition: $transition;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
}

// Main Content
.main-content {
  background: $white;
  padding: 3rem 0;
  min-height: 50vh;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid $bg-light;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: $primary-color;
  }

  .title-icon {
    font-size: 2.2rem;
  }
}

// Articles Section
.articles-section {
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .article-card {
    border-radius: 20px;
    overflow: hidden;
    transition: $transition;
    cursor: pointer;
    border: none;
    background: $white;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);

    &:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      border-color: transparent;
    }

    .article-cover {
      width: 100%;
      height: 220px;
      object-fit: cover;
      transition: $transition;
      filter: brightness(0.95);
    }

    &:hover .article-cover {
      transform: scale(1.03);
      filter: brightness(1);
    }
  }

  .article-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    font-size: 0.85rem;
    color: $text-light;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    :deep(.ant-pagination) {
      .ant-pagination-item {
        border-radius: 8px;
        border-color: rgba(0, 0, 0, 0.1);
        transition: $transition;

        &:hover {
          border-color: $primary-color;
          transform: translateY(-2px);
        }

        a {
          color: $text-dark;
        }
      }

      .ant-pagination-item-active {
        background: $primary-color;
        border-color: transparent;

        a {
          color: $white;
        }
      }

      .ant-pagination-prev,
      .ant-pagination-next {
        border-radius: 8px;

        &:hover {
          .ant-pagination-item-link {
            color: $primary-color;
            border-color: $primary-color;
          }
        }
      }

      .ant-pagination-total-text {
        color: $text-light;
        font-weight: 500;
      }
    }
  }
}

// Sidebar
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  :deep(.ant-card) {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: $transition;
    background: $white;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      transform: translateY(-3px);
      border-color: transparent;
    }

    .ant-card-head {
      background: rgba(0, 0, 0, 0.02);
      border-bottom: 1px solid $bg-light;

      .ant-card-head-title {
        font-weight: 600;
        color: $text-dark;
      }
    }
  }
}

.sidebar-card {
  .recommend-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 12px;
    transition: $transition;
    background: rgba(0, 0, 0, 0.02);

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      transform: translateX(5px);
      background: rgba(0, 113, 227, 0.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .recommend-cover {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      object-fit: cover;
      transition: $transition;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }
    }

    .recommend-info {
      flex: 1;
    }

    .recommend-title {
      font-size: 0.95rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      cursor: pointer;
      color: $text-dark;
      transition: $transition;
      line-height: 1.4;

      &:hover {
        color: $primary-color;
      }
    }
  }
}

// Animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

// Responsive
@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .sidebar {
    order: -1;
  }

  .hero-card {
    padding: 2rem 2.5rem !important;
    max-width: 90% !important;
  }
}

@media (max-width: 768px) {
  .navbar {
    .navbar-content {
      padding: 0 1rem;
    }

    .nav-menu {
      gap: 1rem;

      .nav-link {
        padding: 0.5rem;
        font-size: 0.9rem;
      }
    }
  }

  .hero-section {
    .hero-card {
      padding: 2rem 1.5rem !important;

      .author-name {
        font-size: 2rem !important;
      }

      .typed-wrapper .typed-text {
        font-size: 1.1rem !important;
      }

      .author-description {
        font-size: 0.9rem !important;
      }
    }
  }

  .articles-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
