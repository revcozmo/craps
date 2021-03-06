function makeDie(sides){
  sides = (typeof sides == 'undefined') ? 6 : sides;

  return {
    value: false,
    roll: function(){
      this.value = UTILS.getRandomNumber(sides);
      return this.value;
    },
    validate: function(){
      if( (this.value < 1) || (this.value > sides) ){
        return false;
      }
      return true;
    }
  };
}

var roller = null;

function makeDice(n){
  count = (typeof n == 'undefined') ? 2 : n;

  var d = [];
  for(var i=0; i<count; i++){
    d.push(makeDie(6));
  }

  return {
    dice: d,
    total: 0,
    roll: function(callback){
      //_CRAPS.output("Rolling...");
      self = this;
      if(colors){
        var pips = colors['dicePips'];
        var red = parseInt(pips.slice(1,3), 16)
        var blue = parseInt(pips.slice(3,5), 16)
        var green = parseInt(pips.slice(5,7), 16)
        if(((red + blue + green) / 3) < 128){
          if(colors['dice'] == "#FFFFFF"){
            colors['dicePips'] = "#D8D8D8"
          } else {
            colors['dicePips'] = "#FFFFFF"
          }
        } else {
          if(colors['dice'] == "#000000"){
            colors['dicePips'] = "#282828"
          } else {
            colors['dicePips'] = "#000000"
          }
        }
      }
      roller = setInterval(function(){
        _dice = self.dice;
        _total = self.total;
        _total = 0;
        for(var i in _dice){_total += _dice[i].roll();}
        draw(Board);
        }, 200);
      setTimeout(function(){
        _dice = self.dice;
        _total = self.total;
        _total = 0;
        for(var i in _dice){_total += _dice[i].roll();}
        draw(Board);
        clearInterval(roller);
        roller = null;
        callback(_total);
      }, DICE_ROLL);
    },
    validate: function(){
      for(var i in this.dice){
        if(!this.dice[i].validate()){
          return false;
        }
      }
      return true;
    },
    getArray: function(){
      var a = [];
      for(var i in this.dice){
        a.push(this.dice[i].value);
      }
      return a;
    }
  };
}
