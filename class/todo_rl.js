const RL = require('readline');
let rl = RL.createInterface({input: process.stdin,
                             output: process.stdout,
                             prompt: "Enter command (HELP for commands, QUIT to exit): "});

var TODOS = []
function mkTodo(desc, completed) {
    return {task: desc, completed: completed};
}

rl.prompt();
rl.on('line', (line) => {
    let toks = line.trim().split(/[ \t]/);
    switch (toks.shift().toUpperCase()) {
         case 'ADD':
              // if last arg is true/false, mark as such and pop it
              let completion = false;
              switch (toks[toks.length-1].toUpperCase()) {
                case 'TRUE':
                      completion = true;
                      toks.pop();
                      break;
                case 'FALSE':
                      completion = false;
                      toks.pop();
                      break;
              }
              if (toks.length < 1) {
                   console.log("Unsufficient number of args: expected ADD <task> [<completion>]");
                   break;
              } else {
                TODOS.push(mkTodo(toks.join(' '), completion));
	      }
              break;
	 case 'TOGGLE':
		    let taskID = Number.parseInt(toks[0]);
		    if (toks[0] === undefined || Number.isNaN(taskID)) {
			    console.log("Expected argument: number task ID");
		    } else if (TODOS.length === 0) {
			    console.log("Task list empty");
		    } else if (taskID < 1 || taskID > TODOS.length) {
			    console.log(`TaskID out of range, valid ranges is 1-${TODOS.length}`);
		    } else {
			    // Flip
			    TODOS[taskID-1].completed ^= true;
		    }
		    break;
         case 'SHOW':
		    if (TODOS.length === 0) {
			    console.log("No tasks.");
			    break;
		    }
		    if (toks.length === 0 || toks[0].toUpperCase() === 'ALL')
              		TODOS.forEach((todo) => console.log(`\t * ${todo.task}, completed: ${todo.completed ? "Yes" : "No"}`));
		    else if (toks[0].toUpperCase() === 'ACTIVE')
              		TODOS.forEach((todo) => todo.completed ? {} : console.log(`\t * ${todo.task}, completed: ${todo.completed ? "Yes" : "No"}`));
		    else if (toks[0].toUpperCase() === 'COMPLETED')
              		TODOS.forEach((todo) => todo.completed ? console.log(`Tasks:\t * ${todo.task}, completed: ${todo.completed ? "Yes" : "No"}`) : {});
		    else
			    console.log("Unrecognized argument to SHOW");
              break;
	 case 'HELP':
		    console.log("Commands:\n\tADD TASK [COMPLETION=true/false]\n\t"
			    +   "SHOW [all(default)/active/completed]\n\t"
			    +   "TOGGLE <ID>");
		    break;
         case 'QUIT':
	      process.exit();
	      break;
         default:
              console.log("Invalid command.");
              break;
    }
    rl.prompt();
});
