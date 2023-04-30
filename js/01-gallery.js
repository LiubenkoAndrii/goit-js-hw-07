import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}"/>
          </a>
        </li>
      `;
    })
    .join("");
}

galleryRef.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  const { target } = event;

  if (target.nodeName !== "IMG") {
    return;
  }

  const largeImageURL = target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
`);

  instance.show();

  document.addEventListener("keydown", onEscapePress);

  function onEscapePress(event) {
    if (event.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onEscapePress);
    }
  }
}

console.log(galleryItems);