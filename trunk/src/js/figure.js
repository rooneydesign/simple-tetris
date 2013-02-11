var Figure = function (x, y, gamearea) {
    this.x = x;
    this.y = y;

    this.move = function (newx, newy) {
        gamearea.cells[this.y][this.x].unsel();
        this.x = newx;
        this.y = newy;
        gamearea.cells[this.y][this.x].sel();
        return this;
    };

    this.can_moved = function(newx, newy) {
        return 0 <= newy && newy < HEIGHT && 0 <= newx && newx < WIDTH && !gamearea.cells[newy][newx].is_sel();
    };

    this.fall = function() {
        if (!this.can_moved(this.x, this.y+1))
            return true;

        this.move(this.x, this.y+1);

        return false;
    };

    this.render = function () {
        gamearea.cells[this.y][this.x].sel();
        return this;
    };

    this.drop = function () {
        if (!this.can_moved(this.x, this.y+1))
            return true;

        this.move(this.x, this.y+1);

        return false;
    };

    this.right = function () {
        if (!this.can_moved(this.x+1, this.y))
            return true;

        this.move(this.x+1, this.y);

        return false;
    };

    this.left = function () {
        if (!this.can_moved(this.x-1, this.y))
            return true;

        this.move(this.x-1, this.y);

        return false;
    };
};