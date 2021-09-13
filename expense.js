const ROLES = {
  'alice@example.com': 'employee',
  'alice@example.com': 'employee',
  'bhavik@example.com': 'Accountant',
}

class Expense {
  constructor (amount, description, submittedBy) {
    this.amount = amount
    this.description = description
    this.submittedBy = submittedBy
  }
}

class User {
  constructor(email) {
    this.email = email
    this.title = ROLES[email]
  }
}

const db = {
  1: new Expense(500, 'coffee', 'alice@example.com'),
  2: new Expense(5000, 'software', 'alice@example.com'),
  3: new Expense(50000, 'flight', 'bhavik@example.com')
}

module.exports = { Expense, db, User, ROLES }
