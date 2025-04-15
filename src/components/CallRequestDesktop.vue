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
  }
}



</script>

<template>
  <div>
    <div class="form-wrapper-desktop">
      <!-- Заголовок формы -->
      <div class="form-header-block">
        <div class="form-header">
          <span>ЗАКАЗАТЬ ЗВОНОК</span>
        </div>
        <button class="close-btn" @click="$emit('close')">✕</button>
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

          <label for="commentary" class="commentary-label">
            Комментарий
          </label>
          <textarea
              id="commentary"
            v-model="form.comment"
            placeholder="Например: Хочу заказать антимоскитную сетку"
          />
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
  </div>
</template>

<style scoped>

.form-wrapper-desktop {
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 430px;
  max-height: 700px;
  margin: auto;
  background: #002c7b;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  z-index: 999;
  border-radius: 15px;
  padding: 30px;
}

.form-header-block{
  position: relative;
  width: 100%;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  z-index: 9999;
}

.error {
  color: #ffaaaa;
  font-size: 0.8rem;
  margin-top: -6px;
  margin-bottom: 8px;
  margin-left: 25px;
}

.commentary-label{
  margin-left: 20px;
}

.form-header {
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
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
  max-width: 360px;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  margin: auto;
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
</style>