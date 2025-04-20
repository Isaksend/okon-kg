<!-- VideoGallery.vue -->
<template>
  <div class="video-gallery">
    <!-- Grid of video thumbnails -->
    <div class="video-grid">
      <div
          v-for="(video, index) in videos"
          :key="index"
          class="video-item"
          @click="openVideo(index)"
      >
        <div class="video-thumbnail">
          <img :src="video.thumbnail" :alt="video.title">
          <div class="play-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="white" d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="video-info">
          <h3>{{ video.title }}</h3>
          <p>{{ video.views }} просмотры</p>
        </div>
      </div>
    </div>

    <!-- Modal for expanded video -->
    <div v-if="isModalOpen" class="video-modal">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-content">
        <div class="modal-header">
          <button class="close-button" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <video
              ref="videoPlayer"
              controls
              autoplay
              :src="videos[currentVideoIndex].url"
          ></video>
          <div class="video-details">
            <h2>{{ videos[currentVideoIndex].title }}</h2>
            <p>{{ videos[currentVideoIndex].description }}</p>
            <p class="video-stats">{{ videos[currentVideoIndex].views }} просмотров • {{ videos[currentVideoIndex].posted }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
              class="nav-button prev-button"
              @click="prevVideo"
              :disabled="currentVideoIndex === 0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
            Предыдущий
          </button>
          <button
              class="nav-button next-button"
              @click="nextVideo"
              :disabled="currentVideoIndex === videos.length - 1"
          >
            Следующий
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Reactive state
const isModalOpen = ref(false);
const currentVideoIndex = ref(0);
const videoPlayer = ref(null);

// Data
const videos = ref([
  {
    id: 1,
    title: 'Новинка!!! Внутренние евро-москитные сетки.',
    description: 'Замер,доставка,установка!\n' +
        '\n' +
        'Установка без сверления окна.\n' +
        '\n' +
        'Простая установка за 5 секунд.\n' +
        '\n' +
        'Большой срок службы.\n' +
        '\n' +
        'Не портит внешний вид окна.\n' +
        '\n' +
        'Не улетит от порывов ветра.\n',
    thumbnail: '/assets/img/img_video_1.jpg',
    url: '/assets/videos/video_1.mp4',
    views: '94.3K',
    posted: '2 недели назад'
  },
  {
    id: 2,
    title: 'Как мы делаем внутренние сетки? Загляните в наш цех!',
    description: 'У нас всё по-настоящему!\n' +
        'Внутренние москитные сетки мы изготавливаем в собственном цехе — под точный размер ваших окон.',
    thumbnail: '/assets/img/img_video_2.jpg',
    url: '/assets/videos/video_2.mp4',
    views: '3.4K',
    posted: '1 неделю назад'
  },
  {
    id: 3,
    title: 'Обычная сетка и антипыль',
    description: 'Идеальный выбор для города, аллергиков и людей, заботящихся о здоровье.\n',
    thumbnail: '/assets/img/img_video_3.jpg',
    url: '/assets/videos/video_3.mp4',
    views: '5.7K',
    posted: '4 дня назад'
  },
]);

// Methods
const openVideo = (index) => {
  currentVideoIndex.value = index;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = ''; // Re-enable scrolling
  if (videoPlayer.value) {
    videoPlayer.value.pause();
  }
};

const nextVideo = () => {
  if (currentVideoIndex.value < videos.value.length - 1) {
    currentVideoIndex.value++;
  }
};

const prevVideo = () => {
  if (currentVideoIndex.value > 0) {
    currentVideoIndex.value--;
  }
};

// Keyboard navigation handler
const handleKeyDown = (e) => {
  if (!isModalOpen.value) return;

  if (e.key === 'Escape') {
    closeModal();
  } else if (e.key === 'ArrowRight') {
    nextVideo();
  } else if (e.key === 'ArrowLeft') {
    prevVideo();
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.video-gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.video-item {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.video-item:hover {
  transform: translateY(-5px);
}

.video-thumbnail {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-info {
  padding: 15px;
}

.video-info h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

.video-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

/* Modal styles */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 500px;
  max-height: 1200px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  z-index: 1001;
}

.modal-header {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px 10px;
  color: #333;
}

.modal-body {
  padding: 0 20px 20px;
}

.modal-body video {
  width: 100%;
  border-radius: 8px;
  max-height: 55vh;
}

.video-details {
  padding: 15px 0;
}

.video-details h2 {
  margin: 0 0 10px;
}

.video-details p {
  line-height: 1.6;
}

.video-stats {
  color: #666;
  font-size: 14px;
}

.modal-footer {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
}

.nav-button {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.nav-button:hover:not(:disabled) {
  background: #e0e0e0;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prev-button svg {
  margin-right: 5px;
}

.next-button svg {
  margin-left: 5px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }

  .modal-content {
    width: 95%;
  }

  .modal-footer {
    padding: 10px;
  }

  .nav-button {
    padding: 6px 12px;
    font-size: 14px;
  }
}

@media (max-width: 431px) {
  .video-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  .modal-body video{
    max-height: 30vh;
  }
}
</style>