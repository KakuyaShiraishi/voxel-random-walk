var boxSz = 250;
var walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  for (var i = 0; i < 10; i++) {
    walkers[i] = new Walker();
  }

}

function draw() {
  background(0, 0, 0);
  
  // lights
  ambientLight(170); // mid bright
  pointLight(10, 10, 10, -boxSz, 0, 0); // warm yellow
  pointLight(100/*65*/, 100/*5*/, 100/*250*/, boxSz, 0, 0); // dark purple 
  directionalLight(50, 50, 50, 0, boxSz, 0); // light purple


  // rotate scene
  rotateY(frameCount * 0.005);
  
  // display walkers
  for (var i = 0; i < walkers.length; i++) {
    walkers[i].display();
  }
  
  // move walkers
  for (var i = 0; i < walkers.length; i++) {
    walkers[i].move();
  }


  // DRAW OUTLINE BOX
  stroke(255);
  //front
  /*
  line(-boxSz, -boxSz, boxSz, boxSz, -boxSz, boxSz);
  line(-boxSz, boxSz, boxSz, boxSz, boxSz, boxSz);
  line(-boxSz, -boxSz, boxSz, -boxSz, boxSz, boxSz);
  line(boxSz, -boxSz, boxSz, boxSz, boxSz, boxSz);

  //back
  line(-boxSz, -boxSz, -boxSz, boxSz, -boxSz, -boxSz);
  line(-boxSz, boxSz, -boxSz, boxSz, boxSz, -boxSz);
  line(-boxSz, -boxSz, -boxSz, -boxSz, boxSz, -boxSz);
  line(boxSz, -boxSz, -boxSz, boxSz, boxSz, -boxSz);

  //left top
  line(-boxSz, -boxSz, boxSz, -boxSz, -boxSz, -boxSz);
  //left bottom
  line(-boxSz, boxSz, -boxSz, -boxSz, boxSz, boxSz);
  //right top
  line(boxSz, -boxSz, boxSz, boxSz, -boxSz, -boxSz);
  // // right bottom
  line(boxSz, boxSz, -boxSz, boxSz, boxSz, boxSz);
*/

} // draw

function Walker() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.walkerBoxSz = boxSz / 10;
  this.walkerDist;
  this.trail = []; // history of positions

  this.boxMv = 0;

  this.whichColor = [
    color("#D7AEF3"/*255, 0, 255*/), // magenta
    color("#94F6F2"/*135, 0, 235*/), // purple
    color("#F7F680"/*0, 50, 255*/), // deep blue
    color("#FBD0F5"/*0, 255, 125*/), // aqua green
    color("#649DAD"/*135, 255, 50*/), // acid green
    color("#FFAAA5"/*255, 185, 0*/) // warm yellow
  ];


  this.material = this.whichColor[int(random(0, this.whichColor.length))];
  //color(100,100,100); //color(int(random(255)), int(random(255)), int(random(255)) );

  this.display = function() {
    // push();
    // translate(this.x, this.y, this.z);
    // box(this.walkerBoxSz);
    // pop();


    for (var i = 0; i < this.trail.length; i++) {
      var pos = this.trail[i];
      push();
      translate(pos.x, pos.y, pos.z);
      ambientMaterial(this.material);
      box(this.walkerBoxSz / 2);
      pop();
    }

  }
  this.move = function() {
    var whichDir = random(0, 100); // which direction to move

    // right/left along x axis  
    if (whichDir < 33) {
      this.x += int(random(-2, 2)) * (this.walkerBoxSz);
      this.x = constrain(this.x, -boxSz + (this.walkerBoxSz / 2), boxSz - (this.walkerBoxSz / 2));
      //println(this.x);

      // up/down along y axis
    } else if (whichDir >= 33 && whichDir < 66) {
      this.y += int(random(-2, 2)) * (this.walkerBoxSz);
      this.y = constrain(this.y, -boxSz + (this.walkerBoxSz / 2), boxSz - (this.walkerBoxSz / 2));
      //println("y: " + this.y);

    } else {
      this.z += int(random(-2, 2)) * (this.walkerBoxSz);
      this.z = constrain(this.z, -boxSz + (this.walkerBoxSz / 2), boxSz - (this.walkerBoxSz / 2));
    }


    // save history/trail
    var v = createVector(this.x, this.y, this.z);
    this.trail.push(v);

    if (this.trail.length >175) {
      this.trail.splice(0, 1);
    }

  }




} // Walker


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}