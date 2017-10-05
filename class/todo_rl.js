const RL = require('readline');
let rl = RL.createInterface({input: process.stdin,
                             output: process.stdout,
                             prompt: "Enter command (ADD/LIST/QUIT): "});

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
         case 'LIST':
              TODOS.forEach((todo) => console.log(`Task: ${todo.task}, completed: ${todo.completed}`));
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
