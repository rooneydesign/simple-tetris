
var Stat = function () {
    this.scores = ko.observable('scores');
    this.level = ko.computed(function() {return get_level(this.scores())}, this);
    this.percent_completed = ko.computed(function(){ var floor = get_scores(this.level()); return ((this.scores() - floor) / (get_scores(this.level()+1) - floor) * 100) + '%'; }, this);
    this.fps = ko.observable('fps');
};