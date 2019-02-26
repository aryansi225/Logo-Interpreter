let editor;
let turtle;
function setup(){
    createCanvas(1000,1000);
    angleMode(DEGREES);
    turtle = new Turtle(100,100,0);
    editor = select('#logocode');
    editor.input(makeChanges);
    makeChanges();
}
function execute(commands){
  for (let command of commands){
    let name = command.name;
    let arg = command.arg;
    if(name === 'repeat'){
      for(let i=0;i<arg;i++){
        execute(command.commands);
      }
    }
    else{
      commandsDict[name](arg);
    }
  }
}
function makeChanges(){
  background(0);
  push();
  turtle.reset();
  let code = editor.value();
  let parser = new Parser(code);
  let commands = parser.parse();
  execute(commands);
  pop();
}
