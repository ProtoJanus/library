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
  } ID:${this.id}`;
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
          <td class="delete-button-cell"><button class="delete-button">Delete</button></td>
        </tr>`;

  // when we add a new row, these event listeners are added at the same time so they are applied
  // to each new book that's added

  booksTableBody.addEventListener("click", (e) => {
    // toggle button (on click toggle if you have read the book, and update the book in the myLibrary array)
    if (e.target.classList.contains("has-read-toggle-button")) {
      const row = e.target.closest("tr");
      const specificBook = myLibrary.find((item) => item.id == row.id);
      specificBook.toggleHasRead();
    }

    // delete button (on click delete row and remove book from myLibrary array)
    if (e.target.classList.contains("delete-button")) {
      const row = e.target.closest("tr");
      const bookId = parseInt(row.id, 10);
      const bookIndex = myLibrary.findIndex((item) => item.id === bookId);
      if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        row.remove();
      }
    }
  });
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

addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

const modalClose = document.querySelector(".modal-close");
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
