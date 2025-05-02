<!-- ServiceInfo.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { servicesData } from '../data/servicesData';

const route = useRoute();
const router = useRouter();

// Data from route params and query
const serviceId = ref(route.params.id);
const serviceSlug = ref(route.params.slug);
const serviceTitle = ref(route.query.title || '');
const serviceDescription = ref(route.query.description || '');
const serviceImage = ref(route.query.image || '');

// Additional service information
const serviceDetails = ref({
  features: [],
  benefits: [],
  pricing: {},
  gallery: []
});

// Form data
const contactForm = ref({
  name: '',
  phone: '',
  message: ''
});

// Form state
const formSubmitted = ref(false);
const formSubmitting = ref(false);

// Method to go back
const goBack = () => {
  router.back();
};

// Submit form
const submitForm = async () => {
  formSubmitting.value = true;

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  formSubmitted.value = true;
  formSubmitting.value = false;
  contactForm.value = { name: '', phone: '', message: '' };
};

// Load service data
onMounted(async () => {
  try {
    // Find the service in our data
    const service = servicesData.find(s => s.id == serviceId.value);

    if (service) {
      // Update data from our dataset
      serviceTitle.value = service.title;
      serviceDescription.value = service.description;
      serviceImage.value = service.image;
      serviceDetails.value = {
        features: service.features || [],
        benefits: service.benefits || [],
        pricing: service.pricing || {},
        gallery: service.gallery || []
      };
    }

    console.log('Service Info loaded for ID:', serviceId.value);
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

    <!-- Gallery -->
    <div class="service-gallery" v-if="serviceDetails.gallery && serviceDetails.gallery.length > 0">
      <h2>Галерея</h2>
      <div class="gallery-grid">
        <div v-for="(image, index) in serviceDetails.gallery" :key="index" class="gallery-item">
          <img :src="image" :alt="`${serviceTitle} - изображение ${index + 1}`">
        </div>
      </div>
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
  transition: color 0.3s ease;
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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
  position: relative;
  padding-bottom: 0.5rem;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: #0056b3;
  border-radius: 3px;
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
  padding: 0.7rem 0;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #555;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

ul li:last-child {
  border-bottom: none;
}

ul li:before {
  content: "✓";
  color: #0056b3;
  font-weight: bold;
  margin-right: 1rem;
  min-width: 20px;
  text-align: center;
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
  background-color: white;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
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
  width: 100%;
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
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
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
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0056b3;
  box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
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
  font-weight: 500;
}

.submit-button:hover {
  background-color: #003d82;
}

.submit-button:disabled {
  background-color: #99a7b5;
  cursor: not-allowed;
}

/* Form Success */
.form-success {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #4CAF50;
  color: white;
  font-size: 30px;
  border-radius: 50%;
  margin: 0 auto 1rem;
}

.form-success h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4CAF50;
}

.form-success p {
  margin-bottom: 1.5rem;
}

.reset-form-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-form-button:hover {
  background-color: #3d8b40;
}

@media (max-width: 1200px) {
  .service-info-container {
    padding: 1.5rem;
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

  h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .service-hero {
    height: 250px;
  }

  .service-info-container {
    padding: 1rem;
  }
}
</style>