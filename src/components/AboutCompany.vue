<script setup>

import VideoGallery from "./VideoGallery.vue";
</script>

<template>
  <div class="company-info-block">
    <div class="company-soc-links">
      <div class="soc-link-list">
        <div class="social-icons">
          <a href="https://instagram.com/your-account" class="social-link">
            <img src="/assets/icons/Instagram.svg" alt="Follow us on Instagram" width="40" height="40">
          </a>
          <a href="https://tiktok.com/@your-account" class="social-link">
            <img src="/assets/icons/TikTok.svg" alt="Follow us on TikTok" width="40" height="40">
          </a>
          <a href="https://wa.me/your-number" class="social-link">
            <img src="/assets/icons/WhatsApp.svg" alt="Contact us on WhatsApp" width="40" height="40">
          </a>
        </div>
      </div>
    </div>
    <div class="company-large-logo">
      <img class="large-logo" src="/assets/logo/LargeLogo.png" alt="Follow us on Logo" />
    </div>
    <VideoGallery/>
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
</style>