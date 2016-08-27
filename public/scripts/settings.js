'use strict'

$(document).ready(function () {
    $('nav ul li a').click(function () {
        if (!$(this).hasClass('selected')) {
            $('nav ul li a.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    
    checkWhichTabIsSelected();
});

function checkWhichTabIsSelected() {
    var url = $(location).attr('href');
    
    if (url.indexOf('profile') != -1) {
        $('nav ul li a.selected').removeClass('selected');
        $('#sprofile').addClass('selected');
    } else if (url.indexOf('addnews') != -1) {
        $('nav ul li a.selected').removeClass('selected');
        $('#saddnews').addClass('selected');
    } else if (url.indexOf('addwar') != -1) {
        $('nav ul li a.selected').removeClass('selected');
        $('#saddwar').addClass('selected');
    } else if (url.indexOf('adminpanel') != -1) {
        $('nav ul li a.selected').removeClass('selected');
        $('#sadminpanel').addClass('selected');
    }
}