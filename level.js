function Level(l) {
  this.origLevel = l;

  var stm = new BitStream(l);

  this.magic = stm.getString(4);

  if (this.magic != "ESXL") {
    throw "Bad magic";
  }

  this.width = stm.getInt32();
  this.height = stm.getInt32();
  
  var size;
  size = stm.getInt32();
  this.title = stm.getString(size);
  size = stm.getInt32();
  this.author = stm.getString(size);

  this.playerX = stm.getInt32();
  this.playerY = stm.getInt32();
  this.playerD = Level.DIR_DOWN;

  this.tiles = rleDecode(stm, this.width * this.height);
  this.oTiles = rleDecode(stm, this.width * this.height);
  this.dests = rleDecode(stm, this.width * this.height);
  this.flags = rleDecode(stm, this.width * this.height);

  // initalize html elements
  this.elements = new Array(this.tiles.length);
  for (var i = 0; i < this.tiles.length; i++) {
    this.elements[i] = document.createElement("img");
    this.elements[i].width = 32;
    this.elements[i].height = 32;
  }

  this.playerElement = document.createElement("img");
  this.playerElement.className = "sprite";

  // maybe load more
  if (!stm.eof()) {
    var nBots = stm.getInt32();
    this.botI = rleDecode(stm, nBots);
    this.botT = rleDecode(stm, nBots);
    
    this.botD = Array(nBots);
    this.botE = Array(nBots);
    for (var i = 0; i < this.botD.length; i++) {
      this.botD[i] = Level.DIR_DOWN;
      this.botE[i] = document.createElement("img");
      this.botE[i].className = "sprite";
    }
  }
}

function loadLevels() {
  var z = document.createDocumentFragment();
  for (lev in levels) {
    loadLevel(z, levels[lev], lev);
  }
  document.getElementById('levels').appendChild(z);
}

var frame = 0;
function animate() {
  var ee = levels["lev412"].playerElement;
  
  ee.src = player32[Level.DIR_DOWN][(frame++) % 5];

  setTimeout("animate()", 500);
}

function loadLevel(placeholder, lev, name) {
  var l = new Level(lev);
  levels[name] = l;

  var h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode(name));
  placeholder.appendChild(h2);

  var t = document.createElement("table");
  t.border = 1;
  var tb = document.createElement("tbody");
  //  tb.appendChild(createTableRowText("Magic", l.magic));
  tb.appendChild(createTableRowText("Width", l.width));
  tb.appendChild(createTableRowText("Height", l.height));
  //  tb.appendChild(createTableRowText("Title", l.title));
  //  tb.appendChild(createTableRowText("Author", l.author));
  tb.appendChild(createTableRowText("Player Start", 
				    "(" + l.playerX + "," + l.playerY + ")"));
  /*
  if (l.botI) {
    for (var i = 0; i < l.botI.length; i++) {
      var p = l.where(l.botI[i]);
      tb.appendChild(createTableRowText("Bot #" + (i+1), 
				       Level.BOT_TYPES[l.botT[i]] 
				       + " at (" + p[0] + "," + p[1] + ")"));
    }
  }

  tb.appendChild(createTableRowTiles("tiles", l.tiles, l.width, l.height));
  tb.appendChild(createTableRowTiles("otiles", l.oTiles, l.width, l.height));
  tb.appendChild(createTableRowTiles("dests", l.dests, l.width, l.height));
  tb.appendChild(createTableRowTiles("flags", l.flags, l.width, l.height));
  */

  var h3 = document.createElement("h3");
  h3.appendChild(document.createTextNode(l.title + " by " + l.author));
  placeholder.appendChild(h3);

  var d = makeLevelTiles(l);

  var p = l.playerElement;
  p.src = player32[l.playerD][0];
  d.appendChild(p);

  if (l.botI) {
    for (var i = 0; i < l.botI.length; i++) {
      var b = l.botE[i];
      b.src = bots32[l.botT[i]][0];
      d.appendChild(b);
    }
  }

  var canvas = document.createElement("div");
  canvas.className = "levelcanvas";

  if (l.height > 20) {
    canvas.style.height = (20 * 32 + 8) + "px";
  }
  canvas.appendChild(d);

  placeholder.appendChild(canvas);

  t.appendChild(tb);
  placeholder.appendChild(t);

  l.updateSprites();
}

