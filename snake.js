"use strict"
var canvas = document.getElementById('snake');
var ctx = canvas.getContext('2d');
var options = {
  bg: "#888",
  scolor: "lightgreen",
  acolor: "red",
  map: 2,

}
var fps = 10;
var tilewidth;
var gameover = false;
var score = 0;
var pause = false;
var map2;
var collision = [];

// Food
var ax,ay,vx,vy,px,py;


var apple = [[ax,ay]];
var play = false;
var twoplayer = false;

var player = new Player(tilewidth,0,tilewidth,0,0,0,[ [this.x,this.y] , [this.x - tilewidth,this.y] ],false,0);
var player2 = new Player(canvas.width - 2 * tilewidth,canvas.height - tilewidth,0,0,0,tilewidth,[ [this.x,this.y] , [this.x - tilewidth,this.y] ],false,0);

function Player(x,y,md,ms,mw,ma,snake,double) {
  this.x = x;
  this.y = y;
  this.md = md;
  this.ms = ms;
  this.mw = mw;
  this.ma = ma;
  this.snake = snake;
  this.double = double;
  this.stop = stop;
}

function updateparameters() {
  //Initialiser largeur

  for (var t = 50; (t < window.innerWidth * 0.8) && ( t < window.innerHeight * 0.8); t += 50) {
    canvas.width = t;
  }
  canvas.height = canvas.width;
  tilewidth = canvas.width/50;
  map2 =
  [ [[10*tilewidth,10*tilewidth],[40*tilewidth,10*tilewidth],4],
    [[10*tilewidth,40*tilewidth],[40*tilewidth,40*tilewidth],4],
    [[10*tilewidth,13*tilewidth],[10*tilewidth,38*tilewidth],4],
    [[39*tilewidth,13*tilewidth],[39*tilewidth,38*tilewidth],4]
  ];
}

window.onload = function () {
  updateparameters();
  reset();

  //UPDATE CANVAS
  setInterval( function() {
    if(options.wall === true) {canvas.style.border = "2px dashed lightgreen"}
    else if (options.wall === false) {canvas.style.border = "2px solid #666"}
    if (!twoplayer) {
      move(player);
      draw(player);
    }
    else if (twoplayer) {
      move(player,player2);
      draw(player,player2);
    }
		menu();
  },1000/fps);
}

window.onresize = function() {
  if (!play) {
    updateparameters();
    reset();
  }
}

function reset() {
  score = 0;
  options.scolor = "lightgreen";
  options.wall = true;
  apple = [[Math.floor(Math.random() * canvas.width / tilewidth) * tilewidth,Math.floor(Math.random() * canvas.height / tilewidth) * tilewidth]];

  player.x = tilewidth;
  player.y = 0;
  player.snake = [ [tilewidth,0] , [0,0] ];
  player.ms = 0;
  player.mw = 0;
  player.ma = 0;
  player.md = tilewidth;
  player.double = false;

  if (twoplayer) {
    player2.x = canvas.width - 2 * tilewidth;
    player2.y = canvas.height - tilewidth;
    player2.md = 0;
    player2.ms = 0;
    player2.mw = 0;
    player2.ma= tilewidth;
    player2.snake = [ [canvas.width - 2 * tilewidth, canvas.height - tilewidth] , [canvas.width - 2 * tilewidth + tilewidth, canvas.height - tilewidth]];
    player2.double = false;
  }

  gameover = false;
}

function menu() {
  if (play) {return;}
  else if (!play) {
	 ctx.fillStyle = options.bg;
   ctx.fillRect(0,0,canvas.width,canvas.height);
	 ctx.fillStyle = "black";
	 ctx.textBaseline="middle";
	 ctx.textAlign = "center";
	 ctx.font = 10*tilewidth + "px Tahoma";
   ctx.fillStyle = options.scolor;
	 ctx.fillText("SNAKE", canvas.width/2, canvas.height/2);
   ctx.font = tilewidth + "px Arial";
   ctx.fillStyle = 'black';
	 ctx.fillText("Singleplayer = E", canvas.width/2, canvas.height/2 + 5*tilewidth);
	 ctx.fillText("Twoplayer = Z", canvas.width/2, canvas.height/2 + 6*tilewidth + 3);
   ctx.fillText("Hit Enter to pause the game.", canvas.width/2, canvas.height - tilewidth);
 
  }
}

