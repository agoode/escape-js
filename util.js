
function BitStream(data) {
  this.data = data;
  this.pos = 0;

  this.bitsLeftInByte = 0;
  this.nextByte = 0;

  dp("BitStream dump\n");
  for (var i = 0; i < this.data.length; i++) {
    dp(this.data[i] + "\n");
  }
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
  var s = '';
  while(i != 0) {
    s += String.fromCharCode(this.getByte());
    i--;
  }
  return s;
};

BitStream.prototype.getByte = function() {
  return this.getBits(8);
};

BitStream.prototype.getBit = function() {
  if (this.bitsLeftInByte == 0) {
    if (this.pos >= this.data.length) {
      throw "Array bounds";
    }
    this.nextByte = this.data[this.pos];
    this.pos++;
    
    this.bitsLeftInByte = 8;
  }

  var b = (this.nextByte & 128) == 128;
  this.nextByte <<= 1;
  this.bitsLeftInByte--;
  return b;
};

BitStream.prototype.getBits = function(bits) {
  var bb = 0;

  dp("getBits: bits: " + bits);

  while(bits > 0) {
    bb <<= 1;
    if (this.getBit()) {
      bb++;
    }
    bits--;
  }

  dp(" " + bb.toString(16) + "\n");

  return bb;
};

BitStream.prototype.getRestOfByte = function() {
  return this.getBits(this.bitsLeftInByte);
};



function RLEdecode(stm, len) {

  var result = new Array(len);
  
  // number of bytes to represent one integer
  var bytecount = stm.getByte();

  var bits;
  var framebits = 8;
  if ((bytecount & 128) == 128) {
    if ((bytecount & 64) == 64) {
      framebits = stm.getBits(5);
    }
    bits = bytecount & 63;
  } else {
    if (bytecount > 4) {
      throw "Bad file bytecount";
    }
    bits = bytecount * 8;
  }

  dp("bits: " + bits + ", bytecount: " + bytecount + ", framebits: " + framebits + "\n");

  var run;
  var ri = 0;
  while (ri < len) {
    run = stm.getBits(framebits);
    
    var ch;
    if (run == 0) {
      // anti-run
      run = stm.getBits(framebits);

      dp("skipping " + run + ": ");

      for (var i = 0; i < run; i++) {
	ch = stm.getBits(bits);
	dp(ch + " ");
	result[ri++] = ch;
      }
      dp("\n");
    } else {
      // run
      ch = stm.getBits(bits);

      dp(run + " " + ch + "'s: ");

      for (var i = 0; i < run; i++) {
	dp(ch + " ");
	result[ri++] = ch;
      }
      dp("\n");
    }
  }
  stm.getRestOfByte();
  return result;
}


function dp(p) {
  return;
  var d = document.getElementById("debug");
  if (d.firstChild == null) {
    d.appendChild(document.createTextNode(p));
  } else {
    d.firstChild.appendData(p);
  }
}
