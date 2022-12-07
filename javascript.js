
function Book(title, author, pages, language, year, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.year = year;
    this.read = read;
}

Book.prototype.generateHTML = function(bookNumber) {
    let read = "";
    let checked = "";
    this.read ? checked = "checked" : "";
    this.read ? read = "read" : "";
    const book_html_template = `
    <div class="book ${read}" id="book${bookNumber}">
        <button class="close"><span class="material-icons remove-book"> close </span></button>
        <h4 id="title">${this.title}</h4>
        <p>By: <span id="author">${this.author}</span></p>
        <p>Number of pages: <span id="pages">${this.pages}</span></p>
        <p>Language: <span id="language">${this.language}</span></p>
        <p>Published: <span id="pubYear">${this.year}</span></p>
        <div class="reading-state">
            <span>Mark as read: </span>
            <label for="reading-input${bookNumber}">
                <input ${checked} type="checkbox" class="read_checkbox" id="reading-input${bookNumber}">
                <span class="control  ${read}"></span>
            </label>
        </div>
    </div>`;
    return book_html_template;
}

function BookShelf() {
    this.initialBookCollection = [];
    this.sortedBookCollection = [];
}

BookShelf.prototype.addBookToLibrary = function(book) {
    this.initialBookCollection.push(book);
}

BookShelf.prototype.renderBooks = function() {

    const display = document.querySelector('.book-display');
    display.innerHTML = "";
    for (const book in this.initialBookCollection) {
        display.insertAdjacentHTML("beforeend", this.initialBookCollection[book].generateHTML(book))
    }    
}

BookShelf.prototype.renderLibraryLog = function(book) {
    const totalBooks = document.querySelector('#books_total');
    const booksRead = document.querySelector('#books_read');
    const booksNotRead = document.querySelector('#books_not_read');
    for (const book in this.initialBookCollection) {
        totalBooks.innerHTML = Number(book) + 1;
        if (this.initialBookCollection[book].read) {
            booksRead.innerHTML = Number(booksRead.innerHTML) + 1;
        }
        else {
            booksNotRead.innerHTML = Number(booksNotRead.innerHTML) + 1;
        }
    } 
}


const book1 = new Book("Book of Knowledge Part 1: Story of Fire and Ice", "Ilia Bochkov", 200, "English", 1997, false)
const book2 = new Book("Book of Knowledge Part 2: Story of Fire and Ice and Stuff", "Ilia Bochkov", 200, "English", 1999, false)
const book3 = new Book("Book of Knowledge Part 3: Story of Fire and Ice and More Stuff", "Ilia Bochkov", 200, "English", 2004, true)

const bookShelf = new BookShelf();

bookShelf.addBookToLibrary(book1);
bookShelf.addBookToLibrary(book2);
bookShelf.addBookToLibrary(book3);

bookShelf.renderBooks();

bookShelf.renderLibraryLog();

////

const checkboxes = document.querySelectorAll('.read_checkbox');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", e => {
        checkbox.nextElementSibling.classList.toggle("read")
        checkbox.closest(".book").classList.toggle("read")      
    })
})

const closeButtons = document.querySelectorAll('.close');

closeButtons.forEach(closeButton => {
    closeButton.addEventListener("click", e => {
        closeButton.closest(".book").remove();
    })
})

const addBookButton = document.querySelector('#add_book');
const bookAdderSection = document.querySelector('.book_adder_section');


addBookButton.addEventListener("click", e => {
    bookAdderSection.classList.add("visible");      
})


const closeWindowButton = document.querySelector('#close_window');

closeWindowButton.addEventListener("click", e => {
    e.preventDefault();
    bookAdderSection.classList.remove("visible");      
})