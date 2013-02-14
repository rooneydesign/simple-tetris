var SCORES_TABLE = [0,1,2,4,8];

var Gameplay = function (mainarea, nextfigure, stat) {
    this.figure = null;
    this.next = null;

    this.init = function() {
        stat.scores(0);
        this.figure = new Figure().init().render(mainarea, true, false);
        this.next = new Figure().render(nextfigure, true, false);

        return this;
    };

    this.row_filled = function(i) {
        var row = mainarea.cells[i];
        for (var j=0; j<row.length; j++) {
            if (!row[j].committed)
                return false;
        }
        return true;
    };

    this.cleanup = function() {
        var rows_to_remove = [];
        for (var i0=0; i0<mainarea.cells.length; i0++)
            if (this.row_filled(i0))
                rows_to_remove.push(i0);

        stat.scores(stat.scores() + SCORES_TABLE[rows_to_remove.length]);

        if (rows_to_remove.length > 0) {
            var first_row = rows_to_remove.pop();
            var copy_from=first_row;
            for (var i1=first_row; i1>=0; i1--) {
                copy_from--;
                while ($.inArray(copy_from,rows_to_remove) != -1) copy_from--;

                if (copy_from >= 0)
                    if (copy_from != i1)
                        for (var j0=0; j0<mainarea.cells[i1].length; j0++)
                            mainarea.cells[i1][j0].move(mainarea.cells[copy_from][j0]);
                else
                    for (var j1=0; j1<mainarea.cells[i1].length; j1++)
                        mainarea.cells[i1][j1].unsel(true);
            }
        }

        return this;
    };

    this.act = function() {
        if (this.figure.drop(mainarea)) {
            this.figure.commit(mainarea);
            this.cleanup();
            this.next.render(nextfigure, false, false).init();
            if (!this.next.can_moved(mainarea, this.next.x, this.next.y, this.next.direction)) {
                alert('GAME OVER');
                mainarea.clear();
                nextfigure.clear();
                this.init();
                return this;
            }
            this.figure = this.next.render(mainarea, true, false);
            this.next = new Figure().render(nextfigure, true, false);
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
