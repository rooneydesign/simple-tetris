var Figure = function () {
    this.patterns = PATTERNS[parseInt(Math.random()*PATTERNS.length)];
    this.direction = parseInt(Math.random()*this.patterns.length);
    this.x = 0;
    this.y = 0;

    this.init = function () {
        this.x = this.patterns[this.direction].startx;
        this.y = this.patterns[this.direction].starty;
        return this;
    };

    this.move = function (gamearea, newx, newy, new_direction) {
        if (!this.can_moved(gamearea, newx, newy, new_direction))
            return true;

        this.render(gamearea, false);
        this.x = newx;
        this.y = newy;
        this.direction = new_direction;
        this.render(gamearea, true);
        return false;
    };

    this.can_moved = function (gamearea, newx, newy, new_direction) {
        var pattern = this.patterns[new_direction].pattern;
        for (var i=0; i<pattern.length; i++)
            for (var j=0; j<pattern[i].length; j++) {
                if (pattern[i][j] == 1) {
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

    this.render = function (gamearea, sel, commit) {
        var pattern = this.patterns[this.direction].pattern;
        for (var i=0; i<pattern.length; i++)
            for (var j=0; j<pattern[i].length; j++) {
                if (pattern[i][j] == 1)
                    if (sel)
                        gamearea.cells[this.y+i][this.x+j].sel(commit);
                    else
                        gamearea.cells[this.y+i][this.x+j].unsel();
            }
        return this;
    };

    this.commit = function (gamearea) {
        return this.render(gamearea, true, true);
    };

    this.drop = function (gamearea) {
        return this.move(gamearea, this.x, this.y + 1, this.direction);
    };

    this.right = function (gamearea) {
        return this.move(gamearea, this.x + 1, this.y, this.direction);
    };

    this.left = function (gamearea) {
        return this.move(gamearea, this.x - 1, this.y, this.direction);
    };

    this.rotate = function (gamearea, delta) {
        var new_direction = (this.direction + delta + this.patterns.length) % this.patterns.length;
        if (!this.move(gamearea, this.x, this.y, new_direction))
            return false;

        var shifts = this.patterns[this.direction].shifts;
        for (var i=0; i<shifts.length; i++)
            if (!this.move(gamearea, this.x+shifts[i], this.y, new_direction))
                return false;

        return true;
    };
};