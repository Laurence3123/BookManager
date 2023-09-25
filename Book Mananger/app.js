//Book constructor

function Book(author, email, title, isbn){
    this.author = author,
    this.email = email,
    this.title = title,
    this.isbn = isbn
}

//User interface construtor / class
function UI(){}

//method to add the books in the table 

UI.prototype.addBook = function(book){
    const table = document.querySelector('.book-list');
    //create a table row (tr)
    const row = document.createElement('tr');
    //columns
    row.innerHTML = `
    <td>${book.author}<td>
    <td>${book.email}<td>
    <td>${book.title}<td>
    <td>${book.isbn}<td>
    <td><a href = "#" class="del">&times;</a></td>
    
    `;
    table.appendChild(row);
}
//Method for the arlets
UI.prototype.Toasts = function(msg, className){
    //create a div
    const div = document.createElement('div');
    //add the class
    div.className = `arlet ${className}`;
    //add text
    div.appendChild(document.createTextNode(msg));
    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    //set timeout function
    setTimeout(()=>{
        document.querySelector('.arlet').remove();
    }, 3000);
}
//clear the fields after adding the books
UI.prototype.clearFields = function(){
    document.querySelector('#author').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#title').value = '';
    document.querySelector('#isbn').value = '';
}

//Delete the books from the table
UI.prototype.deleteBook = function(target){
    if(target.className === 'del'){
        target.parentElement.parentElement.remove();
    }
}
//localstorage constructor
function Store(){}

//Inheritance
Store.prototype = Object.create(UI.prototype);
Store.prototype.constructor = Store;

//Method to get books from the localstorage
Store.prototype.getBooks = function()
{
    let books;
    if(localStorage.getItem('books') === null)
    books = [];
    else
    book = JSON.parse(localStorage.getItem('books'));
    return books;
}
   // Method to add the books into localstorage
    Store.prototype.addBook = function(book){
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books)); 
}

//get the books from the localstorage and print into the table 
Store.prototype.Data = function(){
    const books = this.getBooks();
    books.forEach(function(book){
        let ui = new UI();
        ui.addBook(book);
     });
    }

    //method to remove the books from local storage
    Store.prototype.removeBook = function(id){
        const books = this.getBooks();
        books.forEach((book, index)=>{
            if(book.isbn === id){
                books.splice(index ,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
    let s = new Store();
    s.Data();

//clear the fields after adding the books
UI.prototype
//event listeners
const form = document.querySelector('#book-form');
form.addEventListener('submit' , (e)=>{
            //get values from the inputs 
            const author = document.querySelector('#author').value;
            const email = document.querySelector('#email').value;
            const title = document.querySelector('#title').value;
            const isbn = document.querySelector('#isbn').value;
            //create an instance 
            const book = new Book(author, email, title, isbn);
            const ui = new UI();
            const ls = new Store();
            //check if the form field have data
            if(author == '' || email == '' || title == '' || isbn == ''){
                ui.Toasts('Please fill in all required', 'alert-danger')
            }else{
                ui.addBook(book);
                ui.addBook(book);
                ui.Toasts('Books was added successfully', 'alert-success');
                ui.clearFields();
            }

            ui.addBook(book)
            e.preventDefault();
})

//Event listener for the delete
document.querySelector('.book-list').addEventListener('click',(e)=>{
    const ui = new UI();
    const ls = new Store();
    ui.deleteBook(e.target);
    ls.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.Toasts('Book has been deleted', 'alert-info');
    e.preventDefault();
})