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
}


function loadLevel(placeholder, location) {
  var l = new Level(location.firstChild.data);

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

function BitStream(s) {
  this.str = s;
  this.pos = 0;

  this.bitsLeftInByte = 0;
  this.nextByte = 0;
}

BitStream.prototype.getInt32 = function() {
  var r = 0;

  r += this.getByte() << 24;
  r += this.getByte() << 16;
  r += this.getByte() << 8;
  r += this.getByte();

  return r;
};

BitStream.prototype.getString = function(i) {
  this.getRestOfByte();
  var s = this.str.substring(this.pos, this.pos + i);
  this.pos += i;
  return s;
};

BitStream.prototype.getByte = function() {
  var b = this.str.charCodeAt(this.pos);
  this.pos++;
  return b;
};

BitStream.prototype.getBit = function() {
  if (this.bitsLeftInByte == 0) {
    this.nextByte = getByte();
  }

  var b = (this.nextByte & 128) == 128;
  this.nextByte <<= 1;
  this.bitsLeftInByte--;
  return b;
};

BitStream.prototype.getBits = function(bits) {
  var bb = 0;
  while(bits > 0) {
    bb <<= 1;
    if (this.getBit()) {
      bb++;
    }
    bits--;
  }

  return bb;
};

BitStream.prototype.getRestOfByte = function() {
  return this.getBits(this.bitsLeftInByte);
};
