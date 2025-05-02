<!-- ServicesPage.vue -->
<script setup>
import { ref, computed } from 'vue';
import ServiceCard from '../components/ServiceCard.vue';
import { servicesData, companyInfo } from '../data/servicesData';

// State
const searchQuery = ref('');
const selectedCategory = ref('all');

// Categories from company info
const categories = companyInfo.categories;

// Computed properties
const filteredServices = computed(() => {
  let result = servicesData;

  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(service => service.category === selectedCategory.value);
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(service =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
    );
  }

  return result;
});

// Methods
const handleSearch = (e) => {
  searchQuery.value = e.target.value;
};

const clearSearch = () => {
  searchQuery.value = '';
};

const setCategory = (categoryId) => {
  selectedCategory.value = categoryId;
};
</script>

<template>
  <div class="services-page">
    <div class="service-header">
      <div class="service-title">
        Наши услуги
      </div>
    </div>

    <!-- Filters -->
    <div class="service-filters">

      <!-- Category tabs -->
      <div class="category-tabs">
        <button
            v-for="category in categories"
            :key="category.id"
            :class="{ 'active': selectedCategory === category.id }"
            @click="setCategory(category.id)"
            class="category-tab"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="service-contain-block">
      <ServiceCard
          v-for="service in filteredServices"
          :key="service.id"
          :backgroundImage="service.image"
          :title="service.title"
          :serviceId="service.id"
          :serviceSlug="service.slug"
          :serviceDescription="service.description"
          :priority="service.priority"
      />

      <!-- No results message -->
      <div v-if="filteredServices.length === 0" class="no-results">
        <p>Услуги не найдены. Попробуйте изменить параметры поиска.</p>
        <button @click="clearSearch" class="reset-button">Сбросить фильтры</button>
      </div>
    </div>

    <!-- Company info section -->
    <div class="company-info">
      <h2>О компании</h2>
      <p>{{ companyInfo.aboutText }}</p>
    </div>
  </div>
</template>

<style scoped>
.services-page {
  max-width: 1200px;
  margin: 50px auto;
}

.service-header{
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.service-title{
  display: flex;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #000000;
}

/* Search and filters */
.service-filters {
  margin-bottom: 2rem;
  padding: 0 15px;
}


.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-tab {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: none;
  cursor: pointer;
}

.category-tab.active {
  background-color: #0056b3;
  color: white;
  border-color: #0056b3;
}

/* Services grid */
.service-contain-block {
  margin: auto 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* No results */
.no-results {
  grid-column: span 2;
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.reset-button {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

/* Company info */
.company-info {
  margin-top: 3rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.company-info h2 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.locations h3 {
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

@media (max-width: 1441px) {
  .services-page{
    max-width: 1000px !important;
    padding: 0;
  }
}

@media (max-width: 1101px) {
  .services-page{
    max-width: 900px !important;
  }
}

@media (max-width: 768px) {
  .service-contain-block {
    grid-template-columns: 100%;
    padding: 10px 5%;
  }

  .service-title{
    font-size: 1.5rem;
  }

  .services-page {
    padding: 0;
    max-width: 100%;
  }

  .no-results {
    grid-column: 1;
  }
}
</style>