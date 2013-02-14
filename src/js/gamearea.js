var Gamearea = function (height, width) {
    this.cells = [];

    this.clear = function() {
        for (var i=0; i<height; i++)
            for (var j=0; j<width; j++)
                this.cells[i][j].unsel(true);
        return this;
    };

    this.init = function($parent) {
        var $gametable = $('<DIV>').addClass('gametable');
        this.cells = [];
        for (var i=0; i<height; i++) {
           var $gamerow = $('<DIV>').addClass('gamerow');
           this.cells[i] = [];
           for (var j=0; j<width; j++) {
               var $gamecell = $('<DIV>').addClass('gamecell');
               $gamerow.append($gamecell);
               this.cells[i][j] = new Cell(j, i, $gamecell);
           }
           $gametable.append($gamerow);
        }

        $parent.html('');
        $parent.append($gametable);

        return this;
    };
};
