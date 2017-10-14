var readline = require('readline');
var r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

var title = '\nEscape from Duck Dungeon\n';
    title += '<--------------->\n\n';

var map = [
  ['c4q office', 'mobile class', 'fsw class', 'smash lounge'],
  ['hallway', 'hallway', 'kitchen', 'hallway'],
  ['other office 1', 'restrooms', 'elevator', 'other office 2']
];
var turns = 7;
var coordX = 0;
var coordY = 2;

clear();
console.log( title );
console.log('You must escape before you a killed by a duck!');
console.log('Good luck.\n');
console.log( 'You are in the ' + map[coordX][coordY].toUpperCase() + '.');
r.setPrompt('enter N/S/E/W: ');
r.prompt();

r.on('line', function(input) {
  console.log('');
  if( !'nsewNSEW'.includes(input) ) {
    console.log('bad input, minus one turn');
  } else {
/*    if ('sS'.includes(input)) {
      coordX += 1;
    } else if ('nN'.includes(input)) {
      coordX -= 1;
    } else if ('wW'.includes(input)) {
      coordY += 1;
    } else if ('eE'.includes(input)) {
      coordY -= 1;
    }*/
 if ('sS'.includes(input)) {
      coordY -= 1;
    } else if ('nN'.includes(input)) {
      coordY += 1;
    } else if ('wW'.includes(input)) {
      coordX += 1;
    } else if ('eE'.includes(input)) {
      coordX -= 1;
    }
  }
  turns -= 1;

  if (!map[coordX] || !map[coordX][coordY]) {
    console.log('You fall to your death. Game over.');
    return r.close();
  }
  console.log('You are in the ' + map[coordX][coordY].toUpperCase() + '.');

  if (map[coordX][coordY] === 'elevator') {
    console.log('You escape down the elevator. YOU WIN!');
    console.log('(you hear the anguished cry of one giant duck)');
    return r.close();
  }

  console.log('You have ' + turns + ' turns left.');
  if (!turns) {
    console.log('One giant duck eats you before you escape. Game over.');
    return r.close();
  }
  r.prompt();
});
