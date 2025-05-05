<template>
  <div class="reviews-container">
    <h2 class="reviews-title">Отзывы</h2>

    <!-- Desktop View - Three reviews in one line -->
    <div class="reviews-desktop" v-if="!isMobile">
      <div class="reviews-grid">
        <div v-for="(review, index) in visibleReviews" :key="index" class="review-card">
          <div class="review-header">
            <div class="review-avatar-container">
              <img loading="lazy" :src="review.avatar" :alt="review.name" class="review-avatar">
              <h3 class="review-name">{{ review.name }}</h3>
            </div>
            <div class="review-rating">
              <div class="stars">
                <span v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= review.rating }">★</span>
              </div>
            </div>
          </div>
          <div class="review-subtitle">{{ review.subtitle }}</div>
          <div class="review-content">
            <p>"{{ review.text }}"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile View - Single Review -->
    <div class="reviews-mobile" v-else>
      <div class="reviews-slider">
        <button class="nav-button prev" @click="prevReview">
          <span>&lt;</span>
        </button>

        <div class="reviews-slider-content">
          <transition-group name="fade">
            <div v-for="(review, index) in reviews"
                 :key="index"
                 v-show="currentReview === index"
                 class="review-card">
              <div class="review-header">
                <div class="review-avatar-container">
                  <img loading="lazy" :src="review.avatar" :alt="review.name" class="review-avatar">
                  <h3 class="review-name">{{ review.name }}</h3>
                </div>
                <div class="review-rating">
                  <div class="stars">
                    <span v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= review.rating }">★</span>
                  </div>
                </div>
              </div>
              <div class="review-subtitle">{{ review.subtitle }}</div>
              <div class="review-content">
                <p>"{{ review.text }}"</p>
              </div>
            </div>
          </transition-group>
        </div>

        <button class="nav-button next" @click="nextReview">
          <span>&gt;</span>
        </button>
      </div>

      <div class="review-dots">
        <span v-for="(review, index) in reviews"
              :key="index"
              @click="goToReview(index)"
              :class="{ 'active': currentReview === index }"
              class="dot"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// State
const isMobile = ref(false);
const currentReview = ref(0);
const reviewsPerPage = 3; // Number of reviews to display on desktop

// Data
const reviews = ref([
  {
    name: 'Александр',
    subtitle: 'Раздвижные москитные сетки плиссе, Бишкек',
    avatar: '/assets/img/reviews/avatar-1.png',
    rating: 5,
    text: 'Я заказал москитные сетки плиссе для своего дома и остался полностью доволен результатом. Команда профессионалов быстро и эффективно установила сетки, учитывая все мои требования и особенности окон. Сетки отлично вписались в интерьер и эффективно защищают от насекомых, не мешая вентиляции. Особенно порадовала вежливость и готовность помочь со стороны сотрудников компании. Рекомендую эти москитные сетки всем, кто ищет качественное и надежное решение.'
  },
  {
    name: 'Алибек',
    subtitle: 'Ремонт окон, Бишкек',
    avatar: '/assets/img/reviews/avatar-2.png',
    rating: 5,
    text: 'Очень доволен услугами компании по ремонту окон. Команда профессионалов быстро и качественно решила мою проблему, учтя все нюансы, и предложила адекватные цены. Окна теперь выглядят как новые, и мне дали полезные советы по их уходу. Рекомендую всем, кто ищет надежный сервис.'
  },
  {
    name: 'Анастасия',
    subtitle: 'Ремонт окон, Бишкек',
    avatar: '/assets/img/reviews/avatar-3.png',
    rating: 5,
    text: 'Я обратилась в вашу компанию для ремонта старых деревянных окон, и результаты превзошли мои ожидания. Мастера не только восстановили окна, но и сохранили их исторический вид, выполнив всё чисто и в срок. Мне дали полезные советы по уходу за деревянными окнами. Благодарю за профессиональный подход и уважение к моим пожеланиям.'
  },
]);

// Computed
const visibleReviews = computed(() => {
  const startIndex = (Math.floor(currentReview.value / reviewsPerPage) * reviewsPerPage);
  return reviews.value.slice(startIndex, startIndex + reviewsPerPage);
});

