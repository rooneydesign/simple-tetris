var WIDTH = 10;
var HEIGHT = 20;
var FPS = 10; // amount of frames per second
var INITIAL_SPEED = 1; // times to react per second

$(function(){
    var mainarea = new Gamearea();
    var gameplay = new Gameplay().init(mainarea);
    var gameengine = new Gameengine().init(gameplay, mainarea).start();
});