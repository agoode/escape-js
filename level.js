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

  // maybe load more
  if (!stm.eof()) {
    var nBots = stm.getInt32();
    this.botI = rleDecode(stm, nBots);
    this.botT = rleDecode(stm, nBots);
    
    this.botD = Array(nBots);
    for (var i = 0; i < this.botD.length; i++) {
      this.botD[i] = Level.DIR_DOWN;
    }
  }
}


function loadLevels(placeholder) {
  for (lev in levels) {
    loadLevel(placeholder, levels[lev], lev);
  }
}

function loadLevel(placeholder, lev, name) {
  var l = new Level(lev);

  var t = document.createElement("table");
  t.border = 1;
  t.appendChild(createTableRowText("Magic", l.magic));
  t.appendChild(createTableRowText("Width", l.width));
  t.appendChild(createTableRowText("Height", l.height));
  t.appendChild(createTableRowText("Title", l.title));
  t.appendChild(createTableRowText("Author", l.author));
  t.appendChild(createTableRowText("Player Start", 
				   "(" + l.playerX + "," + l.playerY + ")"));

  if (l.botI) {
    for (var i = 0; i < l.botI.length; i++) {
      var p = l.where(l.botI[i]);
      t.appendChild(createTableRowText("Bot #" + (i+1), 
				       Level.BOT_TYPES[l.botT[i]] 
				       + " at (" + p[0] + "," + p[1] + ")"));
    }
  }

  t.appendChild(createTableRowTiles("tiles", l.tiles, l.width, l.height));
  t.appendChild(createTableRowTiles("otiles", l.oTiles, l.width, l.height));
  t.appendChild(createTableRowTiles("dests", l.dests, l.width, l.height));
  t.appendChild(createTableRowTiles("flags", l.flags, l.width, l.height));


  var h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode(name));
  placeholder.appendChild(h2);
  placeholder.appendChild(t);
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


var levels = new Object();
