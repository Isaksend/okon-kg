<!-- ServiceCard.vue -->
<script setup>
import { useRouter } from 'vue-router';

// Initialize router
const router = useRouter();

// Define props for the component
const props = defineProps({
  backgroundImage: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  serviceId: {
    type: [Number, String],
    required: true
  },
  // Additional data to pass to ServiceInfo
  serviceSlug: {
    type: String,
    default: ''
  },
  serviceDescription: {
    type: String,
    default: ''
  }
});

// Navigate to ServiceInfo page
const navigateToServiceInfo = () => {
  router.push({
    name: 'ServiceInfo',
    params: {
      id: props.serviceId,
      slug: props.serviceSlug || props.title.toLowerCase().replace(/\s+/g, '-')
    },
    query: {
      title: props.title,
      description: props.serviceDescription,
      image: props.backgroundImage
    }
  });
};
</script>

<template>
  <div class="service-item"
       :style="{ backgroundImage: `url('${backgroundImage}')` }"
       @click="navigateToServiceInfo">
    <div class="service-item-overlay">
      <div class="service-item-text">
        {{ title }}
      </div>
      <div class="service-link-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-item {
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  transition: all 200ms;
}

.service-item:hover {
  margin-top: -10px !important;
}

.service-item:hover .service-link-btn {
  background-color: rgba(255, 255, 255, 0.4);
}

.service-item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.service-item-text {
  font-size: 1.5rem;
  font-weight: 500;
}

.service-link-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.service-link-btn svg {
  rotate: -45deg;
  width: 30px;
  height: 30px;
}

@media (max-width: 1441px) {
  .service-item {
    height: 250px;
  }
  .service-item-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 1101px) {
  .service-item {
    height: 220px !important;
  }
  .service-item-text {
    font-size: 1.15rem;
  }
}

@media (max-width: 768px) {
  .service-item-text {
    font-size: 1.5rem;
  }
  .service-link-btn {
    min-width: 45px;
  }
}
</style>