'use strict'

$(document).ready(function () {
    $('nav ul li a').click(function () {
        if (!$(this).hasClass('selected')) {
            $('nav ul li a.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
});