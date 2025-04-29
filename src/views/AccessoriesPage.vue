<template>
  <div class="accessories-page">
    <div class="page-header">
      <h1 class="page-title">Аксессуары для окон и дверей</h1>
      <p class="page-description">Полный ассортимент высококачественных аксессуаров для ваших окон и дверей</p>
    </div>

    <!-- Import the AccessoriesBlock component -->
    <AccessoriesBlock />

    <!-- Additional content for the accessories page -->
    <div class="accessories-benefits">
      <div class="benefits-container">
        <h2 class="section-title">Преимущества наших аксессуаров</h2>

        <div class="benefits-grid">
          <div v-for="(benefit, index) in benefits" :key="index" class="benefit-item">
            <div class="benefit-icon">
              <img :src="benefit.icon" :alt="benefit.title">
            </div>
            <div class="benefit-content">
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ordering-section">
      <div class="ordering-container">
        <h2 class="section-title">Как заказать аксессуары</h2>
        <div class="steps-container">
          <div v-for="(step, index) in orderSteps" :key="index" class="step-item">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
        <div class="cta-container">
          <button class="cta-button" @click="contactSpecialist">Консультация специалиста</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AccessoriesBlock from '../components/AccessoriesBlock.vue';

// Data for benefits section with icons from assets/icons directory
const benefits = ref([
  {
    title: 'Высокое качество',
    description: 'Все аксессуары изготовлены из высококачественных материалов и соответствуют европейским стандартам.',
    icon: '/assets/icons/Quality.png'
  },
  {
    title: 'Надежная безопасность',
    description: 'Наши аксессуары обеспечивают дополнительную защиту и безопасность вашего дома.',
    icon: '/assets/icons/Lock.png'
  },
  {
    title: 'Простая установка',
    description: 'Многие аксессуары можно установить самостоятельно или воспользоваться услугами наших специалистов.',
    icon: '/assets/icons/Hand.png'
  },
  {
    title: 'Гарантия качества',
    description: 'На все аксессуары предоставляется гарантия от производителя сроком от 1 до 5 лет.',
    icon: '/assets/icons/Time.png'
  }
]);

// Data for ordering steps
const orderSteps = ref([
  {
    title: 'Выбор аксессуаров',
    description: 'Ознакомьтесь с нашим каталогом и выберите необходимые аксессуары для ваших окон и дверей.'
  },
  {
    title: 'Консультация',
    description: 'Свяжитесь с нашими специалистами для получения профессиональной консультации по выбору и установке.'
  },
  {
    title: 'Оформление заказа',
    description: 'Оформите заказ онлайн или по телефону, указав все необходимые параметры и предпочтения.'
  },
  {
    title: 'Доставка и установка',
    description: 'Мы доставим аксессуары в удобное для вас время и предложим услуги по профессиональной установке.'
  }
]);

// Methods
const contactSpecialist = () => {
  // Logic to handle contact form or redirect to contact page
  console.log('Opening contact form...');
  // You could implement a modal popup or redirect to contact page
};

// Lifecycle hooks
onMounted(() => {
  // Any initialization logic can go here
  document.title = 'Аксессуары для окон и дверей';
});
</script>

<style scoped>
.accessories-page {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 15px 0;
}

.page-title {
  font-size: 32px;
  margin-bottom: 10px;
  color: #003366;
}

.page-description {
  font-size: 16px;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: 24px;
  margin-bottom: 30px;
  color: #003366;
  text-align: center;
}

.accessories-benefits {
  margin: 50px 0;
}

.benefits-container {
  max-width: 1000px;
  margin: 0 auto;
}

.benefits-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
}

.benefit-item {
  width: calc(50% - 15px);
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;
}

.benefit-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.benefit-icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.benefit-content h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: #003366;
}

.benefit-content p {
  color: #555;
  line-height: 1.5;
}

.ordering-section {
  margin: 40px 0;
  background-color: #f0f9ff;
  padding: 30px 20px;
  border-radius: 8px;
}

.ordering-container {
  max-width: 1000px;
  margin: 0 auto;
}

.steps-container {
  margin-top: 30px;
}

.step-item {
  display: flex;
  margin-bottom: 25px;
  align-items: flex-start;
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: #0056b3;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  margin-bottom: 5px;
  font-size: 18px;
  color: #003366;
}

.step-content p {
  color: #666;
  line-height: 1.5;
}

.cta-container {
  text-align: center;
  margin-top: 30px;
}

.cta-button {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #003d82;
}

/* Responsive styles */
@media (max-width: 768px) {
  .benefit-item {
    width: 100%;
  }

  .page-title {
    font-size: 26px;
  }

  .section-title {
    font-size: 22px;
  }

  .step-item {
    flex-direction: column;
  }

  .step-number {
    margin-bottom: 10px;
  }

  .benefit-icon {
    width: 40px;
    height: 40px;
  }
}
</style>