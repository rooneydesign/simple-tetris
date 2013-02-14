var Cell = function (x, y, $div) {
    this.committed = false;
    this.color = 'transparent';

    this.sel = function (color, commit) {
	this.color = color;
        $div.css('background-color', color);
        if (commit)
            this.committed = true;
        return this;
    };

    this.unsel = function(commit) {
        this.color = 'transparent';
        $div.css('background-color', 'transparent');
        if (commit)
            this.committed = false;
        return this;
    };

    this.move = function(source) {
        if (this.committed != source.committed) {
            if (source.committed)
                this.sel(source.color, true);
            else
                this.unsel(true);
        }
    }
};