<template>
  <div class="particles">
    <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
  </div>
</template>

<script setup>
const getParticleStyle = (index) => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomSize = Math.random() * 3 + 1
  const randomDuration = Math.random() * 10 + 10
  const randomDelay = Math.random() * 5

  return {
    left: `${randomX}%`,
    top: `${randomY}%`,
    width: `${randomSize}px`,
    height: `${randomSize}px`,
    animationDuration: `${randomDuration}s`,
    animationDelay: `${randomDelay}s`
  }
}
</script>

<style scoped lang="scss">
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: float-particle 20s infinite ease-in-out;
  opacity: 0;
}

@keyframes float-particle {
  0%,
  100% {
    opacity: 0;
    transform: translateY(0) translateX(0);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(50px);
  }
}
</style>