// CARTOGRAPHIE AU CLAVIER wasd et les fleches

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode == 69 && !play) {
    evt.preventDefault();
    play = true;
    console.log("click!");
  }

  if (evt.keyCode == 90 && !play) {
    evt.preventDefault();
    play = true;
    twoplayer = true;
    reset();
    console.log("click!");
  }

  if (evt.keyCode == 80 && !play) {
    evt.preventDefault();

  }

  if (evt.keyCode == 13 && play) {
    evt.preventDefault();
    pause= !pause;

  }

  if (evt.keyCode == 32 && gameover) {
    evt.preventDefault();
    reset();
  }


  if (evt.keyCode == 77 && gameover) {
    evt.preventDefault();
    reset();
    play = false;
  }


  if (evt.keyCode == 38) {
    evt.preventDefault();
    if (player.ms > 0) {return;}
    else {
      player.mw = tilewidth;
      player.md = 0;
      player.ma = 0;
    }
  }

  else if (evt.keyCode == 40) {
    evt.preventDefault();
    if (player.mw > 0) {return;}
    else {
      player.ms = tilewidth;
      player.md = 0;
      player.ma = 0;
    }
  }

  else if (evt.keyCode == 39) {
    evt.preventDefault();
    if (player.ma > 0) {return;}
    else {
      player.md = tilewidth;
      player.mw = 0;
      player.ms = 0;
    }
  }

  else if (evt.keyCode == 37) {
    evt.preventDefault();
    if (player.md > 0) {return;}
    else {
      player.ma = tilewidth;
      player.mw = 0;
      player.ms = 0;
    }
  }

  //TWOPLAYER
  if (twoplayer) {
    if (evt.keyCode == 87) {
      evt.preventDefault();
      if (player2.ms > 0) {return;}
      else {
        player2.mw = tilewidth;
        player2.md = 0;
        player2.ma = 0;
      }
    }

    else if (evt.keyCode == 83) {
      evt.preventDefault();
      if (player2.mw > 0) {return;}
      else {
        player2.ms = tilewidth;
        player2.md = 0;
        player2.ma = 0;
      }
    }

    else if (evt.keyCode == 68) {
      evt.preventDefault();
      if (player2.ma > 0) {return;}
      else {
        player2.md = tilewidth;
        player2.mw = 0;
        player2.ms = 0;
      }
    }

    else if (evt.keyCode == 65) {
      evt.preventDefault();
      if (player2.md > 0) {return;}
      else {
        player2.ma = tilewidth;
        player2.mw = 0;
        player2.ms = 0;
      }
    }
  }
})

//add food position to snake
function snakegrow(figure,apple) {
  figure.snake.push([apple[0],apple[1]]);
}



function move() {
  for (var a = 0; a < arguments.length; a++) {
    if (play == false || pause) {return;}
    if ( arguments[a].stop > 0) {continue;}

    //position change
    arguments[a].x += arguments[a].md;
    arguments[a].x -= arguments[a].ma;
    arguments[a].y += arguments[a].ms;
    arguments[a].y -= arguments[a].mw;

    //colision handling

    if (options.wall === true) {
      if (arguments[a].x < 0 || arguments[a].x > canvas.width - tilewidth || arguments[a].y < 0 || arguments[a].y > canvas.height - tilewidth) {
        gameover = true;
        return;
      }
    }

    else if (options.wall === false) {
      if (arguments[a].x < 0) {arguments[a].x = canvas.width - tilewidth;}
      if (arguments[a].x > canvas.width - tilewidth) {arguments[a].x = 0;}
      if (arguments[a].y < 0) {arguments[a].y = canvas.height - tilewidth;}
      if (arguments[a].y > canvas.height - tilewidth) {arguments[a].y = 0;}
    }

    if (options.map != 1) {
      for (var s = 0; s < collision.length; s++) {
        if (arguments[a].x == collision[s][0] && arguments[a].y == collision[s][1]) {
          gameover = true;
          return;
        }
      }
    }

   // Move arguments[a].snake: shift all bodypart positions to the position off the previous bodypart
    for (var i = arguments[a].snake.length - 1; i > 0; i--) {
      arguments[a].snake[i][0] = arguments[a].snake[i-1][0];
      arguments[a].snake[i][1] = arguments[a].snake[i-1][1];
    }
    // Set the position of the head to x and y
    arguments[a].snake[0][1] = arguments[a].y;
    arguments[a].snake[0][0] = arguments[a].x;

    // Vérifiez si le serpent s'est mangé
    for (var f = 4; f < arguments[a].snake.length; f++) {
      if (arguments[a].snake[0][0] == arguments[a].snake[f][0] && arguments[a].snake[0][1] == arguments[a].snake[f][1]) {
        gameover = true;
      }
    }

   //si le serpent «mange» la pomme, obtenez une nouvelle position aléatoire pour le food et laissez le serpent grandir
   for (var b = 0; b < apple.length; b++) {
     if (arguments[a].x == apple[b][0] && arguments[a].y == apple[b][1]) {
       score += 1;
       for (var t = 0; t < 1; t++) {
         snakegrow(arguments[a],apple[b]);
       }
       // calculatepos(ax,ay);
       ax = Math.floor(Math.random() * canvas.width / tilewidth) * tilewidth;
       ay = Math.floor(Math.random() * canvas.height/ tilewidth) * tilewidth;



       // LES POMMES NE SONT PAS SUPPRIMÉES!
       apple[b] = [];

       apple[0][0] = ax;
       apple[0][1] = ay;
      }
    }
  
	}
}


