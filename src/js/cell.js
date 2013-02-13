var Cell = function (x, y, $div) {
    this.committed = false;

    this.sel = function (commit) {
        $div.addClass('sel');
        if (commit)
            this.committed = true;
        return this;
    };

    this.unsel = function(commit) {
        $div.removeClass('sel');
        if (commit)
            this.committed = false;
        return this;
    };

    this.move = function(source) {
        if (this.committed != source.committed) {
            if (source.committed)
                this.sel(true);
            else
                this.unsel(true);
        }
    }
};