'use strict'

$(document).ready(function () {
    $('#soldi-img').click(function () {
        $('#honorary-members').fadeToggle('slow');
    });

    $('#players-list span').click(function () {
        if ($(this).hasClass('color-beige')) {
            $(this).removeClass('color-beige');
            $('#player-desc').fadeToggle('slow', function () {
                $(this).find('p').text('');
            });
        } else {

            if ($('span.color-beige').length) {
                $('span.color-beige').removeClass('color-beige');
                var player = $(this);
                player.addClass('color-beige');
                $('#player-desc').fadeToggle('fast', function () {
                    $('#player-desc p').text(player.text());
                    $('#player-desc').fadeToggle('slow');
                });
            } else {
                $(this).addClass('color-beige');
                $('#player-desc p').text($(this).text());
                $('#player-desc').fadeToggle('slow');
            }
        }
    });
});