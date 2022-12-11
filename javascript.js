
/// Declare object constructors
// Object constuctor for the Book
function Book(title, author, pages, language, published, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.published = published;
    this.read = read;
}

//Method for generating the HTML code for the given book
Book.prototype.generateHTML = function(bookNumber) {
    let read = "";
    let checked = "";
    if (this.read) {
        checked = "checked";
        read = "read";
    }
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


// Object constructor for the bookshelf- the object that holds and controls the entirety of the library
function BookShelf() {
    this.initialBookCollection = [];
    this.sortedBookCollection = [];
}

BookShelf.prototype.addBookToLibrary = function(book) {
    this.initialBookCollection.push(book);
}

BookShelf.prototype.removeBookFromLibrary = function(number) {
    this.initialBookCollection.remove(number);
}

// Change the read state of the given book to the opposite one and render the log accordingly
BookShelf.prototype.toggleReadState = function(number) {
    this.initialBookCollection[number].read = this.initialBookCollection[number].read ? false : true;
    bookShelf.renderLibraryLog();
}

// Render every book in order of their addition (!)- generate the HTML code for every book and insert it in the suitable container
BookShelf.prototype.renderBooks = function() {
    const display = document.querySelector('.book-display');
    display.innerHTML = "";
    for (let book in this.initialBookCollection) {
        display.insertAdjacentHTML("beforeend", this.initialBookCollection[book].generateHTML(book))
    }    
}

// Render the library log according to the condition of the books in the bookShelf
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

/// Declare functions
// Clear all the fields in the form- migth be converted to the method of the Form object constructor
function clearFields() {

    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = null;
    })
    const selectObject = document.querySelector("select");
    selectObject.value = "";
    return
}


// Convert the date received from the vanilla date selector to the EU format
function dateConverter(date) {
    let convertedDate = `${date.substring(8, 10)}-${date.substring(5, 7)}-${date.substring(0, 4)}`;
    return convertedDate;
}

/// Declare objects
// Create initial books, add them to created bookShelf and render the object on the screen with log and book display
const book1 = new Book("Book of Knowledge Part 1: Story of Fire and Ice", "Ilia Bochkov", 200, "English", "02-12-1997", true)
const book2 = new Book("Book of Knowledge Part 2: Story of Fire and Ice and Stuff", "Ilia Bochkov", 200, "English", "24-10-1999", false)
const book3 = new Book("Book of Knowledge Part 3: Story of Fire and Ice and More Stuff", "Ilia Bochkov", 200, "English", "22-02-2002", false)

const bookShelf = new BookShelf();

bookShelf.addBookToLibrary(book1);
bookShelf.addBookToLibrary(book2);
bookShelf.addBookToLibrary(book3);

bookShelf.renderBooks();
bookShelf.renderLibraryLog();

/// Create event listeners
// Collect all checkboxes and attach event liestener to them so the read state can be changed from the UI both graphically and logically
// This code is wrapped in a function for further usage
function listenToCheckboxes() {
    const checkboxes = document.querySelectorAll('.read_checkbox');
    checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", e => {
        checkbox.nextElementSibling.classList.toggle("read");
        checkbox.closest(".book").classList.toggle("read");  
        bookShelf.toggleReadState(Number(checkbox.closest(".book").id.substring(4)));    
        })
    })
}

listenToCheckboxes();

// Collect all closing buttons and attach event listeners to them so the book is removed from the shelf both graphically and logically (!)
function listenToCloseButtons() {
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(closeButton => {
        closeButton.addEventListener("click", e => {
            closeButton.closest(".book").remove();
        })
    })
}

listenToCloseButtons()

/// Handle the new book form
// Find the button for adding the book and make book_adder_section visible on click
const addBookButton = document.querySelector('#add_book');
const bookAdderSection = document.querySelector('.book_adder_section');
addBookButton.addEventListener("click", e => {
    bookAdderSection.classList.add("visible");      
})

// Find the button for closing the book_adder_section and make it invisible on click
const closeWindowButton = document.querySelector('#close_window');
closeWindowButton.addEventListener("click", e => {
    e.preventDefault();
    bookAdderSection.classList.remove("visible");      
})

// Make book_adder_section invisible if the click is outside of the form 
bookAdderSection.addEventListener("click", e => {
    if (e.target == bookAdderSection) {
        bookAdderSection.classList.remove("visible");   
    }
})

// Find form's Add Book button and elements containinng the important information
const finalAddBookButton = document.querySelector("#add");

let bookTitle = document.querySelector("#book_title");
let bookAuthor = document.querySelector("#book_author");
let bookNumberOfPages = document.querySelector("#book_number_of_pages");
let bookLanguage = document.querySelector("#book_language");
let bookPublishingDate = document.querySelector("#book_publishing_date");
let bookStatus = document.querySelector("#book_status");

// Logically and visually add new book to the library on click 
finalAddBookButton.addEventListener("click", e => {
    e.preventDefault();
    const newBook = new Book (bookTitle.value, bookAuthor.value, bookNumberOfPages.value, bookLanguage.value, dateConverter(bookPublishingDate.value), bookStatus.value);
    bookShelf.addBookToLibrary(newBook);
    bookShelf.renderBooks();
    bookShelf.renderLibraryLog();
    clearFields();
    listenToCheckboxes();
    listenToCloseButtons();
})


// Find form's Clear fields button listen to the clicks to invoke the clearFields function
const clearFieldsButton = document.querySelector("#clear");

clearFieldsButton.addEventListener("click", e => {
    e.preventDefault();
    clearFields();
})

