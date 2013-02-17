var WIDTH = 10;
var HEIGHT = 20;
var FPS_HISTORY_DEPTH = 20; // amount of measures of running time to include into calculation of planning FPS
var FPS_CPU_UTILIZATION = 0.1; // between (0 and 1]. percent of cpu used for the game.
var FPS_MIN = 10; // minumum amount of FPS
var FPS_UPDATE_FREQUENCY = 1000; // amount of millesconds between times of displaying fps
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
function get_level(scores) { return parseInt(Math.pow(scores/MULTIPLIER,0.5))+1; }
function get_scores(level) { return Math.pow(level-1,2) * MULTIPLIER; }
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
var LEVEL_TO_SPEED_BASE = 0.7; // how quickly speed will slow down when increasing level:
function sum_of_powers(power, base) { return power==0 ? 1 : Math.pow(base, power) + sum_of_powers(power-1, base*1.02); }

$(function() {
    var stat = new Stat();

    var mainarea = new Gamearea(HEIGHT, WIDTH).init($('#gamearea'));
    var nextfigure = new Gamearea(NEXTFIGURE_HEIGHT, NEXTFIGURE_WIDTH).init($('#nextfigure'));
    var gameplay = new Gameplay(mainarea, nextfigure, stat).init();
    var gameengine = new Gameengine(gameplay, stat).start();

    stat.level.subscribe(function(level){gameengine.set_speed(sum_of_powers(level-1, LEVEL_TO_SPEED_BASE));});

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