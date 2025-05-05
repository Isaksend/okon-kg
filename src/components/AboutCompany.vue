<script setup>

import VideoGallery from "./VideoGallery.vue";
</script>

<template>
  <div class="company-info-block">
    <div class="company-soc-links">
      <div class="soc-link-list">
        <div class="social-icons">
          <a href="https://www.instagram.com/okon.kg/" class="social-link">
            <img loading="lazy" src="/assets/icons/Instagram.svg" alt="Follow us on Instagram" width="40" height="40">
          </a>
          <a href="https://www.tiktok.com/@okonkg" class="social-link">
            <img loading="lazy" src="/assets/icons/TikTok.svg" alt="Follow us on TikTok" width="40" height="40">
          </a>
          <a href="https://api.whatsapp.com/send?phone=996500074222" class="social-link">
            <img loading="lazy" src="/assets/icons/WhatsApp.svg" alt="Contact us on WhatsApp" width="40" height="40">
          </a>
        </div>
      </div>
    </div>
    <div class="company-large-logo">
      <img loading="lazy" class="large-logo" src="/assets/logo/LargeLogo.png" alt="Follow us on Logo" />
    </div>
    <VideoGallery/>
    <div class="title-block">
      <div class="title-name">
        OKON.KG
      </div>
      <div class="title-text">
        <span class="coloredBlue">Okon.kg</span> предоставляет полный спектр услуг по установке окон и аксессуаров, включая москитные сети и жалюзи. С момента нашего основания в 2019, мы стремимся обеспечить максимальный <span class="coloredBlue">комфорт и эстетику</span>  в каждый дом и офис. Наша команда профессионалов гарантирует <span class="coloredBlue">качество и надежность </span> каждому клиенту.
      </div>
      <div class="title-sign-text">
        Нам доверяют тысячи кыргызстанцев!
      </div>
    </div>

  </div>
</template>

<style scoped>

.company-soc-links{
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

.social-icons {
  display: flex;
  gap: 16px; /* Space between icons */
}

.social-link {
  display: inline-block;
  transition: transform 0.2s ease;
}

.social-link:hover {
  transform: scale(1.1); /* Slight grow effect on hover */
}

/* You can add different hover colors for each platform */
.social-link:hover img[src*="instagram"] {
  filter: none; /* Shows original Instagram colors on hover */
}

.company-large-logo{
  display: flex;
  justify-content: center;
}


.title-block{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  max-width: 800px;
  margin: 3rem auto;
}

.title-name{
  font-size: 3rem;
  text-align: center;
  font-weight: bold;
}

.title-text{
  font-size: 2rem;
  font-weight: 500;
  margin-top: 2rem;
}

.coloredBlue{
  color: #0081DF;
}

.title-sign-text{
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 2rem;
}

@media screen and (max-width: 801px) {
  .title-block{
    max-width: 600px;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
@media screen and (max-width: 501px) {
  .title-block{
    max-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .title-text{
    font-size: 1rem;
    font-weight: 500;
  }
  .title-name{
    font-size: 2rem;
  }
}

</style>