<template>
  <div>
    <!-- Форма -->
    <transition name="slide-up">
      <div
          v-if="isOpen"
          class="form-wrapper"
          @touchstart="startTouch"
          @touchend="endTouch"
      >
        <!-- Заголовок формы -->
        <div class="form-header" @click="toggleForm">
          <svg
              class="arrow"
              :class="{ open: isOpen }"
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
          >
            <polyline points="4 15 12 7 20 15" />
          </svg>
          <span>ЗАКАЗАТЬ ЗВОНОК</span>
        </div>

        <!-- Контент формы -->
        <div class="form-content">
          <p class="subtitle">У Вас Есть Проблема? Давайте Решим Их</p>
          <input
              v-mask="'+996 ### ### ###'"
              v-model="form.phone"
              placeholder="+996 ___ ___ ___"
          />
          <span class="error">{{ errors.phone }}</span>
          <input
              type="text"
              v-model="form.name"
              placeholder="Как вас зовут?"
          />
          <span class="error">{{ errors.name }}</span>

          <input
              type="text"
              v-model="form.city"
              placeholder="Ваш город"
          />
          <span class="error">{{ errors.city }}</span>

          <label>
            Комментарий
            <textarea
                v-model="form.comment"
                placeholder="Например: Хочу заказать антимоскитную сетку"
            />
          </label>
          <div class="center-btn">
            <button class="submit-btn" @click="submitForm">Отправить</button>
          </div>
          <div class="number-content">
            <div class="number-content-item">
              <div class="number-city">
                Бишкек
              </div>
              <p class="phone">+996 702 299 777</p>
            </div>
            <div class="number-content-item">
              <div class="number-city">
                Ош
              </div>
              <p class="phone">+996 500 076 200</p>
            </div>
          </div>
          <div class="socials">
            <a href="#">Whatsapp</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </transition>

    <!-- Кнопка снизу при закрытой форме -->
    <div
        v-if="!isOpen"
        class="call-btn"
        @click="toggleForm"
        @touchstart="startTouch"
        @touchend="endTouch"
    >
      <svg
          class="arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
      >
        <polyline points="6 15 12 9 18 15" />
      </svg>
      <span>ЗАКАЗАТЬ ЗВОНОК</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  phone: '',
  city: '',
  comment: '',
})

const errors = ref({
  name: '',
  phone: '',
  city: '',
})

const validate = () => {
  let valid = true
  errors.value = { name: '', phone: '', city: '' }

  if (!form.value.name.trim()) {
    errors.value.name = 'Укажите имя'
    valid = false
  }

  const phoneRegex = /^\+996\s?\d{3}\s?\d{3}\s?\d{3}$/
  if (!phoneRegex.test(form.value.phone.trim())) {
    errors.value.phone = 'Введите номер в формате +996 XXX XXX XXX'
    valid = false
  }

  if (!form.value.city.trim()) {
    errors.value.city = 'Укажите город'
    valid = false
  }

  return valid
}

const submitForm = () => {
  if (validate()) {
    alert('Форма отправлена ✅')
    // тут можно отправить данные на сервер
  }
}




const isOpen = ref(false)
const toggleForm = () => {
  isOpen.value = !isOpen.value
}

let touchStartY = 0
const startTouch = (e) => {
  touchStartY = e.changedTouches[0].clientY
}
const endTouch = (e) => {
  const touchEndY = e.changedTouches[0].clientY
  const diff = touchEndY - touchStartY
  if (diff > 50 && isOpen.value) {
    isOpen.value = false
  } else if (diff < -50 && !isOpen.value) {
    isOpen.value = true
  }
}
</script>

<style scoped>
.call-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #002c7b;
  color: white;
  text-align: center;
  padding: 12px 0;
  font-weight: bold;
  cursor: pointer;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 999;
}

.arrow {
  width: 60px;
  height: auto;
  transition: transform 0.3s ease;
  margin: 0 auto 4px;
  display: block;
}
.arrow.open {
  transform: rotate(180deg);
}

.error {
  color: #ffaaaa;
  font-size: 0.8rem;
  margin-top: -6px;
  margin-bottom: 8px;
}


.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.form-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #002c7b;
  color: white;
  padding: 1rem 1rem 2rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  z-index: 999;
}

.form-header {
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
}

.arrow {
  margin-bottom: 4px;
}

.title-text {
  font-size: 1.1rem;
  font-weight: bold;
}

.form-header svg {
  margin-bottom: 5px;
}
.form-header span {
  display: block;
  font-size: 1.1rem;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  max-width: 430px;
}

.subtitle {
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.4rem;
}

input,
textarea {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
}

textarea {
  height: 100px;
  resize: none;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  gap: 0.3rem;
}

.center-btn {
  text-align: center;
}

.submit-btn {
  background-color: #4ba89a;
  color: white;
  padding: 0.6rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1rem;
  transition: background 0.2s ease;
}
.submit-btn:hover {
  background-color: #3e9689;
}

.number-content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
}

.phone {
  text-align: center;
  font-weight: bold;
  margin-top: 0.5rem;
  font-size: 1rem;
}

.socials {
  display: flex;
  justify-content: space-around;
  font-size: 1.25rem;
  margin-top: 0.3rem;
}

.socials a{
  font-weight: 500;
}

a {
  color: #ffffff;
  text-decoration: underline;
}

@media (min-width: 960px) {
  .call-btn,
  .form-wrapper {
    display: none;
  }
}

@media (max-width: 461px) {
  .form-content{
    max-width: 360px;
  }
  .form-content input,textarea{
    width: auto;
    max-width: 100%;
  }
}

@media (max-width: 430px) {
  .form-content{
    max-width: 330px;
  }
}
</style>
