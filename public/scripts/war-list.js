'use strict'

var setColor = function (score) {
    var warColor = 'orange';
    if (score.our > score.their) {
        warColor = 'blue';
    } else if (score.our < score.their) {
        warColor = 'pink';
    }
    return warColor;
};

$(document).ready(function () {
    var nextBatch = 1;
    
    $('#load-more-matches p').click(function () {
        var el = $(this);

        $.ajax({
            type: 'GET'
            , url: '/wars/' + nextBatch
            , dataType: 'JSON'
            , success: function (data) {
                if (data.msg == '-1') {
                    el.addClass('not-active');
                    el.text('Couldn\'t merge data from server..');
                } else if (data.msg == '1') {
                    var matchesWrap = $('#matches-wrap');
                    // to do uzueplnic niezbedne pola w stringu
                    data.wars.forEach(function (match) {
                        var matchDate = new Date(match.timestamp);
                        var newSingleMatchEntry = "<div class='single-match'><div class='match-date'>" + ('0' + matchDate.getDate()).slice(-2) + '.' + ('0' + (matchDate.getMonth()+1)).slice(-2) + '.' + matchDate.getFullYear() + "</div><div class='small-wrap'><div class='home-team'>The Myth of <img class='clan-img-home' src='" + match.tmoTeamPic +"' /> <span class='score-left color-"+ setColor(match.overallScore) +"'>"+ match.overallScore.our +"</span></div><div class='separator'><span class='color-"+ setColor(match.overallScore) +"'>-</span></div><div class='away-team'><span class='score-right color-"+ setColor(match.overallScore) +"'>"+ match.overallScore.their +"</span> <img class='clan-img-away' src='"+ match.opponentTeamPic +"' alt='away-team' /> "+ match.opponentName +"</div></div><div class='details-link'><a class='ahref-match-details' href='/war/" + match.warid +"'>details</a></div></div>";
                        matchesWrap.append(newSingleMatchEntry);
                    });
                    nextBatch+=1;
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