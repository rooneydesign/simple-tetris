var Timer = function (AMOUNT) {
    this.times = [];

    this.tick = function (type) {
        this.times.push({time: new Date().getTime(), type:type});
        if (this.times.length > AMOUNT) this.times.shift();
        return this;
    };

    this.avg_to_any = function (type) {
        var sum = 0;
        var amount = 0;
        var last_with_type = undefined;
        for (var i=0; i<this.times.length; i++) {
            var pair = this.times[i];
            if (pair.type == type)
                last_with_type = pair.time;
            else
                if (last_with_type) {
                    sum += pair.time - last_with_type;
                    amount += 1;
                }
        }
        return amount == 0 ? 0 : sum/amount;
    };

    this.avg_to_same = function (type) {
        var typed = this.times.filter(function(item){ return item.type == type; });
        var amount = typed.length;
        return amount >= 2 ? (typed[amount-1].time - typed[0].time) / (amount-1) : 0;
    }
};