let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read ? "already read" : "not read yet"
    }`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  const main = document.querySelector("body");

  for (let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("article");
    const bookData = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const info = document.createElement("p");

    title.textContent = "Title: ";
    author.textContent = "Author: ";
    info.textContent = "Info: ";

    const titleContent = document.createElement("span");
    const authorContent = document.createElement("span");
    const infoContent = document.createElement("span");

    titleContent.textContent = myLibrary[i].title;
    authorContent.textContent = myLibrary[i].author;
    infoContent.textContent = `${myLibrary[i].pages} pages | ${
      myLibrary[i].read ? "already read" : "not read yet"
    }`;

    title.appendChild(titleContent);
    author.appendChild(authorContent);
    info.appendChild(infoContent);

    bookData.appendChild(title);
    bookData.appendChild(author);
    bookData.appendChild(info);
    card.appendChild(bookData);
    main.appendChild(card);
  }
}

displayBooks();
