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
  t.appendChild(createTableRow("Magic", l.magic));
  t.appendChild(createTableRow("Width", l.width));
  t.appendChild(createTableRow("Height", l.height));
  t.appendChild(createTableRow("Title", l.title));
  t.appendChild(createTableRow("Author", l.author));
  t.appendChild(createTableRow("Player X", l.playerX));
  t.appendChild(createTableRow("Player Y", l.playerY));

  placeholder.parentNode.replaceChild(t, placeholder);
}


function createTableRow(a,b) {
  var tr;
  var td;

  tr = document.createElement("tr");
  td = document.createElement("td");
  td.appendChild(document.createTextNode(a));
  tr.appendChild(td);
  td = document.createElement("td");
  td.appendChild(document.createTextNode(b));
  tr.appendChild(td);

  return tr;
}
