var KEY_LEFT = "37";
var KEY_UP = "38";
var KEY_RIGHT = "39";
var KEY_DOWN = "40";
var KEY_ALL = [KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN];

var Gameengine = function(gameplay, stat) {
    this.act_timer = new Date().getTime();
    this.speed = INITIAL_SPEED;
    this.amount_of_acts = 0;
    this.running = false;
    this.fps_timer = new Timer(FPS_HISTORY_DEPTH * 2);
    this.fps_shown = new Date().getTime();
    this.keys = {
       // key: { timer: new Date().getTime(), amount: 0 }
    };
    this.acting = false;
    this.pressing = false;

    this.act = function () {
        gameplay.act();
        return this;
    };

    this.set_speed = function (speed) {
        if (this.speed != speed) {
            this.speed = speed;
            this.runStepInit();
        }
        return this;
    };

    this.step_keyboard = function (key, timings) {
        var now = new Date().getTime();
        var keypress;
        var speed = KEYBOARD_SPEED[key];
        if (speed) { // if speed is defined, e.g. several keypresses at a row
            var amount_of_millis_for_every_keypress = 1 / speed[0] * 1000;
            var current_amount_of_keypresses = Math.floor((now - timings.timer - (timings.amount > 0 ? speed[1] : 0)) / amount_of_millis_for_every_keypress);
            keypress = current_amount_of_keypresses >= timings.amount;
        } else {
            keypress = timings.amount == 0; // because we want only single keypress
        }

        if (keypress) {
            if (!this.acting && !this.pressing) { // to avoid concurrent access, we refuse keypress() if there is a parallel act or keypress event
                this.pressing = true;
                try {
                    timings.amount += 1;
                    this.keypress(key);
                }
                finally {
                    this.pressing = false;
                }
            }
        }

        return this;
    };

    this.step_act = function () {
        var now = new Date().getTime();
        var amount_of_millis_for_every_act = 1 / this.speed * 1000;
        var current_amount_of_acts = Math.floor((now - this.act_timer) / amount_of_millis_for_every_act);

        if (current_amount_of_acts > this.amount_of_acts) {
            if (!this.acting && !this.pressing) { // to avoid concurrent access, we refuse act() if there is a parallel act or keypress event
                this.acting = true;
                try {
                    this.amount_of_acts = current_amount_of_acts;
                    this.act();
                }
                finally {
                    this.acting = false;
                }
            }
        }

        return this;
    };

    this.step = function () {
        this.fps_timer.tick(true);
        for(var key in this.keys) {
            if (this.keys.hasOwnProperty(key)) {
                this.step_keyboard(key, this.keys[key]);
            }
        }
        this.step_act();
        this.fps_timer.tick(false);

        return this.running ? this.runStepAgain() : this;
    };

    this.runStepAgain = function () {
        // run again
        var self = this;
        var avg = this.fps_timer.avg_to_any(true);
        var delay = Math.min((1 - FPS_CPU_UTILIZATION) / FPS_CPU_UTILIZATION * avg, 1000 / FPS_MIN);
        setTimeout(function() { self.step(); }, delay);

        // calculate and show amount of fps
        var now = new Date().getTime();
        if (now - this.fps_shown > FPS_UPDATE_FREQUENCY) {
            var avg_to_same = this.fps_timer.avg_to_same(true);
            stat.fps(avg_to_same == 0 ? 0 : parseInt(1000 / avg_to_same));
            this.fps_shown = now;
        }

        return this;
    };

    this.runStepInit = function () {
        this.act_timer = new Date().getTime();
        this.amount_of_acts = 0;
        this.fps_timer = new Timer(FPS_HISTORY_DEPTH * 2);
        this.fps_shown = new Date().getTime();
        return this;
    };

    this.start = function () {
        this.running = true;
        return this.runStepInit().runStepAgain();
    };

    this.stop = function () {
        this.running = false;
        return this;
    };

    this.keyup = function (e) {
        var key = e.which + "";
        if ($.inArray(key, KEY_ALL) != -1) {
            delete this.keys[key];
            e.preventDefault();
        }
        return this;
    };

    this.keydown = function (e) {
        var key = e.which + "";
        if ($.inArray(key, KEY_ALL) != -1) {
            if (key in this.keys)
                return this;
            e.preventDefault();
            var timings = {timer: new Date().getTime(), amount: 0};
            this.keys[key] = timings;
            this.step_keyboard(key, timings);
        }
        return this;
    };

    this.keypress = function(key) {
        if (!this.running)
            return this;

        switch (key) {
            case KEY_LEFT:
                gameplay.left();
                break;
            case KEY_UP:
                gameplay.up();
                break;
            case KEY_RIGHT:
                gameplay.right();
                break;
            case KEY_DOWN:
                gameplay.down();
                break;
        }
        return this;
    };
};