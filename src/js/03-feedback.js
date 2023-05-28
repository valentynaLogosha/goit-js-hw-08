// Імпорт бібліотеки throttle з lodash.throttle
import throttle from 'lodash.throttle';

// Визначення константи STORAGE_KEY
const STORAGE_KEY = 'feedback-form-state';

// Вибірка елемента форми
const form = document.querySelector('.feedback-form');

// Додавання прослуховувачів подій до форми
form.addEventListener('input', throttle(handleInputData, 500));
form.addEventListener('submit', handleFormSubmit);

// Ініціалізація змінної з даними форми з локального сховища або пустим об'єктом
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// Розпакування елементів форми email і message
const { email, message } = form.elements;

// Виклик ф-ї для відновлення значень полів форми
reloadForm();

// Ф-я обробляє подію input і зберігає дані форми в локальному сховищі
function handleInputData(event) {
  formData = { email: email.value, message: message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
// Ф-я обробляє подію input і зберігає дані форми в локальному сховищі
function reloadForm() {
  if (formData) {
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}
// Ф-я обробляє подання форми і виконує необхідні дії
function handleFormSubmit(event) {
  event.preventDefault();
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert(`Будь ласка, заповніть всі обов'язкові поля.`);
  }

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  formData = {};
}