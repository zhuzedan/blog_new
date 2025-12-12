<template>
  <div class="article-container">
    <!-- Fixed Navigation Bar -->
    <Navbar />

    <div v-if="article" class="article-wrapper">
      <div class="article-content">
        <a-card class="content-card">
          <img :src="article.cover" alt="" class="article-banner" />

          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-meta">
            <span><CalendarOutlined /> {{ article.date }}</span>
            <a-divider type="vertical" />
            <span><EyeOutlined /> {{ article.views }}</span>
            <a-divider type="vertical" />
            <a-tag color="blue">{{ article.category }}</a-tag>
          </div>

          <a-divider />

          <div class="article-body markdown-body" v-html="renderedContent"></div>

          <a-divider />

          <div class="article-footer">
            <a-space>
              <a-button type="primary" @click="likeArticle"> <LikeOutlined /> 点赞 </a-button>
              <a-button> <StarOutlined /> 收藏 </a-button>
              <a-button> <ShareAltOutlined /> 分享 </a-button>
            </a-space>
          </div>
        </a-card>

        <!-- Comments Section -->
        <a-card title="💬 评论区" class="comments-card">
          <a-comment>
            <template #avatar>
              <a-avatar :src="authorInfo.avatar" />
            </template>
            <template #content>
              <a-textarea v-model:value="commentText" placeholder="说点什么..." :rows="4" />
              <a-button type="primary" style="margin-top: 1rem" @click="submitComment">
                发表评论
              </a-button>
            </template>
          </a-comment>

          <div v-if="comments.length === 0" class="no-comments">
            <p>暂无评论，快来抢沙发吧！</p>
          </div>
        </a-card>
      </div>

      <!-- Sidebar -->
      <aside class="article-sidebar">
        <a-card class="toc-card">
          <template #title> 📑 文章目录 </template>
          <div class="toc-content">
            <div v-if="tocItems.length > 0">
              <div
                v-for="item in tocItems"
                :key="item.id"
                :class="['toc-item', `toc-level-${item.level}`]"
                @click="scrollToHeading(item.id)"
              >
                {{ item.text }}
              </div>
            </div>
            <div v-else class="no-toc">暂无目录</div>
          </div>
        </a-card>

        <a-card title="🔥 相关推荐" class="related-card">
          <div
            v-for="rec in relatedArticles"
            :key="rec.id"
            class="related-item"
            @click="goToArticle(rec.id)"
          >
            <img :src="rec.cover" alt="" class="related-cover" />
            <h4 class="related-title">{{ rec.title }}</h4>
          </div>
        </a-card>
      </aside>
    </div>

    <div v-else class="not-found">
      <a-result status="404" title="文章不存在" sub-title="抱歉，您访问的文章不存在或已被删除">
        <template #extra>
          <a-button type="primary" @click="$router.push('/')"> 返回首页 </a-button>
        </template>
      </a-result>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '../store/blog'
import { message } from 'ant-design-vue'
import {
  CalendarOutlined,
  EyeOutlined,
  LikeOutlined,
  StarOutlined,
  ShareAltOutlined
} from '@ant-design/icons-vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'
import Navbar from '../components/Navbar.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const commentText = ref('')
const comments = ref([])
const tocItems = ref([])

const article = computed(() => blogStore.getArticleById(route.params.id))
const authorInfo = computed(() => blogStore.authorInfo)
const relatedArticles = computed(() =>
  blogStore.recommendedArticles.filter((a) => a.id !== parseInt(route.params.id)).slice(0, 3)
)

// Initialize Markdown
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, { language: lang }).value
        return (
          '<pre class="hljs"><code>' +
          (lang ? '<div class="code-lang" onclick="copyCode(this)">' + lang + '</div>' : '') +
          highlighted +
          '</code></pre>'
        )
      } catch (err) {
        // 忽略高亮错误，继续处理
        console.warn('代码高亮错误:', err)
      }
    }
    const escaped = md.utils.escapeHtml(str)
    return (
      '<pre class="hljs"><code>' +
      (lang ? '<div class="code-lang" onclick="copyCode(this)">' + lang + '</div>' : '') +
      escaped +
      '</code></pre>'
    )
  }
})

const renderedContent = computed(() => {
  if (!article.value) return ''
  let html = md.render(article.value.content)

  // Add IDs to headings for TOC navigation
  let headingIndex = 0
  html = html.replace(/<h([1-3])>(.*?)<\/h[1-3]>/g, (match, level, text) => {
    const id = `heading-${headingIndex++}`
    return `<h${level} id="${id}">${text}</h${level}>`
  })

  return html
})

// Generate TOC from markdown content
const generateTOC = () => {
  if (!article.value) return
  const content = article.value.content
  const headings = content.match(/^#{1,3}\s+.+$/gm) || []

  tocItems.value = headings.map((heading, index) => {
    const level = heading.match(/^#+/)[0].length
    const text = heading.replace(/^#+\s+/, '')
    const id = `heading-${index}`
    return { level, text, id }
  })
}

const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Handle scroll events for smoother sticky behavior
let ticking = false
const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Throttle scroll events for better performance
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  generateTOC()
  // Scroll to top when opening article
  window.scrollTo({ top: 0, behavior: 'instant' })

  // Add scroll event listener for smoother behavior
  window.addEventListener('scroll', handleScroll, { passive: true })

  // Add copy function to window for onclick handler
  window.copyCode = (langElement) => {
    // Get the parent pre element
    const preElement = langElement.closest('pre')
    const codeElement = preElement.querySelector('code')
    const codeText = codeElement.textContent

    navigator.clipboard
      .writeText(codeText)
      .then(() => {
        message.success('代码已复制到剪贴板')
        // Change button text temporarily
        const originalText = langElement.textContent
        langElement.textContent = '已复制'
        setTimeout(() => {
          langElement.textContent = originalText
        }, 2000)
      })
      .catch((err) => {
        message.error('复制失败: ' + err)
      })
  }
})

onUnmounted(() => {
  // Clean up scroll event listener
  window.removeEventListener('scroll', handleScroll)
})

const likeArticle = () => {
  message.success('点赞成功！')
}

const submitComment = () => {
  if (!commentText.value.trim()) {
    message.warning('请输入评论内容')
    return
  }
  message.success('评论发表成功！')
  commentText.value = ''
}

const goToArticle = (id) => {
  router.push(`/article/${id}`)
}
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

.article-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-top: 70px; // Navbar height
}

