var Gameplay = function (mainarea) {
    this.turn = null;

    this.act = function() {
        var next_trun = true;
        if (this.turn != null)
            next_trun = this.turn.act();

        if (next_trun)
            this.turn = new Turn(mainarea, new Figure(5, 0, mainarea)).render();

        return this;
    };

    this.up = function () {
        this.turn.rotate();
        return this;
    };

    this.down = function () {
        this.turn.drop();
        return this;
    };

    this.right = function () {
        this.turn.right();
        return this;
    };

    this.left = function () {
        this.turn.left();
        return this;
    };
};
