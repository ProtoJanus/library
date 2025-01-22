function Book(title, author, pages, hasRead, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
  this.id = id;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.hasRead ? "has read" : "has not read yet."
  }`;
};

Book.prototype.toggleHasRead = function () {
  this.hasRead ? (this.hasRead = false) : (this.hasRead = true);
  updateHasRead(this.id);
};

function addBookToLibrary(title, author, pages, hasRead) {
  id += 1;
  const book = new Book(title, author, pages, hasRead, id);
  myLibrary.push(book);
  generateLibraryTable(book);
}

function generateLibraryTable(book) {
  const booksTableBody = document.querySelector(".books-table-body");
  booksTableBody.innerHTML += `<tr id=${id}>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td class="has-read-cell">${
            book.hasRead ? "True" : "False"
          } <button class="has-read-toggle-button">Toggle</button></td>
        </tr>`;
}

function updateHasRead(rowId) {
  const book = myLibrary.find((item) => item.id == rowId);
  row = document.getElementById(rowId);
  const hasReadCell = row.querySelector(".has-read-cell");

  hasReadCell.firstChild.textContent = book.hasRead ? "True " : "False ";
}

let id = 0;
const myLibrary = [];
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 300, true);
addBookToLibrary("The Martian", "Andy Weir", 416, true);
addBookToLibrary("Fool Moon", "Jim Butcher", 432, false);

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

const hasReadToggleButtons = document.querySelectorAll(
  ".has-read-toggle-button"
);
hasReadToggleButtons.forEach((hasReadToggleButton) => {
  hasReadToggleButton.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    const specificBook = myLibrary.find((item) => item.id == row.id);

    specificBook.toggleHasRead();
  });
});
