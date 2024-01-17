import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

const apiKey = '41862655-84ddc1d5da0620d7ed5964b7a';

const loader1 = document.querySelector('.loader');
loader1.style.display = 'none';

const getImg = async (query) => {
    loader1.style.display = 'block';
    try {
        const result = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`);
        if (!result.ok) {
            throw new Error(result.status);
        }
        return await result.json();
    } finally {
        loader1.style.display = 'none';
    }
};

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');

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
                        <li class="list-item"><h3>likes</h3><span>${hit.likes}</span></li>
                        <li class="list-item"><h3>views</h3><span>${hit.views}</span></li>
                        <li class="list-item"><h3>comments</h3><span>${hit.comments}</span></li>
                        <li class="list-item"><h3>downloads</h3><span>${hit.downloads}</span></li>
                    </ul>
                </a>
            </li>`
            }).join("");

            gallery.insertAdjacentHTML(`beforeend`, markup);
            lightbox.refresh();
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

const options = {
    captionsData: "title",
    captionDelay: 250
  }

const lightbox = new SimpleLightbox('.gallery a', options);

