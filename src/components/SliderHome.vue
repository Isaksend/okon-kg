<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Данные слайдов
const slides = [
  {
    title: 'РЕМОНТ ОКОН',
    subtitle: 'В КЫРГЫЗСТАНЕ',
    description: 'Мы предлагаем профессиональный ремонт оконных конструкций любого типа с предоставлением официальной гарантии на выполненные работы!',
    buttonText: 'Заказать звонок',
    image: '/assets/img/window_repair_1.webp'
  },
  {
    title: 'КАЧЕСТВЕННЫЕ МАТЕРИАЛЫ',
    subtitle: 'ГАРАНТИЯ КАЧЕСТВА',
    description: 'Используем только проверенные материалы и комплектующие для ремонта окон с гарантией долговечности!',
    buttonText: 'Узнать больше',
    image: '/assets/img/window_repair_2.webp'
  },
  {
    title: 'ОПЫТНЫЕ МАСТЕРА',
    subtitle: 'ПРОФЕССИОНАЛЬНЫЙ ПОДХОД',
    description: 'Наши специалисты имеют многолетний опыт в сфере ремонта и обслуживания оконных систем!',
    buttonText: 'Вызвать мастера',
    image: '/assets/img/window_repair_3.webp'
  },
];

// State
const activeIndex = ref(0);
let autoSlideTimer = null;

// Methods
const setActiveSlide = (index) => {
  activeIndex.value = index;
};

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % slides.length;
};

const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length;
};

const startAutoSlide = () => {
  autoSlideTimer = setInterval(nextSlide, 5000);
};

const stopAutoSlide = () => {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
};

onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  stopAutoSlide();
});
</script>

<template>
  <div class="slider" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
    <div class="slider-container">
      <!-- Content section with all slides -->
      <div class="content-section">
        <div
            v-for="(slide, index) in slides"
            :key="index"
            :class="['content-slide', { active: activeIndex === index }]"
        >
          <h1 class="title">{{ slide.title }}</h1>
          <div class="subtitle">{{ slide.subtitle }}</div>
          <p class="description">{{ slide.description }}</p>
          <router-link to="/contact" class="action-button">{{ slide.buttonText }}</router-link>
        </div>
      </div>

      <!-- Image section with all slides -->
      <div class="image-section">
        <div
            v-for="(slide, index) in slides"
            :key="index"
            :class="['image-slide', { active: activeIndex === index }]"
            :style="{ backgroundImage: `url(${slide.image})` }"
        ></div>
      </div>

      <!-- Navigation controls -->
      <div class="navigation">
        <button @click="prevSlide" class="nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" fill="none" stroke="currentColor" stroke-width="2"></polyline>
          </svg>
        </button>

        <div class="indicators">
          <button
              v-for="(_, index) in slides"
              :key="index"
              @click="setActiveSlide(index)"
              :class="['indicator', { active: activeIndex === index }]"
          ></button>
        </div>

        <button @click="nextSlide" class="nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" fill="none" stroke="currentColor" stroke-width="2"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  height: 800px;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 90%;
  height: 80%;
  max-height: 650px;
  margin: 0 auto;
  display: flex;
}

/* Content Section */
.content-section {
  position: relative;
  width: 35%;
  background: white;
  z-index: 3;
}

.content-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.content-slide.active {
  opacity: 1;
  transform: translateX(0);
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: white;
  background: #2a9d8f;
  padding: 0.5rem 1rem;
  display: inline-block;
  text-align: center;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
}

.action-button {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #333;
  border: 1px solid #ddd;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease;
  width: fit-content;
}

.action-button:hover {
  background: #f0f0f0;
}

/* Image Section */
.image-section {
  position: absolute;
  right: 0;
  top: 0;
  width: 65%;
  height: 100%;
  z-index: 1;
}

.image-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.image-slide.active {
  opacity: 1;
}

/* Navigation */
.navigation {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-btn {
  width: 2rem;
  height: 2rem;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.nav-btn:hover {
  background: #2a9d8f;
  color: white;
}

.indicators {
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 2rem;
  height: 3px;
  background: rgba(255,255,255,0.5);
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.indicator.active {
  background: #2a9d8f;
}

@media (max-width: 768px) {
  .slider {
    height: auto;
  }

  .slider-container {
    flex-direction: column;
    height: auto;
  }

  .content-section {
    width: 100%;
    height: auto;
  }

  .content-slide {
    position: relative;
    transform: none;
    opacity: 1;
  }

  .content-slide:not(.active) {
    display: none;
  }

  .image-section {
    position: relative;
    width: 100%;
    height: 300px;
  }

  .navigation {
    position: static;
    margin-top: 1rem;
    justify-content: center;
  }

  .action-button {
    margin: 0 auto;
  }
}

@media (max-width: 501px) {
  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }
}
</style>