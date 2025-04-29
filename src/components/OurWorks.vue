<template>
  <div class="our-works-container">
    <h2 class="our-works-title">Наши работы</h2>

    <div class="works-slider">
      <div class="slider-container">
        <!-- Desktop View - Multiple Items -->
        <div v-if="!isMobile" class="desktop-slider">
          <div class="slider-wrapper" :style="{ transform: `translateX(-${currentSlide * 100 / visibleItems}%)` }">
            <div v-for="(work, index) in works"
                 :key="index"
                 class="work-item">
              <img :src="work.image" :alt="work.title" class="work-image">
            </div>
          </div>
        </div>

        <!-- Mobile View - Single Item -->
        <div v-else class="mobile-slider">
          <div class="mobile-slider-container">
            <transition-group name="fade" tag="div" class="mobile-transition-container">
              <div v-for="(work, index) in works"
                   :key="index"
                   v-show="currentSlide === index"
                   class="work-item">
                <img :src="work.image" :alt="work.title" class="work-image">
                <img :src="work.image" :alt="work.title" class="work-image">
              </div>
            </transition-group>
          </div>
        </div>
      </div>

      <div class="slider-navigation">
        <div class="nav-btn-block">
          <button class="nav-button prev" @click="prevSlide">
            <span>&lt;</span>
          </button>
          <button class="nav-button next" @click="nextSlide">
            <span>&gt;</span>
          </button>
        </div>
        <div class="slider-dots">
          <span v-for="(work, index) in works"
                :key="index"
                @click="goToSlide(index)"
                :class="{ 'active': isMobile ? currentSlide === index : index >= currentSlide && index < currentSlide + visibleItems }"
                class="dot"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

// State
const isMobile = ref(false);
const currentSlide = ref(0);
const visibleItems = ref(3); // Number of items visible in desktop view

// Data
const works = ref([
  {
    title: 'Деревянные окна до и после ремонта',
    image: '/assets/img/ourworks_item_1.png'
  },
  {
    title: 'Пластиковые окна до и после установки',
    image: '/assets/img/ourworks_item_2.png'
  },
  {
    title: 'Алюминиевые окна до и после замены',
    image: '/assets/img/ourworks_item_3.png'
  },
  {
    title: 'Остекление балкона до и после',
    image: '/assets/img/ourworks_item_4.png'
  },
  {
    title: 'Замена стеклопакета до и после',
    image: '/assets/img/ourworks_item_5.png'
  }
]);

// Methods
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;

  // Adjust number of visible items based on screen width
  if (window.innerWidth > 1200) {
    visibleItems.value = 3;
  } else if (window.innerWidth > 992) {
    visibleItems.value = 2;
  } else {
    visibleItems.value = 1;
  }
};

const prevSlide = () => {
  if (isMobile.value) {
    currentSlide.value = currentSlide.value === 0
        ? works.value.length - 1
        : currentSlide.value - 1;
  } else {
    const maxSlide = Math.max(0, works.value.length - visibleItems.value);
    currentSlide.value = currentSlide.value === 0
        ? maxSlide
        : currentSlide.value - 1;
  }
};

const nextSlide = () => {
  if (isMobile.value) {
    currentSlide.value = currentSlide.value === works.value.length - 1
        ? 0
        : currentSlide.value + 1;
  } else {
    const maxSlide = Math.max(0, works.value.length - visibleItems.value);
    currentSlide.value = currentSlide.value >= maxSlide
        ? 0
        : currentSlide.value + 1;
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

// Auto-slide functionality
let slideInterval = null;

const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
};

const stopAutoSlide = () => {
  clearInterval(slideInterval);
};

// Lifecycle hooks
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  startAutoSlide();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
  stopAutoSlide();
});
</script>

<style scoped>
.our-works-container {
  width: 100%;
  background-color: #2a8a8a;
  padding: 40px 0;
  color: white;
}

.our-works-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
  font-weight: bold;
}

.works-slider {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.slider-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.desktop-slider {
  overflow: hidden;
  width: 100%;
}

.slider-wrapper {
  display: flex;
  transition: transform 0.5s ease;
}

.work-item {
  width: calc(100% / 3 - 20px);
  height: auto;
  flex-shrink: 0;
  margin: 0 10px;
  position: relative;
  aspect-ratio: 627 / 418;
}

.mobile-slider-container {
  position: relative;
  height: 418px; /* Fixed height to prevent jumping */
  overflow: hidden;
}

.mobile-transition-container {
  position: relative;
  height: 100%;
}

.mobile-slider .work-item {
  width: 100%;
  max-width: 627px;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.work-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.before-after-labels {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.before-label, .after-label {
  background-color: white;
  color: black;
  font-weight: bold;
  padding: 5px 20px;
  font-size: 20px;
}

.slider-navigation {
  display: flex;
  justify-content: left;
  flex-direction: column;
  margin: 30px 10px;
  gap: 20px;
}

.nav-btn-block{
  display: flex;
  gap: 20px;
}


.nav-button {
  width: 50px;
  height: 50px;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.nav-button.next {
  background-color: white;
  color: #003399;
}

.slider-dots {
  display: flex;
  justify-content: left;
  align-items: center;
}

.dot {
  width: 30px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 5px;
  display: inline-block;
}

.dot.active {
  background-color: #003399;
}

.call-button-container {
  text-align: center;
  margin-top: 30px;
}

.call-button {
  background-color: white;
  color: #003399;
  border: none;
  padding: 12px 30px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

@media (max-width: 767px) {
  .work-item {
    width: 100%;
    height: 100%;
    max-width: 627px;
  }

  .works-slider {
    width: 100%;
    padding: 0;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }

  .mobile-slider-container {
    height: 280px; /* Adjust height for mobile */
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  .work-item {
    width: calc(50% - 20px);
    height: auto;
    aspect-ratio: 627 / 418;
  }
}
</style>