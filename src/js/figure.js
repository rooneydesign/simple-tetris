var Figure = function (gamearea) {
    this.patterns = PATTERNS[parseInt(Math.random()*PATTERNS.length)];
    this.direction = parseInt(Math.random()*this.patterns.length);
    this.x = this.patterns[this.direction].startx;
    this.y = this.patterns[this.direction].starty;

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

    this.render = function (sel, commit) {
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

    this.rotate = function (delta) {
        var new_direction = (this.direction + delta + this.patterns.length) % this.patterns.length;
        if (!this.move(this.x, this.y, new_direction))
            return false;

        var shifts = this.patterns[this.direction].shifts;
        for (var i=0; i<shifts.length; i++)
            if (!this.move(this.x+shifts[i], this.y, new_direction))
                return false;

        return true;
    };
};