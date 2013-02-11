var Gameengine = function() {
    this.timer = new Date().getTime();
    this.speed = INITIAL_SPEED;
    this.amount_of_acts = 0;
    this.interval = null;
    this.running = false;
    this.gameplay = null;
    this.key = null;
    this.key_timer = new Date().getTime();
    this.acting = false;
    this.pressing = false;
    this.amount_of_keypresses = 0;

    this.init = function (gameplay, mainarea) {
        var $gamearea = $('#gamearea');
        $gamearea.html('');
        $gamearea.append(mainarea.render(HEIGHT, WIDTH));

        var self = this;
        $('#stop').click(function() {
            if (self.running) {
                self.stop();
                $(this).text('Start');
            } else {
                self.start();
                $(this).text('Pause');
            }
        });

        this.speed = INITIAL_SPEED;

        this.gameplay = gameplay;

        return this;
    };

    this.act = function () {
        this.gameplay.act();
        return this;
    };

    this.step_keyboard = function () {
        var now = new Date().getTime();
        var amount_of_millis_for_every_keypress = 1 / (this.key == 40 ? DOWN_KEYBOARD_SPEED : KEYBOARD_SPEED) * 1000;
        var current_amount_of_keypresses = Math.floor((now - this.key_timer) / amount_of_millis_for_every_keypress);

        if (current_amount_of_keypresses >= this.amount_of_keypresses) {
            if (!this.acting && !this.pressing) { // to avoid concurrent access, we refuse keypress() if there is a parallel act or keypress event
                this.pressing = true;
                try {
                    this.amount_of_keypresses += 1;
                    this.keypress();
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
        if (this.key != null) {
            this.step_keyboard();
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
        this.key = null;
        if (37 <= this.key && this.key <= 40)
            e.preventDefault();
        return this;
    };

    this.keydown = function (e) {
        if (this.key != null)
            return this;
        this.key = e.which;
        if (37 <= this.key && this.key <= 40)
            e.preventDefault();
        this.key_timer = new Date().getTime();
        this.amount_of_keypresses = 0;
        this.step_keyboard();
        return this;
    };

    this.keypress = function() {
        if (!this.running)
            return this;

        switch (this.key) {
            case 37:
                this.gameplay.left();
                break;
            case 38:
                this.gameplay.up();
                break;
            case 39:
                this.gameplay.right();
                break;
            case 40:
                this.gameplay.down();
                break;
        }
        return this;
    };
};