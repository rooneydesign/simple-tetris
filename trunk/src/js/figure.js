var Figure = function (gamearea) {
    this.pattern = PATTERNS[parseInt(Math.random()*PATTERNS.length)];
    this.direction = parseInt(Math.random()*this.pattern.patterns.length);
    this.x = this.pattern.startx;
    this.y = 0;

    this.move = function (newx, newy, new_direction) {
        if (!this.can_moved(newx, newy, new_direction))
            return true;

        this.render(false);
        this.x = newx;
        this.y = newy;
        this.direction = new_direction;
        this.render(true);
        return false;
    };

    this.can_moved = function (newx, newy, new_direction) {
        var patterns = this.pattern.patterns[new_direction];
        for (var i=0; i<patterns.length; i++)
            for (var j=0; j<patterns[i].length; j++) {
                if (patterns[i][j] == 1) {
                    var y = newy+i;
                    var x = newx+j;
                    if (!(0 <= x && x < WIDTH && 0 <= y && y < HEIGHT))
                        return false;

                    if (gamearea.cells[y][x].committed)
                        return false;
                }
            }

        return true;
    };

    this.render = function (sel, commit) {
        var patterns = this.pattern.patterns[this.direction];
        for (var i=0; i<patterns.length; i++)
            for (var j=0; j<patterns[i].length; j++) {
                if (patterns[i][j] == 1)
                    if (sel)
                        gamearea.cells[this.y+i][this.x+j].sel(commit);
                    else
                        gamearea.cells[this.y+i][this.x+j].unsel();
            }
        return this;
    };

    this.commit = function () {
        return this.render(true, true);
    };

    this.drop = function () {
        return this.move(this.x, this.y + 1, this.direction);
    };

    this.right = function () {
        return this.move(this.x + 1, this.y, this.direction);
    };

    this.left = function () {
        return this.move(this.x - 1, this.y, this.direction);
    };

    this.rotate = function () {
        return this.move(this.x, this.y, (this.direction + 1) % this.pattern.patterns.length);
    };
};