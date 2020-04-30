const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, email, id, officeNumber) {
    super(name, "Manager", email, id)
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