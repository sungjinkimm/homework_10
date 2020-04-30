const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, role, email, id, officeNumber) {
    super(name, role, email, id)
    this.officeNumber = officeNumber;
  }


  getOfficeNumber() {
    return this.officeNumber
    // return something
  }

  setProp1() {
    // do something...
  }
    
}

module.exports = Manager;