.article-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.content-card,
.comments-card {
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  border: none;
  transition: $transition;

  &:hover {
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
}

.article-banner {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.article-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: $text-dark;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  letter-spacing: -0.5px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.article-body {
  font-size: 1.1rem;
  line-height: 2;
  color: #333;
  margin: 2rem 0;
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;

  &.markdown-body {
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-weight: 700;
      line-height: 1.4;
      color: #333;
      scroll-margin-top: 100px;
    }

    :deep(h1) {
      font-size: 2.5rem;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 0.5rem;
    }

    :deep(h2) {
      font-size: 2rem;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 0.5rem;
    }

    :deep(h3) {
      font-size: 1.6rem;
    }

    :deep(p) {
      margin: 1.2rem 0;
      line-height: 1.8;
    }

    :deep(ul),
    :deep(ol) {
      margin: 1rem 0;
      padding-left: 2rem;
    }

    :deep(li) {
      margin: 0.5rem 0;
      line-height: 1.8;
    }

    :deep(code) {
      background: #f6f8fa;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      color: #e83e8c;
    }

    :deep(pre) {
      background: #f6f8fa;
      border: 1px solid #e1e4e8;
      border-radius: 8px;
      padding: 1.5rem;
      overflow-x: auto;
      margin: 1.5rem 0;
      position: relative;

      .code-lang {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.2rem 0.5rem;
        background: rgba(0, 113, 227, 0.1);
        color: #0071e3;
        font-size: 0.8rem;
        border-bottom-left-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: rgba(0, 113, 227, 0.2);
          transform: translateY(-1px);
        }
      }

      code {
        background: none;
        color: #24292e;
        padding: 0;
        font-size: 0.95rem;
        line-height: 1.6;
        font-family: 'Consolas', 'Courier New', monospace;
      }
    }

    :deep(blockquote) {
      border-left: 4px solid #0071e3;
      background: rgba(0, 113, 227, 0.05);
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      color: #666;
      border-radius: 4px;

      p {
        margin: 0.5rem 0;
      }
    }

    :deep(a) {
      color: #0071e3;
      text-decoration: none;
      transition: all 0.3s;

      &:hover {
        color: #005bbd;
        text-decoration: underline;
      }
    }

    :deep(img) {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1.5rem 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    :deep(table) {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;

      th,
      td {
        border: 1px solid #ddd;
        padding: 0.75rem;
        text-align: left;
      }

      th {
        background: rgba(0, 113, 227, 0.05);
        font-weight: 600;
      }

      tr:hover {
        background: #f9f9f9;
      }
    }
  }
}

.article-body :deep(h2) {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #333;
}

.article-body :deep(p) {
  margin: 1rem 0;
}

.article-body :deep(ul) {
  margin-left: 2rem;
}

.article-body :deep(li) {
  list-style: disc;
  margin: 0.5rem 0;
}

.article-footer {
  text-align: center;
  padding: 1rem 0;
}

.no-comments {
  text-align: center;
  padding: 2rem;
  color: #999;
}

.article-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; // Add small gap between sidebar components
}

.sidebar-unified {
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
}

.toc-card {
  border-radius: 12px;
  position: sticky;
  top: 90px; // Fixed position below navbar (70px navbar + 20px margin)
  max-height: 40vh;
  overflow-y: auto;
  align-self: flex-start;
  width: 100%;
  margin-bottom: 0;
  box-shadow: none;
  border: none;
  // Add smooth transition to reduce jumping effect
  transition: top 0.1s ease-out;
}

.related-card {
  border-radius: 12px;
  width: 100%;
  position: sticky;
  // Calculate position based on TOC card position and height
  top: calc(90px + 40vh + 0.5rem); // Position below TOC card (90px + TOC height + gap)
  box-shadow: none;
  border: none;
  // Add smooth transition to reduce jumping effect
  transition: top 0.1s ease-out;
}

.toc-content {
  .toc-item {
    padding: 0.5rem 0;
    cursor: pointer;
    transition: all 0.3s;
    color: #666;
    border-left: 3px solid transparent;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;

    &:hover {
      color: #0071e3;
      background: rgba(0, 113, 227, 0.05);
      border-left-color: #0071e3;
      transform: translateX(5px);
    }

    &.toc-level-1 {
      font-weight: 600;
      font-size: 1rem;
      padding-left: 1rem;
    }

    &.toc-level-2 {
      font-size: 0.95rem;
      padding-left: 1.5rem;
    }

    &.toc-level-3 {
      font-size: 0.9rem;
      padding-left: 2rem;
      color: #999;
    }
  }

  .no-toc {
    padding: 1rem;
    text-align: center;
    color: #999;
    font-style: italic;
  }
}

.related-item {
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.related-item:hover {
  transform: translateX(5px);
}

.related-cover {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.related-title {
  font-size: 0.9rem;
  color: #333;
  margin: 0;
}

.not-found {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  margin-top: 2rem;
}

@media (max-width: 1024px) {
  .article-wrapper {
    grid-template-columns: 1fr;
  }

  .article-sidebar {
    order: -1;
  }
}
</style>
