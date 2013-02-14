// amount of scores needed for next level is calculated by formula: f(level): (level - 1) ^ 2 * MULTIPLIER
var MULTIPLIER = 10;
// 0, 10, 40, 90, 160, 250, 360, 490, 640, 810, 1000
// 1,  2,  3,  4,   5,   6,   7,   8,   9,  10,   11

function get_level(scores) { return parseInt(Math.pow(scores/MULTIPLIER,0.5))+1; }
function get_scores(level) { return Math.pow(level-1,2) * MULTIPLIER; }

var Stat = function () {
    this.scores = ko.observable('scores');
    this.level = ko.computed(function() {return get_level(this.scores())}, this);
    this.percent_completed = ko.computed(function(){ var floor = get_scores(this.level()); return (this.scores() - floor) / (get_scores(this.level()+1) - floor) * 100; }, this);
};