function draw() {
  ctx.fillStyle = options.bg;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  document.getElementById('score').innerHTML = score;
  drawmap();
  if (gameover) {
    ctx.fillStyle = options.bg;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "red";
    ctx.textBaseline="middle";
    ctx.textAlign = "center";
    ctx.font = tilewidth*3 + "px Arial";
    ctx.fillText("GAME OVER!", canvas.width/2, canvas.height/2);
    ctx.font = tilewidth + "px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("You have reached following score: " + score, canvas.width/2, canvas.height/2 + tilewidth*2);
    ctx.fillText("Press the spacebar to play again.", canvas.width/2, canvas.height - tilewidth);
    ctx.fillText("Press M to get back to the menu.", canvas.width/2, canvas.height - tilewidth*2);
  }

  else if (!gameover){

    ctx.fillStyle = options.acolor;
    for (var a = 0; a < apple.length; a++) {
      ctx.fillRect(apple[a][0],apple[a][1],tilewidth,tilewidth)
    }



    if (options.dark === true && play) {
      var radius = 5;
      // WORKS FOR ONE PLAYER
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.rect(0,0,canvas.width,canvas.height);
      ctx.moveTo(arguments[0].snake[0][0] - radius * tilewidth,arguments[0].snake[0][1] - radius * tilewidth);
      ctx.rect(arguments[0].snake[0][0] - radius * tilewidth,arguments[0].snake[0][1] - radius * tilewidth, ((2* radius)+1) * tilewidth, ((2 * radius) + 1) * tilewidth);
      ctx.moveTo(0,0);
      if (twoplayer) {
       ctx.moveTo(arguments[1].snake[0][0] - radius * tilewidth,arguments[1].snake[0][1] - radius * tilewidth);
       ctx.rect(arguments[1].snake[0][0] - radius * tilewidth,arguments[1].snake[0][1] - radius * tilewidth, ((2* radius)+1) * tilewidth, ((2* radius)+1) * tilewidth);
      }
      ctx.fill('evenodd');
    }

    ctx.fillStyle = options.scolor;
    for (var k = 0; k < arguments.length; k++) {
      for (var i = 0; i < arguments[k].snake.length; i++) {
        ctx.fillRect(arguments[k].snake[i][0],arguments[k].snake[i][1],tilewidth,tilewidth);
      }
      if (arguments[k].stop > 0) {(arguments[k].stop)--;}
    }
  }
}

function drawmap() {
  if (options.map != 1) {
    var map = window['map' + options.map];
    for (var b = 0; b < map.length; b++) {
      for (var w = map[b][0][0]; w < map[b][1][0]; w += tilewidth) {
        if (map[b][3] == 0) {
         ctx.fillStyle = "black";
         ctx.fillRect(w,map[b][0][1],tilewidth,tilewidth);
         collision.push([w,map[b][0][1]]);
        }
       
      }
      for (var h = map[b][0][1]; h < map[b][1][1]; h += tilewidth) {
        if (map[b][3] == 0) {
         ctx.fillStyle = "black";
         ctx.fillRect(map[b][0][0],h,tilewidth,tilewidth);
         collision.push([map[b][0][0],h]);
        }
        
      }
    }
  }
}

