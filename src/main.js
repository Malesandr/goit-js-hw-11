import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

const apiKey = '41862655-84ddc1d5da0620d7ed5964b7a';

const loader = document.querySelector('.loader');
loader.style.display = 'none';


const getImg = async (param) => {
    loader.style.display = 'block';
    try {
        const result = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(param)}&image_type=photo&orientation=horizontal&safesearch=true`);
        if (!result.ok) {
            throw new Error(result.status);
        }
        return await result.json();
    } finally {
        loader.style.display = 'none';
    }
};


const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');

const options = {
    captionsData: "title",
    captionDelay: 250
  }

const lightbox = new SimpleLightbox('.gallery a', options);


form.addEventListener('submit', (err) => {
    err.preventDefault();
    const searchQuery = err.currentTarget.elements.query.value.trim();
    getImg(searchQuery)
        .then((result) => {
            if (result.hits.length === 0) {
                gallery.innerHTML = "";
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    messageColor: '#fff',
                    backgroundColor: '#EF4040',
                    position: 'topRight'
                });
                return;
            }

            gallery.innerHTML = "";
            const markup = result.hits.map((hit) => {
                return `<li class="gallery-item">
                <a class="gallery-link" href="${hit.largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${hit.webformatURL}"
                        alt="${hit.tags}"
                    />
                    <ul class="list">
                        <li><p class='list-item'>💗Likes<span>${hit.likes}</span></p></li>
                        <li><p class='list-item'>👁️Views<span>${hit.views}</span></p></li>
                        <li><p class='list-item'>💬Comments<span>${hit.comments}</span></p></li>
                        <li><p class='list-item'>💌Downloads<span>${hit.downloads}</span></p></li>
                    </ul>
                </a>
            </li>`
            }).join("");

            gallery.insertAdjacentHTML(`beforeend`, markup);
            lightbox.refresh();
            form.reset();
        })

        .catch(error => {
            console.error('Error fetching images:', error);
            iziToast.error({
              message: 'Failed to fetch images. Please try again later.',
              messageColor: '#fff',
              backgroundColor: '#EF4040',
              position: 'topRight'
            });
          });
    
});
