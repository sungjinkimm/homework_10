
const Employee = require("./Employee")

class Engineer extends Employee {
  constructor(name, email, id, github) {
    super(name, "Engineer", email, id);
    this.github = github;
  }

  getGithub() {
    return this.github
  }
    
}

module.exports = Engineer;