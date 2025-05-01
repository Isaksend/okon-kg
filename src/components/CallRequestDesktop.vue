<script setup>
import {ref, onMounted} from 'vue'

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

const isSubmitting = ref(false)
const formStatus = ref(null)

// UTM параметры
const utmParams = ref({})

// Получение UTM параметров из URL
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const params = {}

  for (const [key, value] of urlParams.entries()) {
    if (key.startsWith('utm_')) {
      params[key] = value
    }
  }

  // Также сохраняем реферер
  if (document.referrer) {
    params.referrer = document.referrer
  }

  utmParams.value = params
})

const validate = () => {
  let valid = true
  errors.value = {name: '', phone: '', city: ''}

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

const submitForm = async () => {
  if (!validate()) return

  isSubmitting.value = true
  formStatus.value = null

  try {
    // Подготовка данных для отправки
    const leadData = {
      name: form.value.name,
      phone: form.value.phone.replace(/\s/g, ''), // Убираем пробелы из номера
      city: form.value.city,
      comment: form.value.comment || '',
      source: 'website',
      form_type: 'desktop',
      created_at: new Date().toISOString(),
      utm: utmParams.value
    }

    // Отправка данных на сервер
    const response = await fetch('/api/amocrm/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    })

    const result = await response.json()

    if (result.success) {
      // Успешная отправка
      formStatus.value = {
        type: 'success',
        message: 'Ваша заявка принята! Мы свяжемся с вами в ближайшее время.'
      }

      // Очистка формы
      form.value = {
        name: '',
        phone: '',
        city: '',
        comment: ''
      }

      // Отслеживание конверсии (если настроена аналитика)
      if (window.gtag) {
        window.gtag('event', 'form_submission', {
          'event_category': 'forms',
          'event_label': 'callback_form'
        })
      }

      if (window.ym) {
        window.ym(XXXXXX, 'reachGoal', 'form_submission')
      }
    } else {
      throw new Error(result.message || 'Ошибка при отправке формы')
    }
  } catch (error) {
    console.error('Ошибка при отправке формы:', error)

    formStatus.value = {
      type: 'error',
      message: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
    }
  } finally {
    isSubmitting.value = false
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
            :disabled="isSubmitting"
        />
        <span class="error">{{ errors.phone }}</span>

        <input
            type="text"
            v-model="form.name"
            placeholder="Как вас зовут?"
            :disabled="isSubmitting"
        />
        <span class="error">{{ errors.name }}</span>

        <input
            type="text"
            v-model="form.city"
            placeholder="Ваш город"
            :disabled="isSubmitting"
        />
        <span class="error">{{ errors.city }}</span>

        <label for="commentary" class="commentary-label">
          Комментарий
        </label>
        <textarea
            id="commentary"
            v-model="form.comment"
            placeholder="Например: Хочу заказать антимоскитную сетку"
            :disabled="isSubmitting"
        />

        <!-- Сообщение о статусе отправки формы -->
        <div v-if="formStatus" :class="['status-message', formStatus.type]">
          {{ formStatus.message }}
        </div>

        <div class="center-btn">
          <button
              class="submit-btn"
              @click="submitForm"
              :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
          </button>
        </div>

        <div class="number-content">
          <div class="number-content-item">
            <div class="number-city">
              Бишкек
            </div>
            <a href="tel:+996500074222" class="phone">+996 500 074 222</a>
          </div>
          <div class="number-content-item">
            <div class="number-city">
              Ош
            </div>
            <a href="tel:+996500076200" class="phone">+996 500 076 200</a>
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

.form-header-block {
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
  color: white;
}

.error {
  color: #ffaaaa;
  font-size: 0.8rem;
  margin-top: -6px;
  margin-bottom: 8px;
  margin-left: 25px;
}

.commentary-label {
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

.submit-btn:disabled {
  background-color: #9fcec8;
  cursor: not-allowed;
}

.number-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
}

.phone {
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
  padding-top: 1rem;
  font-size: 1rem;
}

.socials {
  display: flex;
  justify-content: space-around;
  font-size: 1.25rem;
  margin-top: 0.3rem;
}

.socials a {
  font-weight: 500;
}

a {
  color: #ffffff;
  text-decoration: underline;
}

/* Добавляем стили для сообщения о статусе */
.status-message {
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-size: 0.9rem;
  max-width: 360px;
  width: 100%;
  margin: 5px auto;
}

.status-message.success {
  background-color: rgba(75, 168, 154, 0.2);
  border: 1px solid #4ba89a;
}

.status-message.error {
  background-color: rgba(255, 100, 100, 0.2);
  border: 1px solid #ff6464;
}
</style>