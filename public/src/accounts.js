function findAccountById(accounts, id) {
  // It returns the account object that has the matching ID
  let found = accounts.find((account) => account.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
  // returns a sorted array of the provided account objects. The objects are sorted alphabetically by last name
  accounts.slice();
  accounts.sort((accountsA, accountsB) => accountsA.name.last > accountsB.name.last ? 1 : -1);
  return accounts.sort();
}

function getAccountFullNames(accounts) {
// returns an array of strings. Each is the full name of an account in the format `<firstName> <lastName>`. Strings appear in the original order of the account objects
  const fullNames = accounts.map((account) => `${account.name.first} ${account.name.last}`);
  return fullNames;
}



// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    const count = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);

    return acc + count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter((book) => {
      const recent = book.borrows[0];
      return !recent.returned && recent.id === account.id;
    })
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return { ...book, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getAccountFullNames,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
