function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.hasRead ? "has read" : "has not read yet."
  }`;
};

function addBookToLibrary(title, author, pages, hasRead) {
  const book = new Book(title, author, pages, hasRead);
  myLibrary.push(book);
}

function generateLibraryTable(book) {}

const myLibrary = [];
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 300, true);

const addBookButton = document.querySelector(".add-book-button");
const dialog = document.querySelector("dialog");
const modalClose = document.querySelector(".modal-close");

addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

modalClose.addEventListener("click", () => {
  dialog.close();
});
