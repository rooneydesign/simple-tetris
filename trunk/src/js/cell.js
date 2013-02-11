var Cell = function (x, y, $div) {
    this.committed = false;

    this.sel = function (commit) {
        $div.addClass('sel');
        if (commit)
            this.committed = true;
        return this;
    };

    this.unsel = function() {
        $div.removeClass('sel');
        return this;
    };
};