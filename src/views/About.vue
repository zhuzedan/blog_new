<template>
  <div class="about-container">
    <!-- Fixed Navigation Bar -->
    <Navbar />

    <div class="about-content">
      <a-card class="about-card">
        <div class="profile-section">
          <img :src="authorInfo.avatar" alt="Author" class="profile-avatar" />
          <h2 class="profile-name">{{ authorInfo.name }}</h2>
          <p class="profile-motto">{{ authorInfo.motto }}</p>
        </div>

        <a-divider />

        <div class="intro-section">
          <h3>📖 个人简介</h3>
          <p class="intro-text">{{ authorInfo.intro }}</p>
        </div>

        <a-divider />

        <div class="skills-section">
          <h3>💻 技术栈</h3>
          <div class="skills-grid">
            <a-tag color="blue" style="margin: 0.5rem">Vue.js</a-tag>
            <a-tag color="green" style="margin: 0.5rem">React</a-tag>
            <a-tag color="orange" style="margin: 0.5rem">Node.js</a-tag>
            <a-tag color="red" style="margin: 0.5rem">Spring Boot</a-tag>
            <a-tag color="purple" style="margin: 0.5rem">TypeScript</a-tag>
            <a-tag color="cyan" style="margin: 0.5rem">MySQL</a-tag>
            <a-tag color="geekblue" style="margin: 0.5rem">Docker</a-tag>
            <a-tag color="magenta" style="margin: 0.5rem">Git</a-tag>
          </div>
        </div>

        <a-divider />

        <div class="contact-section">
          <h3>📧 联系方式</h3>
          <a-space direction="vertical" size="middle" style="width: 100%">
            <div class="contact-item">
              <MailOutlined class="contact-icon" />
              <span>Email: example@example.com</span>
            </div>
            <div class="contact-item">
              <GithubOutlined class="contact-icon" />
              <span>GitHub: github.com/username</span>
            </div>
            <div class="contact-item">
              <WechatOutlined class="contact-icon" />
              <span>微信: your_wechat_id</span>
            </div>
          </a-space>
        </div>

        <a-divider />

        <div class="stats-section">
          <h3>📊 站点统计</h3>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-statistic title="文章总数" :value="stats.articles" />
            </a-col>
            <a-col :span="8">
              <a-statistic title="访问量" :value="stats.views" />
            </a-col>
            <a-col :span="8">
              <a-statistic title="运行天数" :value="stats.days" suffix="天" />
            </a-col>
          </a-row>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBlogStore } from '../store/blog'
import { MailOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons-vue'
import Navbar from '../components/Navbar.vue'

const blogStore = useBlogStore()
const authorInfo = computed(() => blogStore.authorInfo)

const stats = {
  articles: 127,
  views: 88888,
  days: 2840
}
</script>

<style scoped lang="scss">
.about-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-top: 70px; // Navbar height
}

.about-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.about-card {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.profile-section {
  text-align: center;
  padding: 2rem 0;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #667eea;
  margin-bottom: 1.5rem;
}

.profile-name {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.profile-motto {
  font-size: 1.1rem;
  color: #666;
  font-style: italic;
}

.intro-section,
.skills-section,
.contact-section,
.stats-section {
  padding: 1rem 0;
}

.intro-section h3,
.skills-section h3,
.contact-section h3,
.stats-section h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
}

.intro-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #666;
  text-align: justify;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: #666;
}

.contact-icon {
  font-size: 1.5rem;
  color: #667eea;
}

@media (max-width: 768px) {
  .profile-avatar {
    width: 120px;
    height: 120px;
  }

  .profile-name {
    font-size: 1.5rem;
  }
}
</style>
