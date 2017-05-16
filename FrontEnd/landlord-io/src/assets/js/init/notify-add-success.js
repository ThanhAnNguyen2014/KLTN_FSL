if ('undefined' !== typeof module) {
    inNotify = true;
    module.exports = function() {
        $.notify({
            icon: "notifications",
            message: "Add success"

        }, {
            type: 'success',
            timer: 1000,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }
}