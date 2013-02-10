var Gamearea = function () {
    this.cells = [];

    this.render = function(height, width) {
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
        return $gametable;
    };
};
