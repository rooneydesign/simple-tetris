var Figure = function () {
    this.pattern = PATTERNS[parseInt(Math.random()*PATTERNS.length)];
    this.direction = parseInt(Math.random()*this.pattern.rotations.length);
    this.x = 0;
    this.y = 0;

    this.init = function () {
        this.x = this.pattern.rotations[this.direction].startx;
        this.y = this.pattern.rotations[this.direction].starty;
        return this;
    };

    this.move = function (gamearea, newx, newy, new_direction) {
        if (!this.can_moved(gamearea, newx, newy, new_direction))
            return true;

        this.render(gamearea, false, false);
        this.x = newx;
        this.y = newy;
        this.direction = new_direction;
        this.render(gamearea, true, false);
        return false;
    };

    this.can_moved = function (gamearea, newx, newy, new_direction) {
        var map = this.pattern.rotations[new_direction].map;
        for (var i=0; i<map.length; i++)
            for (var j=0; j<map[i].length; j++) {
                if (map[i][j] == 1) {
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
        var map = this.pattern.rotations[this.direction].map;
        for (var i=0; i<map.length; i++)
            for (var j=0; j<map[i].length; j++) {
                if (map[i][j] == 1)
                    if (sel)
                        gamearea.cells[this.y+i][this.x+j].sel(this.pattern.color, commit);
                    else
                        gamearea.cells[this.y+i][this.x+j].unsel(commit);
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
        var new_direction = (this.direction + delta + this.pattern.rotations.length) % this.pattern.rotations.length;
        if (!this.move(gamearea, this.x, this.y, new_direction))
            return false;

        var shifts = this.pattern.rotations[this.direction].shifts;
        for (var i=0; i<shifts.length; i++)
            if (!this.move(gamearea, this.x+shifts[i], this.y, new_direction))
                return false;

        return true;
    };
};