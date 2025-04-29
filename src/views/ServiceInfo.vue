<!-- ServiceInfo.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Data from route params and query
const serviceId = ref(route.params.id);
const serviceSlug = ref(route.params.slug);
const serviceTitle = ref(route.query.title || '');
const serviceDescription = ref(route.query.description || '');
const serviceImage = ref(route.query.image || '');

// Additional service information that could be fetched from an API
const serviceDetails = ref({
  features: [],
  benefits: [],
  pricing: {},
  gallery: []
});

// Method to go back
const goBack = () => {
  router.back();
};

// Could fetch more details based on ID
onMounted(async () => {
  try {
    // This would be an API call in a real application
    // const response = await fetch(`/api/services/${serviceId.value}`);
    // const data = await response.json();
    // serviceDetails.value = data;

    console.log('Service Info loaded for ID:', serviceId.value);

    // For demonstration, we'll simulate some data
    serviceDetails.value = {
      features: [
        'Высокое качество материалов',
        'Профессиональная установка',
        'Гарантия на все работы',
        'Быстрое обслуживание'
      ],
      benefits: [
        'Долговечность',
        'Надежность',
        'Эстетичный внешний вид',
        'Функциональность'
      ],
      pricing: {
        basic: '5000 ₽',
        standard: '7500 ₽',
        premium: '10000 ₽'
      },
      gallery: [
        '/assets/gallery/service1_1.jpg',
        '/assets/gallery/service1_2.jpg',
        '/assets/gallery/service1_3.jpg'
      ]
    };

  } catch (error) {
    console.error('Error fetching service details:', error);
  }
});
</script>

<template>
  <div class="service-info-container">
    <!-- Back button -->
    <div class="back-button" @click="goBack">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span>Назад</span>
    </div>

    <!-- Service Header -->
    <div class="service-hero" :style="{ backgroundImage: `url('${serviceImage}')` }">
      <div class="service-hero-overlay">
        <h1 class="service-title">{{ serviceTitle }}</h1>
      </div>
    </div>

    <!-- Service Description -->
    <div class="service-description">
      <h2>Описание</h2>
      <p>{{ serviceDescription }}</p>
    </div>

    <!-- Service Features -->
    <div class="service-features">
      <h2>Особенности</h2>
      <ul>
        <li v-for="(feature, index) in serviceDetails.features" :key="index">
          {{ feature }}
        </li>
      </ul>
    </div>

    <!-- Service Benefits -->
    <div class="service-benefits">
      <h2>Преимущества</h2>
      <ul>
        <li v-for="(benefit, index) in serviceDetails.benefits" :key="index">
          {{ benefit }}
        </li>
      </ul>
    </div>

    <!-- Pricing -->
    <div class="service-pricing">
      <h2>Стоимость</h2>
      <div class="pricing-cards">
        <div class="pricing-card" v-for="(price, level) in serviceDetails.pricing" :key="level">
          <h3>{{ level === 'basic' ? 'Базовый' : level === 'standard' ? 'Стандарт' : 'Премиум' }}</h3>
          <div class="price">{{ price }}</div>
          <button class="order-button">Заказать</button>
        </div>
      </div>
    </div>

    <!-- Gallery -->
    <div class="service-gallery" v-if="serviceDetails.gallery.length > 0">
      <h2>Галерея</h2>
      <div class="gallery-grid">
        <div v-for="(image, index) in serviceDetails.gallery" :key="index" class="gallery-item">
          <img :src="image" :alt="`${serviceTitle} - изображение ${index + 1}`">
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <div class="service-contact">
      <h2>Заказать консультацию</h2>
      <form class="contact-form">
        <div class="form-group">
          <label for="name">Ваше имя</label>
          <input type="text" id="name" placeholder="Введите ваше имя">
        </div>
        <div class="form-group">
          <label for="phone">Телефон</label>
          <input type="tel" id="phone" placeholder="+7 (___) ___-__-__">
        </div>
        <div class="form-group">
          <label for="message">Сообщение</label>
          <textarea id="message" rows="4" placeholder="Ваш вопрос или комментарий"></textarea>
        </div>
        <button type="submit" class="submit-button">Отправить</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.service-info-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  cursor: pointer;
  font-weight: 500;
  color: #333;
  width: fit-content;
}

.back-button:hover {
  color: #0056b3;
}

.service-hero {
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  position: relative;
  margin-bottom: 2rem;
}

.service-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  border-radius: 15px;
}

.service-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
}

.service-description,
.service-features,
.service-benefits,
.service-pricing,
.service-gallery,
.service-contact {
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #555;
}

ul li:before {
  content: "✓";
  color: #0056b3;
  font-weight: bold;
  margin-right: 1rem;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.pricing-card {
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.pricing-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.price {
  font-size: 2rem;
  font-weight: 600;
  color: #0056b3;
  margin-bottom: 1.5rem;
}

.order-button {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.order-button:hover {
  background-color: #003d82;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.gallery-item {
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.contact-form {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.submit-button {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.submit-button:hover {
  background-color: #003d82;
}

@media (max-width: 1200px) {
  .service-info-container {
    padding: 2rem;
  }
}

@media (max-width: 992px) {
  .pricing-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .service-hero {
    height: 300px;
  }

  .service-title {
    font-size: 1.8rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .pricing-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .service-hero {
    height: 250px;
  }
}
</style>