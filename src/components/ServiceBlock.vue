<script setup>
</script>

<template>
  <div class="service-block">
    <div class="service-header">
      <div class="service-title">
        Наши услуги
      </div>
      <div class="view-all">
        <span>СМОТРЕТЬ ВСЕ</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </div>

    <div class="service-contain">
      <!-- Service item 1 -->
      <div class="service-item" style="background-image: url('/assets/background/service_item_1.png');">
        <div class="service-item-overlay">
          <div class="service-item-text">
            Москитные сетки (внутрении)
          </div>
          <div class="service-link-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- Service item 2 -->
      <div class="service-item" style="background-image: url('/assets/background/service_item_2.png');">
        <div class="service-item-overlay">
          <div class="service-item-text">
            Раздвижные москитные сетки плиссе
          </div>
          <div class="service-link-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- Service item 3 -->
      <div class="service-item" style="background-image: url('/assets/background/service_item_3.png');">
        <div class="service-item-overlay">
          <div class="service-item-text">
            Устранение продувания
          </div>
          <div class="service-link-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- Service item 4 -->
      <div class="service-item" style="background-image: url('/assets/background/service_item_4.png');">
        <div class="service-item-overlay">
          <div class="service-item-text">
            Замена стеклопакета
          </div>
          <div class="service-link-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>
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
  margin-top: -10px!important;
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

.service-link-btn svg{
  rotate: -45deg;
  width: 30px;
  height: 30px;
}

@media (max-width: 1441px) {
  .service-block{
    max-width: 1000px !important;
    padding: 3rem 0;

  }
  .service-item {
    height: 250px;
  }
  .service-item-text{
    font-size: 1.25rem;
  }
}

@media (max-width: 1101px) {
  .service-block{
    max-width: 900px !important;
  }
  .service-item{
    height: 220px !important;
  }
  .service-item-text{
    font-size: 1.15rem;
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
  .service-item-text{
    font-size: 1.5rem;
  }
  .service-link-btn{
    min-width: 45px;
  }
}
</style>