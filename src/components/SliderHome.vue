<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// State
const currentIndex = ref(0);
const autoSlideInterval = ref(null);

// Slide data
const slides = ref([
  {
    title: 'РЕМОНТ ОКОН',
    subtitle: 'В КЫРГЫЗСТАНЕ',
    description: 'Мы предлагаем профессиональный ремонт оконных конструкций любого типа с предоставлением официальной гарантии на выполненные работы!',
    buttonText: 'Заказать звонок',
    image: '/assets/img/window_repair_1.png'
  },
  {
    title: 'КАЧЕСТВЕННЫЕ МАТЕРИАЛЫ',
    subtitle: 'ГАРАНТИЯ КАЧЕСТВА',
    description: 'Используем только проверенные материалы и комплектующие для ремонта окон с гарантией долговечности!',
    buttonText: 'Узнать больше',
    image: '/assets/img/window_repair_2.png'
  },
  {
    title: 'ОПЫТНЫЕ МАСТЕРА',
    subtitle: 'ПРОФЕССИОНАЛЬНЫЙ ПОДХОД',
    description: 'Наши специалисты имеют многолетний опыт в сфере ремонта и обслуживания оконных систем!',
    buttonText: 'Вызвать мастера',
    image: '/assets/img/window_repair_3.png'
  },
  {
    title: 'ДОСТУПНЫЕ ЦЕНЫ',
    subtitle: 'ВЫГОДНЫЕ УСЛОВИЯ',
    description: 'Предлагаем конкурентные цены на все виды работ по ремонту окон с возможностью индивидуальных скидок!',
    buttonText: 'Узнать стоимость',
    image: '/assets/img/window_repair_4.png'
  },
  {
    title: 'РЕМОНТ ОКОН',
    subtitle: 'В КЫРГЫЗСТАНЕ',
    description: 'Мы предлагаем профессиональный ремонт оконных конструкций любого типа с предоставлением официальной гарантии на выполненные работы!',
    buttonText: 'Заказать звонок',
    image: '/assets/img/window_repair_5.png'
  }
]);

// Methods
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const startAutoSlide = () => {
  autoSlideInterval.value = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval.value);
};

// Lifecycle hooks
onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  stopAutoSlide();
});
</script>

<template>
  <div class="slider-background">
    <div class="slider-container">
      <!-- Left content section -->
      <div class="content-section">
        <h1 class="title">{{ slides[currentIndex].title }}</h1>
        <div class="subtitle">{{ slides[currentIndex].subtitle }}</div>
        <p class="description">{{ slides[currentIndex].description }}</p>
        <button class="action-button">{{ slides[currentIndex].buttonText }}</button>
      </div>

      <!-- Right image section -->
      <div class="image-section">
        <transition name="fade" mode="out-in">
          <img
              :key="currentIndex"
              :src="slides[currentIndex].image"
              :alt="slides[currentIndex].title"
              class="slider-image"
          >
        </transition>
      </div>

      <!-- Navigation controls -->
      <div class="navigation-area">
        <!-- Navigation buttons -->
        <div class="nav-buttons">
          <button @click="prevSlide" class="nav-button prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button @click="nextSlide" class="nav-button next">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <!-- Indicators -->
        <div class="indicators">
          <div
              v-for="(slide, index) in slides"
              :key="index"
              :class="['indicator', { active: currentIndex === index }]"
              @click="goToSlide(index)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider-background {
  width: 100%;
  max-width: 100%;
  background: url("/assets/background/background_slider.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 800px;
  max-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-container {
  display: flex;
  position: relative;
  width: 90%;
  height: 80%;
  max-height: 650px;
  overflow: hidden;
}

.content-section {
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background-color: white;
  z-index: 2;
  position: relative;
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
  background-color: #2a9d8f;
  padding: 0.5rem 1rem;
  display: inline-block;
  text-align: center;
}

.description {
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #555;
  max-width: 90%;
}

.action-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
}

.action-button:hover {
  background-color: #f0f0f0;
}

.image-section {
  position: absolute;
  right: 0;
  top: 0;
  width: 65%;
  height: 100%;
  z-index: 1;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.navigation-area {
  position: absolute;
  left: 2rem;
  bottom: 3rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.nav-buttons {
  display: flex;
  gap: 0.5rem;
}

.nav-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: #ffffff;
  color: #333;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #2a9d8f;
  color: white;
}

.indicators {
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 2rem;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: #2a9d8f;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .slider-container {
    flex-direction: column;
    height: auto;
    padding-bottom: 5rem;
  }

  .content-section {
    width: 90%;
    max-width: 90%;
    padding: 5%;
  }

  .image-section {
    position: relative;
    width: 100%;
    height: 300px;
  }

  .navigation-area {
    position: relative;
    left: 0;
    bottom: 0;
    margin-top: 1rem;
    align-items: center;
    width: 100%;
  }

  .action-button{
    margin: auto;
  }
  .description{
    margin-bottom: 1rem;
  }
  .title{
    font-size: 2rem;
  }
}

@media (max-width: 620px) {
  .slider-container{
    width: 100%;
  }
}

@media (max-width: 501px) {
  .title{
    font-size: 1.5rem;
  }
  .subtitle{
    font-size: 1.25rem;
  }
}

</style>