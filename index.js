class BookRoulette {
    constructor(searchButton) {
        this.searchButton = searchButton;
        this.searchButton.addEventListener('click', this.getRandBookInfo);
    }

    getRandBookInfo = () => {
        const selectedType = document.querySelector('input[name="subject"]:checked').value;
        const offset = Math.floor((Math.random() * 200));

        axios.get(`https://openlibrary.org/subjects/${selectedType}.json?limit=10&offset=${offset}`)
        .then((response) => {
            const books = response.data.works;
            const idx = Math.floor((Math.random() * 10));
            const bookKey = books[idx].key;
            this.cover_id = books[idx].cover_id
            this.author = books[idx].authors.map((author) => ` ${author.name}`)
            return axios.get(`https://openlibrary.org${bookKey}.json`);
        })
        .then((response) => {
            const title = document.querySelector('#title');
            const author = document.querySelector('#author');
            const description = document.querySelector('#description');
            const cover = document.querySelector('#cover');
            cover.src = `https://covers.openlibrary.org/b/id/${this.cover_id}-L.jpg`

            title.innerHTML = `"${response.data.title}"`;
            author.innerHTML = `By ${this.author}`;

            if (!response.data.description) {
                description.innerHTML = "Sorry, no description available!";
            }
            else if (response.data.description.value) {
                description.innerHTML = response.data.description.value;
            }
            else {
                description.innerHTML = response.data.description;
            }
        })
    } 
    }

const searchButton = document.querySelector('#search');
const bookRoulette = new BookRoulette(searchButton)
