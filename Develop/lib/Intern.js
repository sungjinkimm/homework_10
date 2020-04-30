// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

// // If you inherit from a class, make sure you REQUIRE that class


// Basic class structure:
const Employee = require("./Employee")

class Intern extends Employee {
  constructor(name, role, email, id, github) {
    super(name, role, email, id, github);
    this.name= name;
    this.role = role;
    this.email = email;
    this.id = id;
    this.github = github;
  }

  // getRole() {
  //   return "Intern"
  //   // return something...
  // }

  setProp1() {
    // do something...
  }
    
}

module.exports = Intern;