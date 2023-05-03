const btn = document.querySelector('#clicker');

btn.addEventListener('click', getRandBookInfo);

function getRandBookInfo() {
    const selectedType = document.querySelector("input[type='radio'][name=subject]:checked").value;
    const offset = Math.floor((Math.random() * 200));
    axios.get(`https://openlibrary.org/subjects/${selectedType}.json?limit=10&offset=${offset}`)
    .then((response) => {
        const books = response.data.works;
        const idx = Math.floor((Math.random() * 10));
        const bookKey = books[idx].key;
        const authorBox = document.querySelector('h3');
        authorBox.innerHTML = `${books[idx].authors[0].name}`;
        return axios.get(`https://openlibrary.org${bookKey}.json`);
    })
    .then((response) => {
        const textBox = document.querySelector('h1');
        const descriptionBox = document.querySelector('h4');
        textBox.innerHTML = `"${response.data.title}"`;
        if (response.data.description.value) {
            descriptionBox.innerHTML = `${response.data.description.value}`;
        }
        else {
            descriptionBox.innerHTML = `${response.data.description}`;
        }
    })
}
