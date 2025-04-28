<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

// State
const isMobile = ref(false);
const currentSlide = ref(0);

// Data
const accessories = ref([
  {
    title: 'Москитные сетки',
    image: '/assets/img/mosquito_nets.png'
  },
  {
    title: 'Замки на окна',
    image: '/assets/img/window_locks.png'
  },
  {
    title: 'Отливы и козырьки',
    image: '/assets/img/window_sills.png'
  },
  {
    title: 'Дверные и оконные петли',
    image: '/assets/img/door_hinges.png'
  },
  {
    title: 'Оконные откосы',
    image: '/assets/img/window_slopes.png'
  },
  {
    title: 'Подоконники и накладки',
    image: '/assets/img/window_sills_covers.png'
  }
]);

// Methods
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0
      ? accessories.value.length - 1
      : currentSlide.value - 1;
};

const nextSlide = () => {
  currentSlide.value = currentSlide.value === accessories.value.length - 1
      ? 0
      : currentSlide.value + 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

// Lifecycle hooks
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div class="accessories-container">
    <h2 class="accessories-title">Аксессуары</h2>

    <!-- Desktop Version -->
    <div class="accessories-desktop" v-if="!isMobile">
      <div class="accessories-grid">
        <div v-for="(accessory, index) in accessories" :key="index" class="accessory-item">
          <div class="accessory-image">
            <img :src="accessory.image" :alt="accessory.title">
          </div>
          <div class="accessory-title">{{ accessory.title }}</div>
        </div>
      </div>
    </div>

    <!-- Mobile Version with Slider -->
    <div class="accessories-mobile" v-else>
      <div class="slider-container">
        <button class="nav-button prev" @click="prevSlide">
          <span>&lt;</span>
        </button>

        <div class="slider-content">
          <transition-group name="slide">
            <div v-for="(accessory, index) in accessories"
                 :key="index"
                 v-show="currentSlide === index"
                 class="accessory-slide">
              <div class="accessory-image">
                <img :src="accessory.image" :alt="accessory.title">
              </div>
              <div class="accessory-title">
                <a href="#">{{ accessory.title }}</a>
              </div>
            </div>
          </transition-group>
        </div>

        <button class="nav-button next" @click="nextSlide">
          <span>&gt;</span>
        </button>
      </div>

      <!-- Dots navigation -->
      <div class="slider-dots">
        <span v-for="(accessory, index) in accessories"
              :key="index"
              :class="{ 'active': currentSlide === index }"
              class="dot"
              @click="goToSlide(index)"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accessories-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.accessories-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
}

/* Desktop Styles */
.accessories-grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.accessory-item {
  width: 16%;
  text-align: center;
  margin-bottom: 20px;
}

.accessory-image {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.accessory-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.accessory-title {
  font-size: 14px;
  color: #0056b3;
  text-align: center;
}

/* Mobile Styles */
.accessories-mobile {
  position: relative;
}

.slider-container {
  display: flex;
  align-items: center;
  position: relative;
  height: 200px;
}

.slider-content {
  flex: 1;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.accessory-slide {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav-button {
  width: 40px;
  height: 40px;
  border: none;
  background-color: #003399;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
}

.nav-button.prev {
  margin-right: 10px;
}

.nav-button.next {
  margin-left: 10px;
}

.slider-dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dot {
  width: 30px;
  height: 4px;
  background-color: #ccc;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background-color: #0056b3;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>