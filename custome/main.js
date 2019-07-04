$(document).ready(function () {
    $('.delete-article').on('click', function (e) {
        $target = $(e.target);
        const id = $target.attr('data-id');

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    $.ajax({
                        type: 'DELETE',
                        url: '/pegawai/delete/' + id,
                        success: function (response) {
                            window.location.href = '/pegawai/tampil';
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    })

    $('.delete-penilaian').on('click', function (e) {
        $target = $(e.target);
        const id = $target.attr('data-id');

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    $.ajax({
                        type: 'DELETE',
                        url: '/penilaian/delete/' + id,
                        success: function (response) {
                            window.location.href = '/penilaian/tampil';
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    })

    $('#dataTable').dataTable();
});