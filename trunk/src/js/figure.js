var Dot = function (x, y) {
    this.x = x;
    this.y = y;

    this.move = function (gamearea, newx, newy) {
        gamearea.cells[this.y][this.x].$div.removeClass('sel');
        this.x = newx;
        this.y = newy;
        gamearea.cells[this.y][this.x].$div.addClass('sel');
    };
};