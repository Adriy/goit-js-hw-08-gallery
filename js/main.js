import gallery from './gallery-items.js';

import refs from '../referensec/refs.js';

const { list, modal, lightBoxImage, modalCloseBtn } = refs;

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

function addSrcAlt(src, alt) {
  return;
}

//open modal
list.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    modal.classList.add('is-open');
    addSrcAlt(
      (lightBoxImage.src = e.target.dataset.source),
      (lightBoxImage.alt = e.target.alt),
    );

    e.preventDefault();
  }
});

function hideModal(element) {
  modal.classList.remove('is-open');
  addSrcAlt();
}

//closing modal
modal.addEventListener('click', e => {
  if (e.target.classList.contains('lightbox__overlay')) {
    hideModal(modal);
  }
});

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    hideModal(modal);
  }
});

modalCloseBtn.addEventListener('click', () => {
  hideModal(modal);
});
