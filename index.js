async function getSubjectCollection() {
    const selectedType = document.querySelector('input[name="subject"]:checked').value;
    const offset = Math.floor((Math.random() * 500));
    
    const response = await axios.get(`https://openlibrary.org/subjects/${selectedType}.json?limit=10&offset=${offset}`)
    getRandomBook(response.data.works)
}

async function getRandomBook(books) {    
    const index = Math.floor((Math.random() * 10));
    const bookKey = books[index].key;
    const response = await axios.get(`https://openlibrary.org${bookKey}.json`);

    const bookTitle = response.data.title;
    const authorName = books[index].authors[0].name;
    const coverId = books[index].cover_id;
    const coverImage = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    let bookDescription;

    if (!response.data.description) {
        bookDescription = "No description available";
    }
    else if (response.data.description.value) {
        bookDescription = response.data.description.value.replace(/\*/g, '');
    }
    else {
        bookDescription = response.data.description.replace(/\*/g, '');
    }

    renderBookInfo(bookTitle, authorName, bookDescription, coverImage)
}

function renderBookInfo(title, author, description, cover) {
    const bookSummary = document.querySelector('#book-summary')

    bookSummary.innerHTML = `
      <div id="content">
          <h2>${title}</h2>
          <h3>${author}</h3>
          <p>${description}</p>
          <img src="${cover}">
      </div>
    `
}

const searchButton = document.querySelector('#search');
searchButton.addEventListener('click', getSubjectCollection);
