var imgSuffix = ".png";

// tiles
var tiles32 = new Array();

for (var i = 0; i < 96; i++) {
  tiles32[i] = document.createElement("img");
  tiles32[i].src = "graphics/32x32/tiles/" + i + imgSuffix;
  tiles32[i].width = 32;
  tiles32[i].height = 32;
}


// player
var player32 = new Array();
player32[Level.DIR_UP] = loadPlayerImages("walk_backward", 32);
player32[Level.DIR_DOWN] = loadPlayerImages("walk_forward", 32);
player32[Level.DIR_LEFT] = loadPlayerImages("walk_left", 32);
player32[Level.DIR_RIGHT] = loadPlayerImages("walk_right", 32);


function loadPlayerImages(prefix, size) {
  var a = new Array();
  for (var i = 0; i < 5; i++) {
    a[i] = document.createElement("img");
  }

  var prefix = getAnimPath(size) + prefix + "_";
  a[0].src = prefix + "0" + imgSuffix;
  a[1].src = prefix + "a" + imgSuffix;
  a[2].src = prefix + "a2" + imgSuffix;
  a[3].src = prefix + "b" + imgSuffix;
  a[4].src = prefix + "b2" + imgSuffix;

  return a;
}

// bots
var bots32 = new Array();
bots32[Level.B_BROKEN] = [document.createElement("img")];
bots32[Level.B_DALEK] = [document.createElement("img"), document.createElement("img")];
bots32[Level.B_HUGBOT] = [document.createElement("img"), document.createElement("img")];

bots32[Level.B_BROKEN][0].src = getAnimPath(32) + "deadrobot" + imgSuffix;
bots32[Level.B_DALEK][0].src = getAnimPath(32) + "dalek_forward_0" + imgSuffix;
bots32[Level.B_DALEK][1].src = getAnimPath(32) + "dalek_forward_1" + imgSuffix;
bots32[Level.B_HUGBOT][0].src = getAnimPath(32) + "hugbot_forward_0" + imgSuffix;
bots32[Level.B_HUGBOT][1].src = getAnimPath(32) + "hugbot_forward_1" + imgSuffix;



// util
function getAnimPath(size) {
  return "graphics/" + size + "x" + size + "/animation/";
}
