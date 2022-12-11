
/// Declare object constructors
// Object constuctor for the Book
function Book(title, author, pages, language, published, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.published = published;
    this.read = read;
    this.index = index;
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
    <div class="book ${read}" id="book${this.index}">
        <p class="book_number">#${this.index+1}</p>
        <button class="close"><span class="material-icons remove-book"> close </span></button>
        <h4 id="title">${this.title}</h4>
        <p>By: <span id="author">${this.author}</span></p>
        <p>Number of pages: <span id="pages">${this.pages}</span></p>
        <p>Language: <span id="language">${this.language}</span></p>
        <p>Published: <span id="pubYear">${GBdate.format(this.published)}</span></p>
        <div class="reading-state">
            <span>Mark as read: </span>
            <label for="reading-input${this.index}">
                <input ${checked} type="checkbox" class="read_checkbox" id="reading-input${this.index}">
                <span class="control  ${read}"></span>
            </label>
        </div>
    </div>`;
    return book_html_template;
}


// Object constructor for the bookshelf- the object that holds and controls the entirety of the library
function BookShelf() {
    this.initialBookCollection = [];
    // this.sortedBookCollection = [];
}

BookShelf.prototype.addBookToLibrary = function(book) {
    this.initialBookCollection.push(book);
}

BookShelf.prototype.removeBookFromLibrary = function(number) {
    // console.log(this.initialBookCollection.splice(number, 1))
    this.initialBookCollection.splice(number, 1);
    console.log(this.initialBookCollection)
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
    const orderElement = document.querySelector('#order');
    const orderByElement = document.querySelector('#order_by');
    if (orderByElement.value == "insertion_date") {
        if (orderElement.value == "ascending") {
            for (let number in this.initialBookCollection) {
                display.insertAdjacentHTML("beforeend", this.initialBookCollection[number].generateHTML());
            }
        }
        if (orderElement.value == "descending") {
            for (let number = (this.initialBookCollection.length - 1); number >= 0; number--) {
                display.insertAdjacentHTML("beforeend", this.initialBookCollection[number].generateHTML());
            }
        }
    }
    if (orderByElement.value == "publishing_date") {
        if (orderElement.value == "ascending") {
            const sortedCollection = this.initialBookCollection.slice().sort((a, b) => a.published - b.published);
            for (let number in sortedCollection) {
                display.insertAdjacentHTML("beforeend", sortedCollection[number].generateHTML());
            }
        }
        if (orderElement.value == "descending") {
            const sortedCollection = this.initialBookCollection.slice().sort((a, b) => a.published - b.published)
            for (let number = (sortedCollection.length - 1); number >= 0; number--) {
                display.insertAdjacentHTML("beforeend", sortedCollection[number].generateHTML());
            }
        }
    }
    bookShelf.renderLibraryLog();
    listenToCheckboxes();
    listenToCloseButtons();
    return
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

// Setup date formatter for EU and GB region
const GBdate = new Intl.DateTimeFormat("en-GB", {});

// console.log(GBdate.format(new Date("12-02-1997")))

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

/// Declare objects
// Create initial books, add them to created bookShelf and render the object on the screen with log and book display
const book1 = new Book("Book of Knowledge Part 1: Story of Fire and Ice", "Ilia Bochkov", 200, "English", new Date("12-02-1997"), true, 0)
const book2 = new Book("This Book is Great!", "Ilia Bochkov", 200, "English", new Date("03-12-2011"), false, 1)
const book3 = new Book("Book of Knowledge Part 2: Story of Fire and Ice and Stuff", "Ilia Bochkov", 200, "English", new Date("10-24-1999"), false, 2)
const book4 = new Book("Book of Knowledge Part 3: Story of Fire and Ice and More Stuff", "Ilia Bochkov", 200, "English", new Date("02-22-2002"), true, 3)

const bookShelf = new BookShelf();

bookShelf.addBookToLibrary(book1);
bookShelf.addBookToLibrary(book2);
bookShelf.addBookToLibrary(book3);
bookShelf.addBookToLibrary(book4);

bookShelf.renderBooks();

/// Create event listeners
// Collect all checkboxes and attach event liestener to them so the read state can be changed from the UI both graphically and logically
// This code is wrapped in a function for further usage (!)-toggle by index! Maybe implement it via sorted array!
function listenToCheckboxes() {
    const checkboxes = document.querySelectorAll('.read_checkbox');
    checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", e => {
        checkbox.nextElementSibling.classList.toggle("read");
        checkbox.closest(".book").classList.toggle("read");  
        console.log(Number(checkbox.closest(".book").id.substring(4)))
        bookShelf.toggleReadState(Number(checkbox.closest(".book").id.substring(4)));    
        })
    })
}

// Collect all closing buttons and attach event listeners to them so the book is removed from the shelf both graphically and logically
// This code is wrapped in a function for further usage
function listenToCloseButtons() {
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(closeButton => {
        closeButton.addEventListener("click", e => {
            bookShelf.removeBookFromLibrary(Number(closeButton.closest(".book").id.substring(4)));
            bookShelf.renderBooks();            
        })
    })
}

const orderElement = document.querySelector('#order');
orderElement.addEventListener("change", e => {
    e.preventDefault();
    bookShelf.renderBooks();      
})

const orderByElement = document.querySelector('#order_by');
orderByElement.addEventListener("change", e => {
    e.preventDefault();
    bookShelf.renderBooks();      
})

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

// Logically and visually add new book to the library on click (!)- unnecessery repetiton
finalAddBookButton.addEventListener("click", e => {
    e.preventDefault();
    const newBook = new Book (bookTitle.value, bookAuthor.value, bookNumberOfPages.value, bookLanguage.value, new Date(bookPublishingDate.value), bookStatus.value, bookShelf.length);
    bookShelf.addBookToLibrary(newBook);
    bookShelf.renderBooks();
    clearFields();
})


// Find form's Clear fields button listen to the clicks to invoke the clearFields function
const clearFieldsButton = document.querySelector("#clear");

clearFieldsButton.addEventListener("click", e => {
    e.preventDefault();
    clearFields();
})

