<template>
  <div class="moments-container">
    <!-- Fixed Navigation Bar -->
    <Navbar />

    <div class="moments-content">
      <a-card class="moments-card">
        <h2>💭 我的说说</h2>
        <p style="text-align: center; color: #999; padding: 3rem 0">
          这里是说说页面，分享生活中的点点滴滴...
        </p>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<style scoped lang="scss">
.moments-container {
  min-height: 100vh;
  background: #f5f7fa;
  padding-top: 70px; // Navbar height
}

.moments-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.moments-card {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
</style>
