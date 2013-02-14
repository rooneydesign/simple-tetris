var KEY_LEFT = "37";
var KEY_UP = "38";
var KEY_RIGHT = "39";
var KEY_DOWN = "40";
var KEY_ALL = [KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN];

var Gameengine = function(gameplay) {
    this.timer = new Date().getTime();
    this.speed = INITIAL_SPEED;
    this.amount_of_acts = 0;
    this.interval = null;
    this.running = false;
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
        this.speed = speed;
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
        var current_amount_of_acts = Math.floor((now - this.timer) / amount_of_millis_for_every_act);

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
        for(var key in this.keys) {
            if (this.keys.hasOwnProperty(key)) {
                this.step_keyboard(key, this.keys[key]);
            }
        }
        return this.step_act();
    };

    this.start = function () {
        var self = this;
        this.timer = new Date().getTime();
        this.amount_of_acts = 0;
        this.interval = setInterval(function() { self.step(); }, 1000 / FPS);
        this.running = true;
        return this;
    };

    this.stop = function () {
        if (this.interval)
            clearInterval(this.interval);
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