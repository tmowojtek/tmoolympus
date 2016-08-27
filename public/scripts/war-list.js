'use strict'

$(document).ready(function () {
    $('#load-more-matches p').click(function () {
        var el = $(this);

        $.ajax({
            type: 'GET'
            , url: '/wars'
            , dataType: 'JSON'
            , success: function (data) {
                if (data.msg == '-1') {
                    el.addClass('not-active');
                    el.text('Couldn\'t merge data from server..');
                } else if (data.msg == '1') {
                    var matchesWrap = $('#matches-wrap');
                    // to do uzueplnic niezbedne pola w stringu
                    data.matches.forEach(function (match) {
                        var newSingleMatchEntry = "<div class='single-match'><div class='match-date'>11.07.1995</div><div class='home-team'>The Myth of <img class='clan-img-home' src='_old/tmolastwars-tmoclanlogo.png' alt='home-logo' /> <span class='score-left color-blue'>28</span></div><div class='separator'><span class='color-blue'>-</span></div><div class='away-team'><span class='score-right color-blue'>24</span> <img class='clan-img-away' src='_old/tmolastwars-9gag.png' alt='away-team' /> ^9gag/</div><div class='details-link'><a class='ahref-match-details' href=''>details</a></div></div>";
                        matchesWrap.append(newSingleMatchEntry);
                    });
                } else if (data.msg == '2') {
                    el.addClass('not-active');
                    el.text('There are no more old wars at the moment!');
                } else {
                    el.addClass('not-active');
                    el.text('Unexpected error. We\'ll fix that soon.');
                }
            }
            , error: function (data, textStatus, errorThrown) {
                el.addClass('not-active');
                el.text('Couldn\'t merge data from server..');
            }
        });
    });
});