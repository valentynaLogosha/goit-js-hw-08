// Імпорт бібліотеки throttle з lodash.throttle
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(handleInputData, 500));
form.addEventListener('submit', handleFormSubmit);

let formData = {};
reloadForm();

function handleInputData(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function reloadForm() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    formData = JSON.parse(data);
    Object.entries(formData).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log(formData);

  // if (email.value === '' || message.value === '') {
  //   return alert(`Будь ласка, заповніть всі обов'язкові поля.`);
  // }

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  formData = {};
}
 
