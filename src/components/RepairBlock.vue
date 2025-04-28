<script setup>
</script>

<template>
  <div class="repair-block">
    <div class="repair-header">
      <div class="repair-title">
        Ремонт
      </div>
    </div>

    <div class="repair-contain">
      <!-- repair item 1 -->
      <div class="repair-item" style="background-image: url('/assets/background/repair_item_1.png');">
        <div class="repair-item-overlay">
          <div class="repair-item-text">
            Ремонт пластиковых окон
          </div>
          <div class="repair-link-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- repair item 2 -->
      <div class="repair-item" style="background-image: url('/assets/background/repair_item_2.png');">
        <div class="repair-item-overlay">
          <div class="repair-item-text">
            Ремонт алюминиевых окон
          </div>
          <div class="repair-link-btn">
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
.repair-block {
  width: 100%;
  max-width: 1200px;
  padding: 3rem 2rem;
  margin: 0 auto;
}

.repair-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.repair-title {
  font-size: 2.25rem;
  font-weight: 600;
  text-align: center;
}

.repair-contain {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.repair-item {
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  transition: all 200ms;
}

.repair-item:hover {
  margin-top: -10px!important;
}

.repair-item:hover .repair-link-btn {
  background-color: rgba(255, 255, 255, 0.4);
}

.repair-item-overlay {
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

.repair-item-text {
  font-size: 1.5rem;
  font-weight: 500;
}

.repair-link-btn {
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

.repair-link-btn svg{
  rotate: -45deg;
  width: 30px;
  height: 30px;
}

@media (max-width: 1441px) {
  .repair-block{
    max-width: 1000px !important;
    padding: 3rem 0;

  }
  .repair-item {
    height: 250px;
  }
  .repair-item-text{
    font-size: 1.25rem;
  }
}

@media (max-width: 1101px) {
  .repair-block{
    max-width: 900px !important;
  }
  .repair-item{
    height: 220px !important;
  }
  .repair-item-text{
    font-size: 1.15rem;
  }
}



@media (max-width: 768px) {
  .repair-contain {
    grid-template-columns: 100%;
    padding: 10px 5%;
  }

  .repair-header {
    flex-direction: column;
    gap: 1rem;
  }

  .repair-title{
    font-size: 1.5rem;
  }

  .repair-block {
    padding: 2rem 0;
    max-width: 100%;
  }
  .repair-item-text{
    font-size: 1.5rem;
  }
  .repair-link-btn{
    min-width: 45px;
  }
}
</style>