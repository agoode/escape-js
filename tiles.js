var graphicsBase = "http://escape.evdebs.org/graphics/";
var imgSuffix = ".png";

// tiles
var tiles32 = new Array();

for (var i = 0; i < 96; i++) {
  tiles32[i] = graphicsBase + "32x32/tiles/" + i + imgSuffix;
}


// player
var player32 = new Array();
player32[Level.DIR_UP] = loadPlayerImages("walk_backward", 32);
player32[Level.DIR_DOWN] = loadPlayerImages("walk_forward", 32);
player32[Level.DIR_LEFT] = loadPlayerImages("walk_left", 32);
player32[Level.DIR_RIGHT] = loadPlayerImages("walk_right", 32);


function loadPlayerImages(prefix, size) {
  var a = new Array();

  var prefix = getAnimPath(size) + prefix + "_";
  a[0] = prefix + "0" + imgSuffix;
  a[1] = prefix + "a" + imgSuffix;
  a[2] = prefix + "a2" + imgSuffix;
  a[3] = prefix + "b" + imgSuffix;
  a[4] = prefix + "b2" + imgSuffix;

  return a;
}

// bots
var bots32 = new Array();
bots32[Level.B_BROKEN] = new Array();
bots32[Level.B_DALEK] = new Array();
bots32[Level.B_HUGBOT] = new Array();

bots32[Level.B_BROKEN][0] = getAnimPath(32) + "deadrobot" + imgSuffix;
bots32[Level.B_DALEK][0] = getAnimPath(32) + "dalek_forward_0" + imgSuffix;
bots32[Level.B_DALEK][1] = getAnimPath(32) + "dalek_forward_1" + imgSuffix;
bots32[Level.B_HUGBOT][0] = getAnimPath(32) + "hugbot_forward_0" + imgSuffix;
bots32[Level.B_HUGBOT][1] = getAnimPath(32) + "hugbot_forward_1" + imgSuffix;



// util
function getAnimPath(size) {
  return graphicsBase + size + "x" + size + "/animation/";
}
