var Dot = function (x, y, gamearea) {
    this.x = x;
    this.y = y;

    this.move = function (newx, newy) {
        gamearea.cells[this.y][this.x].unsel();
        this.x = newx;
        this.y = newy;
        gamearea.cells[this.y][this.x].sel();
        return this;
    };

    this.is_fell = function() {
        return this.y >= HEIGHT-1;
    };

    this.fall = function() {
        // make sure there is enough space
        if (this.is_fell())
            return this;

        return this.move(this.x, this.y+1);
    };

    this.render = function () {
        gamearea.cells[this.y][this.x].sel();
        return this;
    };

    this.drop = function () {
        if (this.is_fell())
            return this;

        this.move(this.x, this.y+1);

        return this;
    };

    this.right = function () {
        if (this.x >= WIDTH-1)
            return this;

        this.move(this.x+1, this.y);

        return this;
    };

    this.left = function () {
        if (this.x <= 0)
            return this;

        this.move(this.x-1, this.y);

        return this;
    };
};