$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $('[href="#"]').on('click', function (e) {
        e.preventDefault();
    });

    $('form').on('submit', function (e) {
        e.preventDefault();
    });
});