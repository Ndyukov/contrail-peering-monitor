var KeyHandler = function(){
  this.type = 'KeyHandler';
  this.focus = 0;
  this.views = [];
}

var moveNext = function(self, screen){
  screen.key(['C-right'], function(ch, key) {
    self.views[self.focus].rows.interactive = false;
    self.focus = (self.focus + 1) % self.views.length;
    self.views[self.focus].focus();
  });
}

var movePrevious = function(self, screen){
  screen.key(['C-left'], function(ch, key){
    self.views[self.focus].rows.interactive = false;
    self.focus = (self.focus + self.views.length - 1) % self.views.length;
    self.views[self.focus].focus();
  });
}

var exit = function(screen){
  screen.key(['escape', 'q', 'C-c'], function(ch, key){
    return process.exit(0);
  });
}

KeyHandler.prototype.setupHandler = function(screen){
  exit(screen);
  moveNext(this, screen);
  movePrevious(this, screen);
};

KeyHandler.prototype.registerView = function(view){
  this.views.push(view);
  if(this.focus == this.views.length-1){
    this.views[this.focus].focus();
  }
};

KeyHandler.prototype.clear = function(){
  for(i in this.views){
    this.views.pop();
  }
};

module.exports = KeyHandler;
