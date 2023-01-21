import { galleryItems } from "./gallery-items.js";

// знаходження галереї на сторінці
const gallery = document.querySelector(".gallery");

// створення пустого масиву для додавання елементів
const items = [];

// перебирання масиву об'єктів з файлу './gallery-items.js'
galleryItems.forEach((element) => {
  
  // створення контейнера div
  const galleryItem = document.createElement("div");
  galleryItem.classList.add("gallery__item"); // додавання класу до тега

  // створення посилання a
  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery__link"); // додавання класу до тега

  // додавання поточного посилання з властивості об'єкта './gallery-items.js'
  galleryLink.href = element.original; // присвоєння посилання

  // створення зображення
  const galleryImg = document.createElement("img");
  galleryImg.classList.add("gallery__image"); // додавання класу до тега

  // додавання малого зображення з властивості об'єкта './gallery-items.js'
  galleryImg.src = element.preview; // присвоєння малого зображення

  // додавання атрибуту data-source з властивості об'єкта './gallery-items.js'
  galleryImg.setAttribute("data-source", element.original);

  // додавання alt з властивості об'єкта './gallery-items.js'
  galleryImg.alt = element.description; // присвоєння тексту для атрибуту alt

  galleryItem.append(galleryLink); // вставлення посилання в контейнер div
  galleryLink.append(galleryImg); // вставлення зображення в посилання
  items.push(galleryItem); // додавання створеного елементу в масив
});

// додавання створених елементів до галереї через розпилення
gallery.append(...items);

// додавання слухача подій до галереї
gallery.addEventListener("click", (e) => {

  // Відміна поведінки за замовчуванням,
  // користувач не буде перенаправлений на нову сторінку.
  e.preventDefault();

  // перевірка чи клік був на зображенні
  if (e.target.nodeName !== "IMG") {
    return;
  }

  // збереження об'єкта події з атрибутом в змінну
  const imgSelected = e.target.getAttribute("data-source");

  // створення шаблону випадаючого зображення
  const template = basicLightbox.create(`
    <img src="${imgSelected}" width="800" height="600">
    `);

  // показ шаблону зображення
  template.show();

  // додавання слухача подій для клавіши
  gallery.addEventListener("keydown", (e) => {

    // перевірка для клавіші Escape
    if (e.key === "Escape") {
      template.close();
    }
  });
});

// Діма Берестень