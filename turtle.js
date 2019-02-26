const commandsDict = {
  "fd":function(amt){
    turtle.forward(amt);
  },
  "bk":function(amt){
    turtle.forward(-amt);
  },
  "rt":function(angle){
    turtle.right(angle);
  },
  "lt":function(angle){
    turtle.right(-angle);
  },
  "pu":function(){
    turtle.pen = false;
  },
  "pd":function(){
    turtle.pen = true;
  },
  "cs":function(){
    turtle.clean();
  },
  "setpencolor":function(amt){
    turtle.pencolor(getColor(amt));
  },
  "setscreencolor":function(amt){
    turtle.screencolor(getColor(amt));
  }
}
function getColor(val){
  let colors = [];
  colors = val.substring(1, val.length-1).split(' ');
  console.log(colors);
  return colors;
}
class Turtle{
  constructor(x,y,angle){
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
  reset(){
    translate(this.x,this.y);
    rotate(this.angle);
    this.pen = true;
  }
  forward(amt){
    amt = parseInt(amt);
    if(this.pen){
      strokeWeight(1);
      line(0,0,amt,0);
    }
    translate(amt,0)
  }
  right(angle){
    angle = parseInt(angle);
    rotate(angle);
  }
  clean(){
    if(this.pen){
      background(0);
    }
  }
  pencolor(amt){
    if(this.pen){
      stroke(color(parseInt(amt[0]),parseInt(amt[1]), parseInt(amt[2])));
    }
  }
  screencolor(amt){
    if(this.pen){
      background(parseInt(amt[0]),parseInt(amt[1]), parseInt(amt[2]));
    }
  }
}
