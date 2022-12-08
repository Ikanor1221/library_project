
function Book(title, author, pages, language, published, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.published = published;
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
        <p>Published: <span id="pubYear">${this.published}</span></p>
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

BookShelf.prototype.removeBookFromLibrary = function(number) {
    this.initialBookCollection.push(book);
}

BookShelf.prototype.toggleReadState = function(number) {
    this.initialBookCollection[number].read = this.initialBookCollection[number].read ? false : true;
    bookShelf.renderLibraryLog();
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
    totalBooks.innerHTML = 0;
    booksRead.innerHTML = 0;
    booksNotRead.innerHTML = 0;
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


const book1 = new Book("Book of Knowledge Part 1: Story of Fire and Ice", "Ilia Bochkov", 200, "English", "02-12-1997", true)
const book2 = new Book("Book of Knowledge Part 2: Story of Fire and Ice and Stuff", "Ilia Bochkov", 200, "English", "24-10-1999", false)
const book3 = new Book("Book of Knowledge Part 3: Story of Fire and Ice and More Stuff", "Ilia Bochkov", 200, "English", "22-02-2002", false)

const bookShelf = new BookShelf();

bookShelf.addBookToLibrary(book1);
bookShelf.addBookToLibrary(book2);
bookShelf.addBookToLibrary(book3);

bookShelf.renderBooks();

bookShelf.renderLibraryLog();

///

const checkboxes = document.querySelectorAll('.read_checkbox');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", e => {
        checkbox.nextElementSibling.classList.toggle("read");
        checkbox.closest(".book").classList.toggle("read");  
        bookShelf.toggleReadState(Number(checkbox.closest(".book").id.substring(4)));    
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

const bookAdder = document.querySelector('.book_adder');
const closeWindowButton = document.querySelector('#close_window');

closeWindowButton.addEventListener("click", e => {
    e.preventDefault();
    bookAdderSection.classList.remove("visible");      
})

bookAdderSection.addEventListener("click", e => {
    if (e.target == bookAdderSection) {
        bookAdderSection.classList.remove("visible");   
    }
})

///

const finalAddBookButton = document.querySelector("#add");
const clearFieldsButton = document.querySelector("#clear");

const bookTitle = document.querySelector("#book_title");
const bookAuthor = document.querySelector("#book_author");
const bookNumberOfPages = document.querySelector("#book_number_of_pages");
const bookLanguage = document.querySelector("#book_language");
const bookPublishingDate = document.querySelector("#book_publishing_date");
const bookStatus = document.querySelector("#book_status");

finalAddBookButton.addEventListener("click", e => {
    e.preventDefault();
    const newBook = new Book (bookTitle.value, bookAuthor.value, bookNumberOfPages.value, bookLanguage.value, dateConverter(bookPublishingDate.value), bookStatus.value);
    console.log(newBook);
    bookShelf.addBookToLibrary(newBook);
    bookShelf.renderBooks();
    clearFields();
    // bookAdderSection.classList.remove("visible");
})

clearFieldsButton.addEventListener("click", e => {
    e.preventDefault();
    clearFields();
})

function clearFields() {

    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = null;
    })
    const selectObject = document.querySelector("select");
    selectObject.value = null;

    return
}

function dateConverter(date) {
    
    let convertedDate = `${date.substring(8, 10)}-${date.substring(5, 7)}-${date.substring(0, 4)}`;
    return convertedDate;
}