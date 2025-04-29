<template>
  <div class="projects-page">
    <OurWorks />
    <section class="projects-content">
      <h2 class="gallery-title">Галерея наших проектов</h2>

      <div class="projects-gallery">
        <!-- Gallery Grid -->
        <div class="gallery-grid">
          <div
              v-for="(project, index) in projectGallery"
              :key="index"
              class="gallery-item"
              @click="openModal(index)">
            <img :src="project.image" :alt="project.title" class="gallery-image">
            <div class="gallery-overlay">
              <span class="gallery-title">{{ project.title }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Window -->
      <div v-if="isModalOpen" class="gallery-modal" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-button" @click="closeModal">&times;</button>

          <div class="modal-image-container">
            <img :src="projectGallery[currentModalIndex].image" :alt="projectGallery[currentModalIndex].title" class="modal-image">

            <button v-if="projectGallery.length > 1" class="modal-nav-button prev" @click.stop="prevImage">
              <span>&lt;</span>
            </button>

            <button v-if="projectGallery.length > 1" class="modal-nav-button next" @click.stop="nextImage">
              <span>&gt;</span>
            </button>
          </div>

          <div class="modal-info">
            <h3 class="modal-title">{{ projectGallery[currentModalIndex].title }}</h3>
            <p class="modal-description">{{ projectGallery[currentModalIndex].description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import OurWorks from '../components/OurWorks.vue';

// Any additional page logic can go here
const isLoading = ref(true);
const isModalOpen = ref(false);
const currentModalIndex = ref(0);

// Gallery data - replace with your actual images
const projectGallery = ref([
  {
    title: 'Замена окон в квартире',
    image: '/assets/img/ourworks_item_1.png',
    description: 'Полная замена окон в трехкомнатной квартире. Установка энергосберегающих стеклопакетов с шумоизоляцией.'
  },
  {
    title: 'Остекление балкона',
    image: '/assets/img/ourworks_item_2.png',
    description: 'Остекление балкона с утеплением и внутренней отделкой. Установка алюминиевого профиля с терморазрывом.'
  },
  {
    title: 'Замена старых деревянных окон',
    image: '/assets/img/ourworks_item_3.png',
    description: 'Замена старых деревянных окон на новые пластиковые в частном доме. Улучшение теплоизоляции.'
  },
  {
    title: 'Панорамные окна в гостиной',
    image: '/assets/img/ourworks_item_4.png',
    description: 'Установка панорамных окон в гостиной для максимального естественного освещения и прекрасного вида.'
  },
  {
    title: 'Раздвижные двери на террасу',
    image: '/assets/img/ourworks_item_5.png',
    description: 'Монтаж раздвижных дверей с выходом на террасу. Система с минимальной видимой рамой.'
  },
  {
    title: 'Реставрация исторических окон',
    image: '/assets/img/ourworks_item_3.png',
    description: 'Реставрация исторических деревянных окон с сохранением оригинального стиля здания XIX века.'
  },
  {
    title: 'Окна с декоративной раскладкой',
    image: '/assets/img/ourworks_item_2.png',
    description: 'Изготовление и установка окон с декоративной раскладкой для классического интерьера.'
  },
  {
    title: 'Замена окон в офисе',
    image: '/assets/img/ourworks_item_1.png',
    description: 'Комплексная замена окон в офисном помещении с применением тонированных стеклопакетов.'
  }
]);

// Modal methods
const openModal = (index) => {
  currentModalIndex.value = index;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = ''; // Restore scrolling
};

const nextImage = (event) => {
  event.stopPropagation();
  currentModalIndex.value = (currentModalIndex.value + 1) % projectGallery.value.length;
};

const prevImage = (event) => {
  event.stopPropagation();
  currentModalIndex.value = (currentModalIndex.value - 1 + projectGallery.value.length) % projectGallery.value.length;
};

// Handle keyboard navigation
const handleKeyDown = (event) => {
  if (!isModalOpen.value) return;

  if (event.key === 'Escape') {
    closeModal();
  } else if (event.key === 'ArrowRight') {
    currentModalIndex.value = (currentModalIndex.value + 1) % projectGallery.value.length;
  } else if (event.key === 'ArrowLeft') {
    currentModalIndex.value = (currentModalIndex.value - 1 + projectGallery.value.length) % projectGallery.value.length;
  }
};

onMounted(() => {
  // Page initialization logic
  setTimeout(() => {
    isLoading.value = false;
  }, 500);

  // Add keyboard event listener for modal navigation
  window.addEventListener('keydown', handleKeyDown);
});

// Clean up event listener when component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);

  // Make sure to reset body overflow if component is unmounted while modal is open
  if (isModalOpen.value) {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-title {
  font-size: 28px;
  font-weight: bold;
  color: #2a8a8a;
  text-align: center;
  margin: 60px 0 30px;
}

.projects-content {
  width: 100%;
}

.projects-gallery {
  margin-top: 20px;
}

/* Gallery Grid Styles */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.gallery-item {
  position: relative;
  height: 220px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 20px 15px 15px;
  color: white;
  transition: opacity 0.3s ease;
}

.gallery-overlay .gallery-title {
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin: 0;
  text-align: left;
}

/* Modal Styles */
.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image-container {
  position: relative;
  height: 60vh;
  background-color: #f0f0f0;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.modal-nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 18px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.modal-nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-nav-button.prev {
  left: 15px;
}

.modal-nav-button.next {
  right: 15px;
}

.modal-info {
  padding: 20px;
  background-color: white;
}

.modal-title {
  font-size: 20px;
  margin: 0 0 10px;
  color: #2a8a8a;
}

.modal-description {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

/* Responsive styles */
@media (max-width: 767px) {
  .projects-page {
    padding: 0;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }

  .gallery-item {
    height: 180px;
  }

  .gallery-title {
    margin: 40px 0 20px;
    font-size: 22px;
  }

  .modal-content {
    width: 95%;
    max-height: 95vh;
  }

  .modal-image-container {
    height: 50vh;
  }

  .modal-title {
    font-size: 18px;
  }

  .modal-description {
    font-size: 14px;
  }

  .modal-nav-button {
    width: 35px;
    height: 35px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .gallery-item {
    height: 200px;
  }
}
</style>