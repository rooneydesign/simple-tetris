var WIDTH = 10;
var HEIGHT = 20;
var FPS = 60; // amount of frames per second
var INITIAL_SPEED = 1; // cells to fall per second

// keyboard settings
var KEYBOARD_SPEED = {};
KEYBOARD_SPEED[KEY_UP] = undefined; // make just one action, don't repeat when up key is hold down
// first number - amount of cells to move per second when key on a keyboard is hold down
// second number - amount of milleseconds passed since first keydown event till starting moving when key is hold down
KEYBOARD_SPEED[KEY_LEFT] = [30, 100];
KEYBOARD_SPEED[KEY_RIGHT] = [30, 100];
KEYBOARD_SPEED[KEY_DOWN] = [40, 0];

$(function() {
    var stat = new Stat();

    var mainarea = new Gamearea();
    var nextfigure = new Gamearea();
    var gameplay = new Gameplay(mainarea, nextfigure, stat);
    var gameengine = new Gameengine().init(gameplay, mainarea, nextfigure).start();

    $(document).keydown(function(e) { gameengine.keydown(e); });
    $(document).keyup(function(e) { gameengine.keyup(e); });

    ko.applyBindings(stat);
});