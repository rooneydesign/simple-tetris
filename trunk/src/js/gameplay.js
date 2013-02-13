var Gameplay = function (mainarea) {
    this.figure = null;

    this.act = function() {
        var next_turn = true;
        if (this.figure != null) {
            next_turn = this.figure.drop();
            if (next_turn)
                this.figure.commit();
        }

        if (next_turn)
            this.figure = new Figure(mainarea).render(true);

        return this;
    };

    this.up = function () {
        this.figure.rotate(1);
        return this;
    };

    this.down = function () {
        this.figure.drop();
        return this;
    };

    this.right = function () {
        this.figure.right();
        return this;
    };

    this.left = function () {
        this.figure.left();
        return this;
    };
};
