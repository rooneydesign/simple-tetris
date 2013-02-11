var WIDTH = 10;
var HEIGHT = 20;
var FPS = 10; // amount of frames per second
var INITIAL_SPEED = 1; // cells to fall per second
var KEYBOARD_SPEED = 5; // cells to move per second when key on a keyboard is pressed
var DOWN_KEYBOARD_SPEED = 1; // cells to move per second when down key on a keyboard is pressed

$(function() {
    var mainarea = new Gamearea();
    var gameplay = new Gameplay(mainarea);
    var gameengine = new Gameengine().init(gameplay, mainarea).start();

    $(document).keydown(function(e) { gameengine.keydown(e); });
    $(document).keyup(function(e) { gameengine.keyup(e); });
});