<!-- ServiceBlock.vue -->
<script setup>
import { useRouter } from 'vue-router';
import ServiceCard from './ServiceCard.vue';
import { servicesData } from '../data/servicesData';

// Router
const router = useRouter();

// Select featured services (first 4)
const featuredServices = servicesData.slice(0, 4);

// Methods
const handleViewAllClick = () => {
  router.push({ name: 'ServicesPage' });
};
</script>

<template>
  <div class="service-block">
    <div class="service-header">
      <div class="service-title">
        Наши услуги
      </div>
      <router-link to="/services" class="view-all-link">
        <div class="view-all" @click="handleViewAllClick">
          <span>СМОТРЕТЬ ВСЕ</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </router-link>
    </div>
    <div class="service-contain">
      <ServiceCard
          v-for="service in featuredServices"
          :key="service.id"
          :backgroundImage="service.image"
          :title="service.title"
          :serviceId="service.id"
          :serviceSlug="service.slug"
          :serviceDescription="service.description"
          :priority="service.priority"
      />
    </div>
  </div>
</template>

<style scoped>
.service-block {
  width: 100%;
  max-width: 1200px;
  padding: 3rem 2rem;
  margin: 0 auto;
}

.service-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.service-title {
  font-size: 2.25rem;
  font-weight: 600;
  text-align: center;
}

.view-all-link{
  color: black;
  text-decoration: none;
  display: flex;
  justify-content: right;
  width: 100%;
}

.view-all {
  display: flex;
  width: 100%;
  justify-content: right;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 5rem;
}

.service-contain {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 1441px) {
  .service-block{
    max-width: 1000px !important;
    padding: 3rem 0;

  }
}

@media (max-width: 1101px) {
  .service-block{
    max-width: 900px !important;
  }
}

@media (max-width: 768px) {
  .service-contain {
    grid-template-columns: 100%;
    padding: 10px 5%;
  }

  .service-title{
    font-size: 1.5rem;
  }
  .service-header {
    flex-direction: column;
    gap: 1rem;
  }

  .view-all{
    margin-top: 2rem;
  }
  .service-block {
    padding: 2rem 0;
    max-width: 100%;
  }
}
</style>