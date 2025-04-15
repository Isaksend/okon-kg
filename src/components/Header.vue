<script setup>
import { ref, computed, onMounted } from 'vue'
import CallRequestDesktop from "./CallRequestDesktop.vue";
import CallRequestMobile from "./CallRequestMobile.vue";

const isOpen = ref(false)
const isDesktop = ref(true)
const isModalOpen = ref(false)

// Проверяем ширину экрана
onMounted(() => {
  isDesktop.value = window.innerWidth > 768
  window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth > 768
  })
})
</script>

<template>
  <div class="header-component">
    <div class="header-info-block">
      <div class="header-logo">
        <div class="logo">
          <picture>
            <source media="(max-width: 461px)" srcset="/assets/logo/mobile_logo.jpg" />
            <img src="/assets/logo/logo.png" class="logo" alt="Okon.kg logo" />
          </picture>
          <div class="logo-name">
            OKON.KG
          </div>
        </div>
        <hr/>
        <div class="logo-text">
          Ремонт окон и
          оконные аксессуары
        </div>
      </div>
      <div class="header-address-block">
        <div class="address-block">
          <div class="address-item">
            Бишкек, Ибраимова 61
          </div>
          <div class="address-item">
            Ош, тц Таатан 1 этаж
          </div>
        </div>
        <div class="city-block">
          <div class="city-item">
            Бишкек
          </div>
          <div class="city-item">
            Ош
          </div>
        </div>
        <div class="number-block">
          <a href="tel:+996702299777" class="number-item">
            +996 702 299 777
          </a>
          <a href="tel:+996500076200"  class="number-item">
            +996 500 076 200
          </a>
        </div>
        <div class="call-btn">
          <div  v-if="isDesktop" class="btn-link" @click="isModalOpen = true">
            Позвоните мне
          </div>
        </div>
        <button class="burger" @click="isOpen = !isOpen">
          <span :class="{ open: isOpen }"></span>
          <span :class="{ open: isOpen }"></span>
          <span :class="{ open: isOpen }"></span>
        </button>
      </div>
    </div>
    <div :class="['header-nav', { open: isOpen }]">
      <nav :class="['nav', { open: isOpen }]">
        <router-link to="/" class="link" active-class="active"  @click="isOpen = false">О компании</router-link>
        <router-link to="/about" class="link" active-class="active"  @click="isOpen = false">Услуги</router-link>
        <router-link to="/about" class="link" active-class="active"  @click="isOpen = false">Аксессуары</router-link>
        <router-link to="/about" class="link" active-class="active"  @click="isOpen = false">Работы</router-link>
        <router-link to="/about" class="link" active-class="active"  @click="isOpen = false">Контакты</router-link>
      </nav>
    </div>
    <div class="forms-block">
      <!-- Модалка на десктопе -->
      <teleport to="body" v-if="isModalOpen && isDesktop">
        <div class="modal-overlay" @click.self="isModalOpen = false">
          <div class="modal-form">
            <CallRequestDesktop @close="isModalOpen = false"/>
          </div>
        </div>
      </teleport>

      <!-- Всегда активная мобильная форма -->
      <div v-if="!isDesktop" class="mobile-form-wrapper">
        <CallRequestMobile />
      </div>
    </div>

  </div>
</template>

