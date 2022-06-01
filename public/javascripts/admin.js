$(document).ready(function () {
    $("#data_table").DataTable({
        scrollX: true,
        order: [[1, "desc"]],
    });
});

$("#harmburger").click(function () {
    $("#harmburger").toggleClass("active");
    $("#sidebar").toggleClass("close");
    $("#header").toggleClass("shrink");
    $("#main").toggleClass("shrink");
});
