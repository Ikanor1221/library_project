

// document.querySelectorAll('.some-class').forEach(item => {
//     item.addEventListener('click', event => {
//       //handle click
//     })
//   })

function Book(title, author, pages, language, year, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.year = year;
    this.read = read;
}

Book.prototype.generateHTML = function(bookNumber) {
    console.log(this.read)
    let read = "";
    this.read ? read = "checked" : "";
    const book_html_template = `
    <div class="book" id="book${bookNumber}">
        <button class="close"><span class="material-icons remove-book"> close </span></button>
        <h4 id="title">${this.title}</h4>
        <p>By: <span id="author">${this.author}</span></p>
        <p>Number of pages: <span id="pages">${this.pages}</span></p>
        <p>Language: <span id="language">${this.language}</span></p>
        <p>Published: <span id="pubYear">${this.year}</span></p>
        <div class="reading-state">
            <span>Mark as read: </span>
            <label for="reading-input1">
                <input ${read} type="checkbox" class="read_checkbox" id="reading-input1">
                <span class="control"></span>
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
    
}


const book1 = new Book("Book of Knowledge: Story of Fire and Ice and Stuff", "Ilia Bochkov", 200, "English", 1997, false)

const bookShelf = new BookShelf();

bookShelf.addBookToLibrary(book1);
bookShelf.addBookToLibrary(book1);
bookShelf.addBookToLibrary(book1);

bookShelf.initialBookCollection[2].read = true;

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

console.log(book1.generateHTML(1));