<style scoped>
  .header-component{
    background-color: #022279;
    max-width: 100%;
    padding: 30px 16.82% 0;
    color: #ffff;
    overflow-x: hidden;
  }

  .header-info-block{
    display: grid;
    grid-template-columns: 340px 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 40px;
  }

  .header-logo{
    display: flex;
    width: 340px;
    height: 60px;
  }

  .logo{
    display: flex;
    align-items: center;
    font-weight: 600;
  }

  .logo-text{
    width: 180px;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
  }

  .header-address-block{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 1.25rem;
  }

  .number-block a{
    text-decoration: none;
    color: #fff;
    font-weight: 400;
  }

  .number-block .number-item{
    display: flex;
    font-size: 1.25rem;
    font-weight: 500;
  }

  .btn-link{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 50px;
    background-color: #378D93;
    color: #E0F1F2;
    font-size: 16px;
    transition: 300ms;
    cursor: pointer;
  }
  .btn-link:hover{
    background-color: rgba(121, 241, 225, 0.87);
  }

  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
  .link {
    text-decoration: none;
    color: #ffffff;
    cursor: pointer;
    padding: 50px 20px;
    font-weight: 600;
    font-size: 1.5rem;
    transition: 200ms;
  }
  .link.active {
    border-bottom: 3px solid #ffffff;
    border-radius: 4px;
  }

  .burger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .burger span {
    height: 3px;
    background-color: #ffffff;
    border-radius: 2px;
    transition: 0.3s;
  }

  .burger span.open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .burger span.open:nth-child(2) {
    opacity: 0;
  }
  .burger span.open:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .modal-form {
    background-color: #fff;
    border-radius: 16px;
    max-width: 430px;
    max-height: 700px;
    height: 100%;
    width: 100%;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }


  @media (min-width: 2550px) {
    .header-component{
      padding: 30px 25% 0;
    }
  }
  @media (max-width: 1800px) {
    .header-component{
      padding: 30px 10% 0;
    }
  }
  @media (max-width: 1441px) {
    .header-component{
      padding: 30px 5% 0;
    }
    .link{
      padding: 40px;
    }
  }
  @media (max-width: 1301px) {
    .header-component{
      padding: 30px 2.5% 0;
    }
  }
  @media (max-width: 1231px) {
    .header-info-block{
      grid-column-gap: 15px;
    }
    .city-block{
      display: none;
    }
  }

  @media (max-width: 1141px) {
    .header-address-block{
      font-size: 1rem;
    }
    .number-block .number-item{
      font-size: 1rem;
    }

    .link{
      padding: 30px;
      font-size: 1.25rem;
    }
    .btn-link{
      padding: 15px 20px;
    }
  }

  @media (max-width: 961px) {
    .header-logo hr, .header-logo .logo-text{
      display: none;
    }
    .header-component{
      padding: 30px 2.5%;
    }
    .header-logo{
      width: 140px;
    }
    .header-info-block{
      grid-template-columns: 140px 1fr;
    }
    .city-block{
      display: block;
    }
    .burger {
      display: flex;
      z-index: 998;
    }


    .header-nav.open{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #022279;
      transition: 300ms;
    }

    .nav {
      position: relative;
      top: 40px;
      flex-direction: column;
      padding: 1rem;
      width: 250px;
      transition: transform 300ms ease-out;
      z-index: 998;
      margin: auto;
      display: none;
    }
    .nav .link{
      text-align: center;
      align-items: center;
      margin: auto;
    }

    .nav.open {
      display: flex;
    }
    .call-btn{
      display: none;
    }
  }
  @media (max-width: 461px) {
    .header-component{
      padding: 30px 2.5% 75px;
    }
    .header-logo .logo-name{
      display: none;
    }
    .header-logo{
      width: 128px;
      height: auto;
    }
    .header-logo .logo{
      width: 128px;
      height: auto;
    }

    .header-address-block{
      flex-wrap: wrap;
    }
    .burger{
      position: absolute;
      right: 20px;
    }
    .city-block{
      position: absolute;
      left: 20px;
      top: 130px;
    }
    .number-block{
      position: absolute;
      left: 120px;
      top: 130px;
    }
  }
  @media (max-width: 430px) {
    .header-logo .logo{
      width: 100px;
    }
    .header-address-block {
      font-size: .85rem;
    }
    .city-block, .number-block{
      top: 115px;
    }
    .nav .link{
      padding: 20px;
    }
  }
  @media (max-width: 391px) {
    .header-info-block{
      grid-template-columns: 115px 1fr;
      grid-column-gap: 0;
    }
  }

  @media (max-width: 346px) {
    .header-logo{
      width: 85px;
    }
    .header-logo .logo{
      width: 85px;
    }
    .header-info-block {
      grid-template-columns: 90px 1fr;
    }
    .city-block, .number-block{
      top: 105px;
    }
    .burger{
      z-index: 999;
    }
  }
</style>
