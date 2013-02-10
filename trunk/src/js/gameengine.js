var Gameengine = function() {
    this.timer = new Date().getTime();
    this.speed = INITIAL_SPEED;
    this.amount_of_acts = 0;
    this.interval = null;
    this.running = false;
    this.gameplay = null;

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

    this.step = function () {
        var now = new Date().getTime();
        var amount_of_millis_for_every_act = 1 / this.speed * 1000;
        var current_amount_of_acts = Math.floor((now - this.timer) / amount_of_millis_for_every_act);

        if (current_amount_of_acts > this.amount_of_acts) {
            this.amount_of_acts = current_amount_of_acts;
            this.act();
        }

        return this;
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
};