function Level(l) {
  this.lev = l;

  var stm = new BitStream(l);

  this.magic = stm.getString(4);
  this.width = stm.getInt32();
  this.height = stm.getInt32();
  
  var size;
  size = stm.getInt32();
  this.title = stm.getString(size);
  size = stm.getInt32();
  this.author = stm.getString(size);

  this.playerX = stm.getInt32();
  this.playerY = stm.getInt32();

  this.tiles = RLEdecode(stm, this.width * this.height);
  this.oTiles = RLEdecode(stm, this.width * this.height);
  this.dests = RLEdecode(stm, this.width * this.height);
  this.flags = RLEdecode(stm, this.width * this.height);
}


function loadLevel(placeholder, location) {
  var l = new Level(level);

  var t = document.createElement("table");
  t.appendChild(createTableRowText("Magic", l.magic));
  t.appendChild(createTableRowText("Width", l.width));
  t.appendChild(createTableRowText("Height", l.height));
  t.appendChild(createTableRowText("Title", l.title));
  t.appendChild(createTableRowText("Author", l.author));
  t.appendChild(createTableRowText("Player X", l.playerX));
  t.appendChild(createTableRowText("Player Y", l.playerY));
  t.appendChild(createTableRowTiles("tiles", l.tiles, l.width, l.height));
  t.appendChild(createTableRowTiles("otiles", l.oTiles, l.width, l.height));
  t.appendChild(createTableRowTiles("dests", l.dests, l.width, l.height));
  t.appendChild(createTableRowTiles("flags", l.flags, l.width, l.height));


  placeholder.parentNode.replaceChild(t, placeholder);
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
