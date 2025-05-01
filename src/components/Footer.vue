<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// State
const isMobile = ref(false);
const currentYear = ref(new Date().getFullYear());

// Social media links
const socialLinks = ref([
  { name: 'Instagram', icon: '/assets/icons/Instagram.png', url: 'https://instagram.com/okon.kg' },
  { name: 'WhatsApp', icon: '/assets/icons/WhatsApp.png', url: 'https://wa.me/996702299777' },
  { name: 'Tiktok', icon: '/assets/icons/TikTok.png', url: 'https://t.me/okonkg' }
]);

// Footer menu items removed as per request

// Contact information
const contactInfo = ref({
  bishkek: {
    address: 'Бишкек, Ибраимова 61',
    phone: '+996 702 299 777'
  },
  osh: {
    address: 'Ош, тц Таатан 1 этаж',
    phone: '+996 500 076 200'
  }
});

// Check screen size
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

// Lifecycle hooks
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div class="footer-component">
    <div class="footer-content">
      <!-- Logo and company description -->
      <div class="footer-logo-section">
        <div class="footer-logo">
          <picture>
            <source media="(max-width: 501px)" srcset="/assets/logo/mobile_logo.jpg" />
            <img src="/assets/logo/logo.png" class="logo" alt="Okon.kg logo" />
          </picture>
          <div class="logo-name">OKON.KG</div>
        </div>
        <div class="company-description">
          Ремонт окон и оконные аксессуары в Бишкеке и Оше.
          Качественные услуги и товары для вашего комфорта.
        </div>
      </div>

      <div class="footer-contacts-section">
        <h3 class="footer-section-title">Контакты</h3>

        <div class="contact-item">
          <div class="city-name">Бишкек</div>
          <div class="address">{{ contactInfo.bishkek.address }}</div>
          <a :href="`tel:${contactInfo.bishkek.phone.replace(/\s/g, '')}`" class="phone-number">
            {{ contactInfo.bishkek.phone }}
          </a>
        </div>

        <div class="contact-item">
          <div class="city-name">Ош</div>
          <div class="address">{{ contactInfo.osh.address }}</div>
          <a :href="`tel:${contactInfo.osh.phone.replace(/\s/g, '')}`" class="phone-number">
            {{ contactInfo.osh.phone }}
          </a>
        </div>
      </div>

      <!-- Social media and call button -->
      <div class="footer-social-section">
        <h3 class="footer-section-title">Мы в социальных сетях</h3>
        <div class="social-links">
          <a
              v-for="(social, index) in socialLinks"
              :key="index"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
          >
            <img :src="social.icon" :alt="social.name" class="social-icon">
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile accordion menu removed as per request -->

    <!-- Copyright section -->
    <div class="footer-bottom">
      <div class="copyright">
        © {{ currentYear }} OKON.KG - Все права защищены
      </div>
      <div class="footer-links" v-if="!isMobile">
        <a href="/policy" class="policy-link">Политика конфиденциальности</a>
        <a href="/terms" class="policy-link">Условия использования</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-component {
  background-color: #022279;
  max-width: 100%;
  padding: 50px 16.82% 30px;
  color: #ffffff;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  grid-gap: 40px;
}

/* Logo section */
.footer-logo-section {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  height: 60px;
  margin-right: 10px;
  width: auto;
}

.logo-name {
  font-weight: 600;
  font-size: 1.25rem;
}

.company-description {
  font-size: 14px;
  line-height: 1.5;
  margin-top: 10px;
}

/* Section titles */
.footer-section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
}

.footer-section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: #378D93;
}

/* Contact section */
.contact-item {
  margin-bottom: 20px;
}

.city-name {
  font-weight: 600;
  margin-bottom: 5px;
}

.address {
  font-size: 14px;
  margin-bottom: 5px;
}

.phone-number {
  display: block;
  text-decoration: none;
  color: #ffffff;
  font-size: 14px;
  transition: 0.2s;
}

.phone-number:hover {
  color: #378D93;
}

/* Social media section */
.social-links {
  display: flex;
  margin-bottom: 50px;
}

.social-link {
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transition: 0.3s;
}

.social-link:hover {
  background-color: #378D93;
}

.social-icon {
  width: 30px;
  height: 30px;
}

.footer-links{
  display: flex;
  gap: 20px;
}

.policy-link{
  color: #E0F1F2;
}

/* Media queries */
@media (min-width: 2550px) {
  .footer-component {
    padding: 50px 25% 30px;
  }
}

@media (max-width: 1800px) {
  .footer-component {
    padding: 50px 10% 30px;
  }
}

@media (max-width: 1441px) {
  .footer-component {
    padding: 50px 5% 30px;
  }
}

@media (max-width: 1301px) {
  .footer-component {
    padding: 50px 2.5% 30px;
  }
}

@media (max-width: 961px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }

  .footer-logo-section {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .logo {
    height: 50px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-links {
    margin-top: 15px;
  }
}

@media (max-width: 501px) {
  .footer-component {
    padding: 30px 2.5% 20px;
  }

  .footer-logo {
    width: 128px;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 346px) {
  .footer-logo {
    width: 85px;
  }
}

</style>