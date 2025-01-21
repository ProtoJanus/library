function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.info = function () {
  return `${title} by ${author}, ${pages} pages, ${
    hasRead ? "has read" : "has not read yet."
  }`;
};
