function Level(l) {
  this.location = l;
}


function loadLevel(placeholder, location) {
  var l = new Level(location);

  var p = document.createElement("p");
  p.appendChild(document.createTextNode(l.getLocation()));

  placeholder.parentNode.replaceChild(p, placeholder);
}



Level.prototype.getLocation = function() {
  return this.location;
}
