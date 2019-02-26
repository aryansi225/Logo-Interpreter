class Parser{
  constructor(text){
    this.text = text;
    this.index = 0;
  }
  hasRemainingToken(){
    return this.index < this.text.length;
  }
  getRepeat(){
    let start = 0;
    let end = 0;
    while(this.text.charAt(this.index++) !== '[' && this.hasRemainingToken())
    start = this.index+1;
    let bracketCount = 1;
    while (bracketCount > 0){
      let char = this.text.charAt(this.index++);
      if(char==='['){
        bracketCount++;
      }else if(char===']'){
        bracketCount--;
      }
    }
    end = this.index;
    return this.text.substring(start, end);
  }
  nextToken(){
    let token='';
    let char = this.text.charAt(this.index);
    if (char === ' '){
      this.index++;
      return this.nextToken();
    }
    if(char === '[' || char === ']'){
      this.index++;
      return char;
    }
    while(char!=' ' && this.hasRemainingToken()){
      token += char;
      char=this.text.charAt(++this.index);
    }
    return token
  }
  getColor(){
    let start = 0;
    let end = 0;
    if(this.text.length > this.index + 13){
      while(this.text.charAt(this.index++) !== '[')
      start = this.index;
      while(this.text.charAt(this.index++) !== ']')
      end = this.index;
      return this.text.substring(start, end+1);
    }
  }
  parse(){
    let commands = [];
    while(this.hasRemainingToken()){
      let token = this.nextToken();
      if(token === "fd" || token === "bk" || token === "lt" || token === "rt"){
        let cmd = new Command(token, this.nextToken());
        commands.push(cmd);
      }else if(token === "pu" || token === "pd"){
        let cmd = new Command(token);
        commands.push(cmd);
      }else if(token === "repeat"){
        let cmd = new Command(token, this.nextToken());
        let repeatWhat = this.getRepeat();
        let parser = new Parser(repeatWhat);
        cmd.commands = parser.parse();
        commands.push(cmd);
      }else if(token === "cs"){
        let cmd = new Command(token);
        commands.push(cmd);
      }else if(token === "setpencolor" || token === "setscreencolor"){
        let cmd = new Command(token);
        cmd.arg = this.getColor();
        commands.push(cmd);
      }
    }
    return commands;
  }
}
