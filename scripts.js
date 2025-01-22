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
  generateLibraryTable(book);
}

function generateLibraryTable(book) {
  const booksTableBody = document.querySelector(".books-table-body");
  booksTableBody.innerHTML += `<tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td>${book.hasRead}</td>
        </tr>`;
}

const myLibrary = [];
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 300, true);

const addBookButton = document.querySelector(".add-book-button");
const dialog = document.querySelector("dialog");
const modalClose = document.querySelector(".modal-close");

addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

const form = document.getElementById("book-form");
modalClose.addEventListener("click", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  addBookToLibrary(
    data.get("book-name"),
    data.get("author"),
    Number(data.get("pages")),
    data.get("has-read") === "on" ? true : false
  );

  dialog.close();
});
