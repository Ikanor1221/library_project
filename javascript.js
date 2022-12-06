

// document.querySelectorAll('.some-class').forEach(item => {
//     item.addEventListener('click', event => {
//       //handle click
//     })
//   })

const checkboxes = document.querySelectorAll('.read_checkbox');

console.log(checkboxes);

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", e => {
        checkbox.nextElementSibling.classList.toggle("read")
        checkbox.closest(".book").classList.toggle("read")
        
    })
})



// function Book(title, author, pages, year, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.year = year;
//     this.read = read;
// }

// Book.prototype.generateHTML = function() {
//     const book_html_template = '';
//     return book_html_template;
// }

// function BookShelf() {
//     this.initialBookCollection = [];
//     this.sortedBookCollection = [];
// }

// BookShelf.prototype.addBookToLibrary = function(book) {
//     this.initialBookCollection.push(book);
// }

// BookShelf.prototype.renderBooks = function() {
    
// }


// const book1 = new Book("My life", "Ilia Bochkov", 200, 1997, true)

// const bookShelf = new BookShelf();

// bookShelf.addBookToLibrary(book1);
// bookShelf.addBookToLibrary(book1);
// bookShelf.addBookToLibrary(book1);

// console.log(bookShelf.initialBookCollection[0]);