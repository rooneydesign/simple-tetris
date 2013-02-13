var Gameplay = function (mainarea, nextfigure) {
    this.figure = null;
    this.next = null;

    this.init = function() {
        this.figure = new Figure().init().render(mainarea, true);
        this.next = new Figure().render(nextfigure, true);
    };

    this.act = function() {
        if (this.figure.drop(mainarea)) {
            this.figure.commit(mainarea);
            this.figure = this.next.render(nextfigure, false).init().render(mainarea, true);
            this.next = new Figure().render(nextfigure, true);
        }

        return this;
    };

    this.up = function () {
        this.figure.rotate(mainarea, 1);
        return this;
    };

    this.down = function () {
        this.figure.drop(mainarea);
        return this;
    };

    this.right = function () {
        this.figure.right(mainarea);
        return this;
    };

    this.left = function () {
        this.figure.left(mainarea);
        return this;
    };
};
