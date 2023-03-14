const openModalButton = document.querySelector(".open-modal");
const closeModalButton = document.querySelector(".close-modal");
const form1 = document.querySelector("form");
const modal = document.querySelector(".modal");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");

let myLibrary = [];

/* function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
} */

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  readTheBook = () => {
    if (this.read) {
      this.read = false;
    } else {
      this.read = true;
    }
  };
}

function addBookToLibrary(event) {
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  const book = new Book(
    formProps.title,
    formProps.author,
    formProps.pages,
    !!formProps.read
  );

  myLibrary.push(book);
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function displayBooks() {
  const main = document.querySelector("main");
  main.replaceChildren();

  for (let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("article");
    card.setAttribute("data-index", i);

    const bookData = document.createElement("div");
    bookData.setAttribute("class", "book-data");
    const cardButtons = document.createElement("div");
    cardButtons.setAttribute("class", "card-buttons");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const info = document.createElement("p");
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove-button");
    const readButton = document.createElement("button");
    readButton.setAttribute("class", "read-button");

    if (myLibrary[i].read) {
      readButton.toggleAttribute("already-read");
    }

    title.textContent = "Title: ";
    author.textContent = "Author: ";
    info.textContent = "Info: ";
    removeButton.textContent = "Remove";
    readButton.textContent = "Read";

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

    removeButton.addEventListener("click", () => {
      const index = card.getAttribute(`data-index`);
      removeBook(index);
    });

    readButton.addEventListener("click", () => {
      const index = card.getAttribute("data-index");
      myLibrary[index].readTheBook();
      readButton.toggleAttribute("already-read");
    });

    bookData.appendChild(title);
    bookData.appendChild(author);
    bookData.appendChild(info);
    cardButtons.appendChild(removeButton);
    cardButtons.appendChild(readButton);

    card.appendChild(bookData);
    card.appendChild(cardButtons);

    main.appendChild(card);
  }
}

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

openModalButton.addEventListener("click", openModal);

closeModalButton.addEventListener("click", closeModal);

title.addEventListener("input", (e) => {
  if (title.validity.tooShort) {
    title.setCustomValidity("Titles should have 5 characters minimum!");
  } else {
    title.setCustomValidity("");
  }
});

author.addEventListener("input", (e) => {
  if (author.validity.tooShort) {
    author.setCustomValidity("Authors names should have 5 characters minimum!");
  } else {
    author.setCustomValidity("");
  }
});

pages.addEventListener("input", (e) => {
  if (pages.validity.rangeUnderflow) {
    pages.setCustomValidity("The book must be at least 10 pages!");
  } else if (pages.validity.rangeOverflow) {
    pages.setCustomValidity("The book should not be more than 1000 pages!");
  } else {
    pages.setCustomValidity("");
  }
});

form1.addEventListener("submit", (e) => {
  if (title.validity.valid || author.validity.valid || pages.validity.valid) {
    addBookToLibrary(e);
    closeModal();
    e.preventDefault();
  }
});
