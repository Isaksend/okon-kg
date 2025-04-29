<script setup>
import ServiceCard from '../components/ServiceCard.vue';

// Service data with extended information
const services = [
  {
    id: 1,
    title: 'Москитные сетки (внутрении)',
    image: '/assets/background/service_item_1.png',
    slug: 'moskitnye-setki-vnutrennii',
    description: 'Качественные внутренние москитные сетки для защиты от насекомых. Простая установка, долговечность и надежность.'
  },
  {
    id: 2,
    title: 'Раздвижные москитные сетки плиссе',
    image: '/assets/background/service_item_2.png',
    slug: 'moskitnye-setki-plisse',
    description: 'Современные раздвижные москитные сетки плиссе. Идеальное решение для балконов и террас.'
  },
  {
    id: 3,
    title: 'Устранение продувания',
    image: '/assets/background/service_item_3.png',
    slug: 'ustranenie-produvaniya',
    description: 'Профессиональное устранение продувания окон. Утепление и герметизация для комфортного микроклимата.'
  },
  {
    id: 4,
    title: 'Замена стеклопакета',
    image: '/assets/background/service_item_4.png',
    slug: 'zamena-steklopaketa',
    description: 'Быстрая и профессиональная замена стеклопакетов. Используем качественные материалы с гарантией.'
  },{
    id: 5,
    title: 'Регулировка окон',
    image: '/assets/background/service_item_5.png',
    slug: 'zamena-steklopaketa',
    description: 'Быстрая и профессиональная замена стеклопакетов. Используем качественные материалы с гарантией.'
  },{
    id: 6,
    title: 'Утепление окон',
    image: '/assets/background/service_item_6.png',
    slug: 'zamena-steklopaketa',
    description: 'Быстрая и профессиональная замена стеклопакетов. Используем качественные материалы с гарантией.'
  },{
    id: 7,
    title: 'Ремонт фурнитуры',
    image: '/assets/background/service_item_7.png',
    slug: 'zamena-steklopaketa',
    description: 'Быстрая и профессиональная замена стеклопакетов. Используем качественные материалы с гарантией.'
  },{
    id: 8,
    title: 'Замена уплотнителя',
    image: '/assets/background/service_item_8.png',
    slug: 'zamena-steklopaketa',
    description: 'Быстрая и профессиональная замена стеклопакетов. Используем качественные материалы с гарантией.'
  },

];
</script>

<template>
  <div class="services-page">
    <div class="service-header">
      <div class="service-title">
        Наши услуги
      </div>
    </div>
    <div class="service-contain-block">
      <ServiceCard
          v-for="service in services"
          :key="service.id"
          :backgroundImage="service.image"
          :title="service.title"
          :serviceId="service.id"
          :serviceSlug="service.slug"
          :serviceDescription="service.description"
      />
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

  .service-contain-block {
    margin: auto 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .service-link-btn svg{
    rotate: -45deg;
    width: 30px;
    height: 30px;
  }

  @media (max-width: 1441px) {
    .services-page{
      max-width: 1000px !important;
      padding: 3rem 0;
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
  }
</style>