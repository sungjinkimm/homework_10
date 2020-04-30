const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk")

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// This file will generate the final HTML. You don't need to touch this at all!
const render = require("./lib/htmlRenderer");

// This will be an array of all team member objects created
const teamMembers = [];

function createTeam() {
  // console.log(chalk.blue("Please build your team"));
  inquirer
    .prompt([
      // asking which type of team member should be created with a list of choices
      {
        type: "list",
        message: chalk.yellow("Which type of team member do you want to create?: "),
        name: "role",
        choices: ["Manager","Engineer", "Intern", "Done"],
      },
    ])
    .then((userChoice) => {
      // Based on which choice they make, call the correct function to ask more questions.
      // If no choice is made, then go to the rendering function.
      if (userChoice.role === "Manager"){
        createManager();
      } else if (userChoice.role === "Engineer") {
        createEngineer();
      } else if (userChoice.role === "Intern") {
        createIntern();
      } else if(userChoice.role === "Done"){
        renderHtmlPage()
      }
    });
}

// This function generates all the questions for creating the manager.
function createManager() {
  // console.log("Please build your team");
  inquirer
    .prompt([
      
      {
        type: "input",
        message: "What is the manager's name?",
        name: "name",
        // Note how the validate function works
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return chalk.yellow("Please enter at least one character.");
        },
      },
      {
        type: "input",
        message: "What is the manager's E-Mail?",
        name: "email",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return chalk.yellow("Please enter at least one character.");
        },
      },
      {
        type: "input",
        message: "What is the manager's ID?",
        name: "id",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return chalk.yellow("Please enter at least one character.");
        },
      },
      {
        type: "input",
        message: "What is the manager's office room number?",
        name: "officeNumber",

        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return chalk.yellow("Please enter at least one character.");
        },
      },
    ])
    .then((answer1) => {
      
      console.log(answer1);
      // processing the response by instatiating a new object in the Manager class 
      const newManager = new Manager(answer1.name, answer1.email, answer1.id, answer1.officeNumber)
      // pushing the new object into an array which will be called to make render HTML file
      teamMembers.push(newManager)
      createTeam();
  
    });
}

// this function starts team creation.
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
          return chalk.yellow("Please enter at least one character.");
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
          return chalk.yellow("Please enter at least one character.");
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
          return chalk.yellow("Please enter at least one character.");
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
          return chalk.yellow("Please enter at least one character.");
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
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
        
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return chalk.yellow("Please enter at least one character.");
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
          return chalk.yellow("Please enter at least one character.");
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
          return chalk.yellow("Please enter at least one character.");
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
          return chalk.yellow("Please enter at least one character.");
        },
      },
    ])
    .then((answer3) => {
      
      console.log(answer3);

      const newIntern = new Intern(answer3.name, answer3.email, answer3.id, answer3.school);

      teamMembers.push(newIntern);

      createTeam();

    });
}

// This function will call the render function required near the top (line 12),
// and pass INTO it the teamMembers area; from there, write the HTML returned back to a file
// in a directory called output.
function renderHtmlPage() {

  const html = render(teamMembers);

  fs.writeFile("output/index.html", html, error =>{
    if (error){
      return console.log(Error)
    } else {
      return console.log(chalk.yellow("Success! 'index.html' file generated in folder 'output'"))
    }
  })

}

// This is our starter function.
createTeam();
