// /Імпортуємо функцію throttle з бібліотеки Lodash і клас Player з пакету @vimeo/player./ 
import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

// // Визначаємо константу, яка вик.як ключ для збереження часу відтворення в localStorage
const videoCurrentTimeKey = 'videoplayer-current-time';

// посилання на HTML-елемент <iframe>, що  представляє відеоплеєр Vimeo
const vimeoIframe = document.querySelector('#vimeo-player');

// Створюємо новий об'єкт за допомогою класу Player і передаємо йому отриманий <iframe>
const vimeoPlayer = new Player(vimeoIframe);

// // створюємо  ф-ю, яка викликається при події 'timeupdate'
//  і зберігає поточний час відтворення в localStorage під ключем videoCurrentTimeKey
const onTimeUpdate = function (event) {
  localStorage.setItem(videoCurrentTimeKey, event.seconds);
};
// Використовуємо ф-ю throttle для обмеження частоти викликів функції onTimeUpdate.
// ф-я onTimeUpdate буде викликатись не частіше ніж раз на 1 секунду під час події 'timeupdate'
vimeoPlayer.on('timeupdate', throttle(onTimeUpdate, 1000));


// Вст. поточний час відтворення відео, використовуючи значення, збережене в localStorage під ключем videoCurrentTimeKey. 
// Якщо значення не знайдено, встановлюємо час відтворення на 0.
vimeoPlayer.setCurrentTime(JSON.parse(localStorage.getItem(videoCurrentTimeKey)) || 0);