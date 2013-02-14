var WIDTH = 10;
var HEIGHT = 20;
var FPS = 60; // amount of frames per second
var INITIAL_SPEED = 1; // cells to fall per second
var SCORES_TABLE = [
           0,  // 0  - zero rows
          2-1, // 1  - one row
        2*2-1, // 3  - two rows
      2*2*2-1, // 7  - three rows
    2*2*2*2-1  // 15 - four rows
];
// amount of scores needed for next level is calculated by formula: f(level): (level - 1) ^ 2 * MULTIPLIER
var MULTIPLIER = 10;
// 0, 10, 40, 90, 160, 250, 360, 490, 640, 810, 1000 ... etc
// 1,  2,  3,  4,   5,   6,   7,   8,   9,  10,   11

// keyboard settings
var KEYBOARD_SPEED = {};
KEYBOARD_SPEED[KEY_UP] = undefined; // make just one action, don't repeat when up key is hold down
// first number - amount of cells to move per second when key on a keyboard is hold down
// second number - amount of milleseconds passed since first keydown event till starting moving when key is hold down
KEYBOARD_SPEED[KEY_LEFT] = [30, 100];
KEYBOARD_SPEED[KEY_RIGHT] = [30, 100];
KEYBOARD_SPEED[KEY_DOWN] = [40, 0];
var DELAY_AFTER_DROP = 50; // amount of milliseconds to wait until last drop was made by user. it's needed to let him shift figure under flange

$(function() {
    var stat = new Stat();

    var mainarea = new Gamearea(HEIGHT, WIDTH).init($('#gamearea'));
    var nextfigure = new Gamearea(NEXTFIGURE_HEIGHT, NEXTFIGURE_WIDTH).init($('#nextfigure'));
    var gameplay = new Gameplay(mainarea, nextfigure, stat).init();
    var gameengine = new Gameengine(gameplay).start();

    stat.level.subscribe(function(level){gameengine.set_speed(level);});

    $(document).keydown(function(e) { gameengine.keydown(e); });
    $(document).keyup(function(e) { gameengine.keyup(e); });
    $('#stop').click(function() {
        if (gameengine.running) {
            gameengine.stop();
            $(this).text('Start');
        } else {
            gameengine.start();
            $(this).text('Pause');
        }
    });


    ko.applyBindings(stat);
});