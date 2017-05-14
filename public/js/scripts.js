$(function () {
    $('.btn').off('click').on('click', function (event) {
        event.preventDefault();

        var $this = $(this);
        var _id = $(this).data('id');
        $.ajax({
            url: '/admin/check_lock_user/' + _id,
            type: 'POST'
        }).done(function (result) {
            if (result) {
                $this.removeClass('btn-warning').addClass('btn-success');
                $this.text("Click to Lock");

            } else {
                $this.removeClass('btn-success').addClass('btn-warning');
                $this.text("Click to Unlock");
            }
        });
    });
    // $('.btn-warning').on('click', function (event) {
    //     event.preventDefault();

    //     var $this = $(this);
    //     var _id = $(this).data('id');
    //     $.ajax({
    //         url: '/admin/check_lock_user/' + _id,
    //         type: 'POST'
    //     }).done(function (result) {
    //         if (result) {
    //             $this.removeClass('btn-warning').addClass('btn-success');
    //             $this.text("Click to Lock");
    //         }
    //     });
    // });
});