var Turn = function(mainarea, figure) {
    // returns true if figure is fell
    this.act = function() {
        return figure.fall().is_fell();
    };

    this.render = function() {
        figure.render();
        return this;
    };

    this.rotate = function () {
        return this;
    };

    this.drop = function () {
        figure.drop();
        return this;
    };

    this.right = function () {
        figure.right();
        return this;
    };

    this.left = function () {
        figure.left();
        return this;
    };
};