function makeKeyHandler(t) {
  return function (e) {
    switch (e.keyCode) {
    case e.DOM_VK_LEFT:
      t.curX -= 32;
      t.style.left = t.curX + "px";
      e.preventDefault();
      break;
    case e.DOM_VK_RIGHT:
      t.curX += 32;
      t.style.left = t.curX + "px";
      e.preventDefault();
      break;
    case e.DOM_VK_UP:
      t.curY -= 32;
      t.style.top = t.curY + "px";
      e.preventDefault();
      break;
    case e.DOM_VK_DOWN:
      t.curY += 32;
      t.style.top = t.curY + "px";
      e.preventDefault();
      break;
    default:
      alert(e.charCode);
    }
  };
}

function makeLevelTiles(l) {
  var p = document.createElement("div");
  p.style.margin = "8px";
  p.style.position = "relative";
  p.curX = 0;
  p.curY = 0;

  document.addEventListener("keypress", makeKeyHandler(p), true);

  for (var i = 0; i < l.elements.length; i++) {
    var el = l.elements[i];
    
    p.appendChild(el);
    if (i % l.width == l.width - 1) {
      var br = document.createElement("br");
      p.appendChild(br);
    }
  }

  return p;
}

function createTableRowTiles(title, tiles, w, h) {
  var pre = document.createElement("pre");
  pre.appendChild(document.createTextNode(tilesToString(tiles, 
							w, h)));
  return createTableRow(document.createTextNode(title), pre);
}

function createTableRowText(a,b) {
  return createTableRow(document.createTextNode(a),
			document.createTextNode(b));
}

function createTableRow(a,b) {
  var tr;
  var td;

  tr = document.createElement("tr");
  td = document.createElement("td");
  td.appendChild(a);
  tr.appendChild(td);
  td = document.createElement("td");
  td.appendChild(b);
  tr.appendChild(td);

  return tr;
}


function tilesToString(t, w, h) {
  var s = "";
  for (var j = 0; j < h; j++) {
    for (var i = 0; i < w; i++) {
      s += String.fromCharCode(t[j*w + i] + 32);
    }
    s += "\n";
  }
  return s;
}



Level.DIR_NONE = 0;
Level.DIR_UP = 1;
Level.DIR_DOWN = 2;
Level.DIR_LEFT = 3;
Level.DIR_RIGHT = 4;

Level.B_BROKEN = 0;
Level.B_DALEK = 1;
Level.B_HUGBOT = 2;

Level.BOT_TYPES = ["Broken", "Dalek", "Hugbot"];


Level.prototype.where = function(idx) {
  var x = idx % this.width;
  var y = idx / this.width;

  return [x,Math.floor(y)];
};

Level.prototype.updateSprites = function() {
  var zOffset = 5;

  this.playerElement.style.left = (this.playerX * 32) + "px";
  this.playerElement.style.top = (this.playerY * 32 - (pHeight32 - 32)) + "px";
  this.playerElement.style.zIndex = this.playerY + zOffset;

  if (this.botI) {
    for (var i = 0; i < this.botI.length; i++) {
      var b = this.botE[i];
      var w = this.where(this.botI[i]);
      
      b.style.left = (w[0] * 32) + "px";
      b.style.top = (w[1] * 32 - (bHeight32[this.botT[i]] - 32)) + "px";
      b.style.zIndex = w[1] + zOffset;
    }
  }
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].src = tiles32[this.tiles[i]];
  }
};

