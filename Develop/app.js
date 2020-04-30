const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// This file will generate the final HTML. You don't need to touch this at all!
const render = require("./lib/htmlRenderer");

// This will be an array of all team member objects created
const teamMembers = [];

// This will be an array of the id values created for each object so there are no duplicates
const idArray = [];

// This function generates all the questions for creating the manager.
function createManager() {
  console.log("Please build your team");
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select your role",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        message: "What is your manager's name?",
        name: "name",
        // Note how the validate function works
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        type: "input",
        message: "What is your manager's E-Mail?",
        name: "email",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        type: "input",
        message: "What is your manager's ID?",
        name: "id",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        type: "input",
        message: "What is your manager's office room number?",
        name: "officeNumber",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
    ])
    .then((answer1) => {
      // Process the response by instatiating a new object in the Manager class

      console.log(answer1);
    
      const newManager = new Manager(answer1.name, answer1.role, answer1.email, answer1.id, answer1.officeNumber)

      teamMembers.push(newManager)

      if (answer1.role === "Manager") {
        createTeam();
      } else if (answer1.role === "Engineer") {
        createEngineer();
      } else if (answer1.role === "Intern") {
        createIntern();
      }
    });
}

// This function starts team creation.
function createTeam() {
  inquirer
    .prompt([
      // Ask which type of team member should be created with a list of choices
      {
        type: "list",
        message: "Which type of team member do you want to create?: ",
        name: "role",
        choices: ["Engineer", "Intern", "Done"],
      },
    ])
    .then((userChoice) => {
      // Based on which choice they make, call the correct function to ask more questions.
      // If no choice is made, then go to the rendering function.
      if (userChoice.role === "Engineer") {
        createEngineer();
      } else if (userChoice.role === "Intern") {
        createIntern();
      } else if(userChoice.role === "Done"){
        renderHtmlPage()
      }
    });
}

// This function starts team creation.
function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "name",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        type: "input",
        message: "What is your engineer's E-Mail?",
        name: "email",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        type: "input",
        message: "What is your engineer's ID?",
        name: "id",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        type: "input",
        message: "What is your engineer's github?",
        name: "github",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
    ])
    .then((answer2) => {
      
      console.log(answer2);
      
      const newEngineer = new Engineer(answer2.name, answer2.email, answer2.id, answer2.github);

      teamMembers.push(newEngineer);

      createTeam();
    });
    
}

function createIntern() {
  inquirer
    .prompt([
      // STUDENT:  Intern questions
      {
        type: "input",
        message: "What is your intern's name?",
        name: "engineerName",
        // Note how the validate function works
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        type: "input",
        message: "What is your intern's E-Mail?",
        name: "email",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        type: "input",
        message: "What is your intern's ID?",
        name: "id",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
      {
        type: "input",
        message: "What school did your intern attend?",
        name: "school",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        },
      },
    ])
    .then((answer3) => {
      // STUDENT: Make sure the id supplied is unique, then take the data supplied and
      // instantiate the Engineer constructor.
      // console.log(userChoice);
      // renderHtmlPage()

      console.log(answer3);
      // teamMembers.push(answer3)
      createTeam();

      // STUDENT: When finished:
      // Add the new object to the team member array
      // Pass control back to the createTeam() function
    });
}

// STUDENT: This function will call the render function required near the top (line 12),
// and pass INTO it the teamMembers area; from there, write the HTML returned back to a file
// in a directory called output.
function renderHtmlPage() {
  const html = render(teamMembers);
  fs.writeFile("output/index.html", html, error =>{
    if (error){
      return Error
    } else {
      return ("Success!")
    }
  })
}

// This is our starter function.
// Note that we use separate functions for different questions in inquirer to
// help keep code organized.
function startMenu() {
  // Here we start things off by calling this function to get person's role
  createManager();
}

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

startMenu();
