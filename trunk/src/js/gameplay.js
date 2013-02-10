var Gameplay = function () {
    this.mainarea = null;
    this.dot = new Dot(0, 0);

    this.init = function (mainarea) {
        this.mainarea = mainarea;
        return this;
    };

    this.act = function() {
        this.dot.move(
                this.mainarea,
                (this.dot.x + 1) % WIDTH,
                (this.dot.y + 1) % HEIGHT
        );
    };
};
