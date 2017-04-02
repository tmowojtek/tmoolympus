var matchId;

var main = function () {

    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);

        matchId = button.data('matchid');
        var teamAId = button.data('teamaid');
        var teamBId = button.data('teambid');
        var picA = button.data('pica');
        var picB = button.data('picb');
        var nameA = button.data('namea');
        var nameB = button.data('nameb');
        var scoreA = parseInt(button.data('scorea'));
        var scoreB = parseInt(button.data('scoreb'));

        var modal = $(this)
        modal.find('.modal-body #input-score-a').val(scoreA);
        modal.find('.modal-body #input-score-b').val(scoreB);
        modal.find('.modal-body #pic-a img').attr({
            src: picA
        });
        modal.find('.modal-body #pic-b img').attr({
            src: picB
        });
        modal.find('.modal-body #pic-a #name-a').text(nameA);
        modal.find('.modal-body #pic-b #name-b').text(nameB);
        modal.find('.modal-body #input-match-id').val(matchId);
        modal.find('.modal-body #input-team-a-id').val(teamAId);
        modal.find('.modal-body #input-team-b-id').val(teamBId);
        
        modal.find('#alert-id-ok').hide();
        modal.find('#alert-id-error').hide();
    });

    $('#update-btn').click(function () {
        var modal = $('#myModal');
        modal.find('#alert-id-ok').hide();
        modal.find('#alert-id-error').hide();
        $.ajax({
            type: 'POST'
            , url: 'https://testyaas-tmowebpage.rhcloud.com/addresult/' + modal.find('.modal-body #input-match-id').val()
            , data: {
                team_a: modal.find('.modal-body #input-team-a-id').val()
                , team_b: modal.find('.modal-body #input-team-b-id').val()
                , score_a: modal.find('.modal-body #input-score-a').val()
                , score_b: modal.find('.modal-body #input-score-b').val()
            }
            , cache: false
            , timeout: 10000
        }).done(function (data) {
            if (data.code == "x00x") {
                modal.find('#alert-id-ok #response-ok').text(data.status);
                modal.find('#alert-id-ok').fadeIn();
                $('#row-match-id-' + matchId + ' .score-a-span').text(modal.find('.modal-body #input-score-a').val());
                $('#row-match-id-' + matchId + ' .score-b-span').text(modal.find('.modal-body #input-score-b').val());
            } else {
                modal.find('#alert-id-error #response-error').text(data.status);
                modal.find('#alert-id-error').fadeIn();
            }
        }).fail(function (data) {
            console.log('error while updatind war result: ' + data);
            modal.find('#alert-id-error #response-error').text(data);
            modal.find('#alert-id-error').fadeIn();
        });
    });

    $('#delete-btn').click(function () {
        var modal = $('#myModal');
        $.ajax({
            type: 'POST'
            , url: 'https://testyaas-tmowebpage.rhcloud.com/deleteresult/' + modal.find('.modal-body #input-match-id').val()
            , cache: false
            , timeout: 10000
        }).done(function (data) {
            console.log('deletee war result : ' + data.status);
            if (data.code == "x00x") {
                modal.find('#alert-id-ok #response-ok').text(data.status);
                modal.find('#alert-id-ok').fadeIn();
                modal.find('.modal-body #input-score-b').val('');
                modal.find('.modal-body #input-score-a').val('');
                $('#row-match-id-' + matchId + ' .score-a-span').text(modal.find('.modal-body #input-score-a').val());
                $('#row-match-id-' + matchId + ' .score-b-span').text(modal.find('.modal-body #input-score-b').val());
            } else {
                modal.find('#alert-id-error #response-error').text(data.status);
                modal.find('#alert-id-error').fadeIn();
            }
        }).fail(function (data) {
            console.log('error while updatind war result: ' + data);
            modal.find('#alert-id-error #response-error').text(data);
            modal.find('#alert-id-error').fadeIn();
        });
    });
};

$(document).ready(main);