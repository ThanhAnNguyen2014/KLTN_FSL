if ('undefined' !== typeof module) {
    inNotify = true;
    module.exports = function(msg, color) {
        $.notify({
            icon: "notifications",
            message: msg

        }, {
            type: color,
            timer: 500,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }
}