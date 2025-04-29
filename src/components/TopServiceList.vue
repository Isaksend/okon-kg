<template>
  <div class="top-services-container">
    <h2 class="top-services-title">Топ 5 популярных услуг</h2>

    <!-- Desktop Version -->
    <div class="top-services-desktop" v-if="!isMobile">
      <div class="services-list">
        <div v-for="(service, index) in services" :key="index" class="service-item">
          <div class="service-number">{{ index + 1 }}.</div>
          <div class="service-content">
            <div class="service-title">{{ service.title }}</div>
            <div class="service-description">{{ service.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Version -->
    <div class="top-services-mobile" v-else>
      <button class="view-button" @click="openServicesList">ПОСМОТРЕТЬ</button>

      <!-- Modal for mobile view -->
      <div class="services-modal" v-if="showModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Топ 5 популярных услуг</h3>
            <button class="close-button" @click="closeServicesList">&times;</button>
          </div>
          <div class="modal-body">
            <div v-for="(service, index) in services" :key="index" class="service-item-mobile">
              <div class="service-number-mobile">{{ index + 1 }}.</div>
              <div class="service-content-mobile">
                <div class="service-title-mobile">{{ service.title }}</div>
                <div class="service-description-mobile">{{ service.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// State
const isMobile = ref(false);
const showModal = ref(false);

// Data
const services = ref([
  {
    title: 'Ремонт пластиковых окон — самая популярная услуга.',
    description: 'Кроме обслуживания, мастера занимаются установкой окон и дверей из ПВХ профиля, и других профильных систем: зенитных фонарей, зимних садов, витражей, фасадов.'
  },
  {
    title: 'Вторая по популярности услуга - ремонт алюминиевых окон.',
    description: 'Сюда же можно отнести металлические профильные конструкции: магазинные витрины и балконное остекление алюминиевым профилем.'
  },
  {
    title: 'Разбился ли старый стеклопакет или требуется сделать помещение теплее, заменив однокамерный стеклопакет',
    description: 'на двухкамерный или установив энергосберегающий / мультифункциональный стеклопакет - услуга замены стеклопакета для Вас.'
  },
  {
    title: 'На четвертом - работы по установке аксессуаров: подоконники, отливы, козырьки, откосы.',
    description: 'Услуги выполняются под ключ: с замером, изготовлением требуемой заготовки, а также ее монтажом в Вашем помещении.'
  },
  {
    title: 'Замыкает наш топ изготовление и установка москитных сеток',
    description: '7 вариантов конструкций с использованием 6 видов полотен на все случаи жизни. У нас вы можете заказать сетки любой формы. Цвета из каталога RAL также на Ваш выбор.'
  }
]);

// Methods
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

const openServicesList = () => {
  showModal.value = true;
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
};

const closeServicesList = () => {
  showModal.value = false;
  document.body.style.overflow = ''; // Enable scrolling again
};

// Event listeners for ESC key to close modal
const handleEscKey = (event) => {
  if (event.key === 'Escape' && showModal.value) {
    closeServicesList();
  }
};

// Lifecycle hooks
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  document.addEventListener('keydown', handleEscKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
  document.removeEventListener('keydown', handleEscKey);
  document.body.style.overflow = ''; // Ensure scrolling is enabled when component is unmounted
});
</script>

<style scoped>
.top-services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.top-services-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
}

/* Desktop Styles */
.services-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.service-item {
  display: flex;
  align-items: flex-start;
}

.service-number {
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
  min-width: 30px;
}

.service-content {
  flex: 1;
}

.service-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.service-description {
  font-size: 14px;
  color: #555;
  line-height: 1.4;
}

/* Mobile Styles */
.top-services-mobile {
  text-align: left;
}

.view-button {
  width: 100%;
  padding: 12px;
  background-color: #003399;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
}

.services-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  padding: 15px;
}

.service-item-mobile {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.service-item-mobile:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.service-number-mobile {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  min-width: 25px;
}

.service-title-mobile {
  font-weight: bold;
  margin-bottom: 5px;
  line-height: 1.3;
}

.service-description-mobile {
  font-size: 13px;
  color: #555;
  line-height: 1.3;
}
</style>