/*
Filename: sophisticated_code.js

Description: This code is a sophisticated and complex implementation of a bookstore management system. It handles various operations such as adding books, searching books, managing inventory, and generating reports.

Author: Your Name

Date: YYYY-MM-DD
*/

// Define the Book class
class Book {
  constructor(title, author, genre, price, quantity) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.price = price;
    this.quantity = quantity;
  }
}

// Define the Bookstore class
class Bookstore {
  constructor() {
    this.books = [];
  }

  // Add a book to the bookstore
  addBook(title, author, genre, price, quantity) {
    const book = new Book(title, author, genre, price, quantity);
    this.books.push(book);
  }

  // Search books by title
  searchByTitle(title) {
    const results = [];
    for (const book of this.books) {
      if (book.title.toLowerCase().includes(title.toLowerCase())) {
        results.push(book);
      }
    }
    return results;
  }

  // Search books by author
  searchByAuthor(author) {
    const results = [];
    for (const book of this.books) {
      if (book.author.toLowerCase().includes(author.toLowerCase())) {
        results.push(book);
      }
    }
    return results;
  }

  // Update the quantity of a book
  updateQuantity(title, quantity) {
    for (const book of this.books) {
      if (book.title.toLowerCase() === title.toLowerCase()) {
        book.quantity = quantity;
        return true;
      }
    }
    return false;
  }

  // Generate a report of books in stock
  generateInventoryReport() {
    let totalValue = 0;
    let report = "Inventory Report:\n\n";

    for (const book of this.books) {
      const value = book.price * book.quantity;
      totalValue += value;
      report += `Title: ${book.title}\n`;
      report += `Author: ${book.author}\n`;
      report += `Genre: ${book.genre}\n`;
      report += `Price: $${book.price}\n`;
      report += `Quantity: ${book.quantity}\n`;
      report += `Value: $${value.toFixed(2)}\n`;
      report += "\n";
    }

    report += `Total value: $${totalValue.toFixed(2)}`;

    return report;
  }
}

// Usage Example
const bookstore = new Bookstore();
bookstore.addBook("The Great Gatsby", "F. Scott Fitzgerald", "Classic", 12.99, 10);
bookstore.addBook("To Kill a Mockingbird", "Harper Lee", "Fiction", 9.99, 7);
bookstore.addBook("1984", "George Orwell", "Dystopian", 11.49, 5);

console.log(bookstore.searchByTitle("kill")); // Search book by title
console.log(bookstore.searchByAuthor("Orwell")); // Search book by author

bookstore.updateQuantity("To Kill a Mockingbird", 12); // Update book quantity
console.log(bookstore.generateInventoryReport()); // Generate inventory report