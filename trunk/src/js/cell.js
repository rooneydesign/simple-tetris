var Cell = function (x, y, $div) {
    this.sel = function () {
        $div.addClass('sel');
        return this;
    };

    this.unsel = function() {
        $div.removeClass('sel');
        return this;
    };

    this.is_sel = function() {
        return $div.hasClass('sel');
    }
};