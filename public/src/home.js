function getTotalBooksCount(books) {
  // returns a _number_ that represents the number of book objects inside of the array.
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // returns a _number_ that represents the number of account objects inside of the array.
  return accounts.length;
}

function getBooksBorrowedCount(books) {
    // **** GOTME: returns a _number_ that represents the number of books _that are currently checked out of the library. 
    // This number can be found by looking at the first transaction object in the `borrows` array of each book. 
    // If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed
  return books.filter((book) => {
    // Variable counts looks through the borrows array to check the returned value
    const borrowed = book.borrows[0];
    // Include the book in the result if it is currently borrowed
    return borrowed && !borrowed.returned;
  }).length;
}

// Tbis is a helper function that's called by other functions inside this file. You don't have to edit it.
function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }

    return acc;
  }, {});

  const sorted = _sortObjectByValues(count);
  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});

  const sorted = _sortObjectByValues(groupById);
  return sorted
    .map((id) => {
      const { title: name } = books.find(({ id: bookId }) => bookId === id);
      return { name, count: groupById[id] };
    })
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }

    return acc;
  }, {});

  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }

  const sorted = _sortObjectByValues(count);
  return sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      const name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
