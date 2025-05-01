<template>
  <div class="contact-page-container">
    <h1 class="contact-page-title">Контактная информация</h1>

    <!-- Desktop Version -->
    <div class="contact-page-desktop" v-if="!isMobile">
      <div class="contact-content">
        <!-- Contact Information Section -->
        <div class="contact-info">
          <h2>Наши контакты</h2>

          <div class="city-contacts-container">
            <!-- Bishkek Contact Information -->
            <div class="city-contact-card bishkek">
              <div class="city-name">
                <i class="city-icon">🏙️</i>
                <h3>Бишкек</h3>
              </div>
              <div class="info-item">
                <p class="info-label">Адрес:</p>
                <p class="info-value">Ибраимова 61</p>
              </div>
              <div class="info-item">
                <p class="info-label">Телефон:</p>
                <p class="info-value phone-number">+996 500 074 222</p>
              </div>
            </div>

            <!-- Osh Contact Information -->
            <div class="city-contact-card osh">
              <div class="city-name">
                <i class="city-icon">🏔️</i>
                <h3>Ош</h3>
              </div>
              <div class="info-item">
                <p class="info-label">Адрес:</p>
                <p class="info-value">ТЦ Таатан 1 этаж</p>
              </div>
              <div class="info-item">
                <p class="info-label">Телефон:</p>
                <p class="info-value phone-number">+996 500 076 200</p>
              </div>
            </div>
          </div>

          <!-- Working Hours Section -->
          <div class="working-hours">
            <div class="hours-title">
              <i class="hours-icon">🕒</i>
              <h3>Режим работы</h3>
            </div>
            <div class="hours-grid">
              <div class="day">Пн-Пт:</div>
              <div class="time">9:00 - 18:00</div>
              <div class="day">Сб:</div>
              <div class="time">10:00 - 15:00</div>
              <div class="day">Вс:</div>
              <div class="time">Выходной</div>
            </div>
          </div>
        </div>

        <!-- Google Maps Section -->
        <div class="map-container">
          <h2>Как нас найти</h2>
          <div class="google-map">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d899.5227691406311!2d74.6172384!3d42.8694056!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb728d6e322e5%3A0xecbd197558c5625a!2sOKON.KG!5e1!3m2!1sru!2skz!4v1746034008102!5m2!1sru!2skz"
                width="100%"
                height="400"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Version - Two Column City Cards and Google Map -->
    <div class="contact-page-mobile" v-else>
      <!-- Contact Info Section -->
      <div class="mobile-section">
        <h2>Наши контакты</h2>

        <!-- Mobile City Cards -->
        <div class="mobile-city-cards">
          <!-- Bishkek Mobile Card -->
          <div class="mobile-city-card bishkek">
            <div class="city-name">
              <i class="city-icon">🏙️</i>
              <h3>Бишкек</h3>
            </div>
            <div class="info-item">
              <p class="info-label">Адрес:</p>
              <p class="info-value">Ибраимова 61</p>
            </div>
            <div class="info-item">
              <p class="info-label">Телефон:</p>
              <p class="info-value phone-number">+996 500 074 222</p>
            </div>
          </div>

          <!-- Osh Mobile Card -->
          <div class="mobile-city-card osh">
            <div class="city-name">
              <i class="city-icon">🏔️</i>
              <h3>Ош</h3>
            </div>
            <div class="info-item">
              <p class="info-label">Адрес:</p>
              <p class="info-value">ТЦ Таатан 1 этаж</p>
            </div>
            <div class="info-item">
              <p class="info-label">Телефон:</p>
              <p class="info-value phone-number">+996 500 076 200</p>
            </div>
          </div>
        </div>

        <!-- Working Hours Mobile -->
        <div class="mobile-working-hours">
          <div class="hours-title">
            <i class="hours-icon">🕒</i>
            <h3>Режим работы</h3>
          </div>
          <div class="hours-list">
            <p>Пн-Пт: 9:00 - 18:00</p>
            <p>Сб: 10:00 - 15:00</p>
            <p>Вс: Выходной</p>
          </div>
        </div>
      </div>

      <!-- Google Maps Section -->
      <div class="mobile-section">
        <h2>Как нас найти</h2>
        <div class="google-map">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d899.5227691406311!2d74.6172384!3d42.8694056!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb728d6e322e5%3A0xecbd197558c5625a!2sOKON.KG!5e1!3m2!1sru!2skz!4v1746034008102!5m2!1sru!2skz"
              width="100%"
              height="300"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// State
const isMobile = ref(false);

// Methods
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

<style scoped>
.contact-page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: Arial, sans-serif;
}

.contact-page-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: #003399;
  font-weight: bold;
}

/* Desktop Styles */
.contact-page-desktop {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.contact-info {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.contact-info h2 {
  margin-bottom: 30px;
  color: #003399;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  position: relative;
}

.contact-info h2:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #003399;
}

/* City Contact Cards */
.city-contacts-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
}

.city-contact-card {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.city-contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.city-contact-card.bishkek {
  background-color: #e6f0ff;
  border-left: 5px solid #003399;
}

.city-contact-card.osh {
  background-color: #fff0e6;
  border-left: 5px solid #ff6600;
}

.city-name {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.city-icon {
  font-style: normal;
  font-size: 24px;
  margin-right: 10px;
}

.city-name h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.bishkek .city-name h3 {
  color: #003399;
}

.osh .city-name h3 {
  color: #ff6600;
}

.info-item {
  margin-bottom: 15px;
}

.info-label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
}

.info-value {
  font-size: 15px;
  line-height: 1.5;
}

.phone-number {
  font-weight: 600;
  font-size: 16px;
}

.bishkek .phone-number {
  color: #003399;
}

.osh .phone-number {
  color: #ff6600;
}

/* Working Hours Section */
.working-hours {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.hours-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.hours-icon {
  font-style: normal;
  font-size: 20px;
  margin-right: 10px;
}

.hours-title h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.hours-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
}

.day {
  font-weight: 600;
  color: #555;
}

.time {
  color: #003399;
}

/* Google Maps Section */
.map-container {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}

.map-container h2 {
  margin-bottom: 20px;
  color: #003399;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  position: relative;
}

.map-container h2:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background-color: #003399;
}

.google-map {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.google-map iframe {
  border-radius: 8px;
}

/* Mobile Styles */
.contact-page-mobile {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mobile-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.mobile-section h2 {
  margin-bottom: 25px;
  color: #003399;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  position: relative;
}

.mobile-section h2:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background-color: #003399;
}

/* Mobile City Cards */
.mobile-city-cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.mobile-city-card {
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.mobile-city-card.bishkek {
  background-color: #e6f0ff;
  border-left: 4px solid #003399;
}

.mobile-city-card.osh {
  background-color: #fff0e6;
  border-left: 4px solid #ff6600;
}

/* Mobile Working Hours */
.mobile-working-hours {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.hours-list {
  margin-top: 10px;
}

.hours-list p {
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .city-contacts-container {
    flex-direction: column;
  }

  .contact-page-title {
    font-size: 24px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .mobile-city-cards {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .mobile-city-card {
    flex: 1 1 45%;
  }
}
</style>