// Methods for checking device size
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

// Methods for single review navigation (mobile)
const nextReview = () => {
  currentReview.value = currentReview.value === reviews.value.length - 1
      ? 0
      : currentReview.value + 1;
};

const prevReview = () => {
  currentReview.value = currentReview.value === 0
      ? reviews.value.length - 1
      : currentReview.value - 1;
};

const goToReview = (index) => {
  currentReview.value = index;
};

// Methods for review set navigation (desktop)
const nextReviewSet = () => {
  const totalSets = Math.ceil(reviews.value.length / reviewsPerPage);
  const currentSet = Math.floor(currentReview.value / reviewsPerPage);
  const nextSet = (currentSet + 1) % totalSets;
  currentReview.value = nextSet * reviewsPerPage;
};

const prevReviewSet = () => {
  const totalSets = Math.ceil(reviews.value.length / reviewsPerPage);
  const currentSet = Math.floor(currentReview.value / reviewsPerPage);
  const prevSet = currentSet === 0 ? totalSets - 1 : currentSet - 1;
  currentReview.value = prevSet * reviewsPerPage;
};

const goToReviewSet = (setIndex) => {
  currentReview.value = setIndex * reviewsPerPage;
};

// Auto-slide functionality
let reviewInterval = null;

const startAutoReview = () => {
  reviewInterval = setInterval(() => {
    if (isMobile.value) {
      nextReview();
    } else {
      nextReviewSet();
    }
  }, 7000); // Change review every 7 seconds
};

const stopAutoReview = () => {
  clearInterval(reviewInterval);
};

// Lifecycle hooks
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  startAutoReview();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
  stopAutoReview();
});
</script>

<style scoped>
.reviews-container {
  width: 100%;
  background-color: #2a8a8a;
  padding: 40px 0;
  color: white;
}

.reviews-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 36px;
  font-weight: 400;
}

/* Desktop Styles */
.reviews-desktop {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.reviews-grid {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  justify-content: center;
}

.reviews-desktop .review-card {
  flex: 1;
  max-width: 380px;
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  color: #333;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.review-avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.review-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.review-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.review-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
}

.review-rating {
  display: flex;
  align-items: center;
}

.stars {
  display: flex;
}

.star {
  color: #ccc;
  font-size: 18px;
  margin-left: 2px;
}

.star.filled {
  color: #2a8a8a;
}

.review-content {
  line-height: 1.5;
  font-size: 14px;
  margin-top: 5px;
}

.review-content p {
  margin: 0;
}

/* Mobile Styles */
.reviews-mobile .reviews-slider {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.reviews-slider-content {
  width: 100%;
  max-width: 800px;
  position: relative;
  height: 350px;
  margin: 0 20px;
  overflow: hidden;
}

.reviews-mobile .review-card {
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  color: #333;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
  border-radius: 0;
}

.nav-button.next {
  background-color: white;
  color: #003399;
}

.review-dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dot.active {
  background-color: white;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .reviews-mobile .reviews-slider {
    padding: 0 10px;
  }

  .reviews-mobile .review-card {
    padding: 0;
    max-width: 100%;
  }

  .reviews-slider-content {
    height: 400px;
    margin: 0 5px;
  }

  .review-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 1rem;
  }

  .review-rating {
    margin-top: 10px;
    justify-content: center;
  }

  .review-subtitle{
    padding: 0 20px;
    text-align: center;
  }

  .review-content {
    font-size: 14px;
    padding: 5px 20px;
  }
}

@media (max-width: 591px) {
  .reviews-slider-content {
    height: 450px;
  }
  .review-subtitle{
    font-size: 12px;
    margin: 0 0 5px 0;
  }
  .review-content {
    font-size: 12px;
  }
}

@media (max-width: 431px) {
  .reviews-slider-content {
    height: 500px;
  }
}


@media (max-width: 992px) and (min-width: 768px) {
  .reviews-grid {
    flex-wrap: wrap;
  }

  .reviews-desktop .review-card {
    flex: 0 0 calc(50% - 15px);
    max-width: calc(50% - 15px);
  }
}
</style>