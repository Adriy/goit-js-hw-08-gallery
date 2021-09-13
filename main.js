import gallery from './gallery-items.js';

import refs from './referensec/refs.js';

const { list, modal, lightBoxImage, modalCloseBtn, modalCloseOverlay } = refs;

function createItems(array) {
  return array
    .map(elem => {
      const { preview, original, description } = elem;
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}
const markup = createItems(gallery);

list.insertAdjacentHTML('afterbegin', markup);

//open

list.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    modal.classList.add('is-open');

    lightBoxImage.src = e.target.dataset.source;
    lightBoxImage.alt = e.target.alt;
    e.preventDefault();
  }
});

//close
modal.addEventListener('click', e => {
  if (e.target.classList.contains('lightbox__overlay')) {
    modal.classList.remove('is-open');
  }
});

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    modal.classList.remove('is-open');
  }
});

modalCloseBtn.addEventListener('click', () => {
  modal.classList.remove('is-open');
});
