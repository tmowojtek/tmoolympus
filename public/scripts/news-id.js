'use strict'

var postAddComment = function (serializedFormInputArray) {
    console.log(serializedFormInputArray);
    console.log($('input[name=newsurl]').val() + '/addcomment');
    console.log($('input[name=_news_id]').val());
    console.log(serializedFormInputArray[2].value);
    console.log(serializedFormInputArray[3].value);
    $.ajax({
        type: 'POST'
        , url: $('input[name=newsurl]').val() + '/addcomment' //serializedFormInputArray[0].value
        , data: {
            _news_id: $('input[name=_news_id]').val()//serializedFormInputArray[1].value
            , parentCommentId: serializedFormInputArray[2].value
            , _body: serializedFormInputArray[3].value
        }, cache: false
        , timeout: 10000
    }).done(function (data) {
        alert(data.msg);
        window.location.href = $('input[name=newsurl]').val();
    }).fail(function (data) {
        alert(data.msg);
        window.location.href = $('input[name=newsurl]').val();
    });
}

var addCommentResponseBox = function (commentid) {
    if ($('#com' + commentid)/*.children('.postcontent').children('.message')*/.children('#comment-reply').length > 0) {
        $('#comment-reply').remove();
    } else {
        $('#comment-reply').remove();

        var styleItoComment = '';
        if ($('#com' + commentid).children('.comment-in').length > 0) {
            styleItoComment = "style='background-image: url(/static/_old/def_I.png);background-repeat: no-repeat;background-position: 0px 0px;'";
        }

        $('#com' + commentid + ' .postcontent:eq(0)').after("<div id='comment-reply' " + styleItoComment + "><form id='comment-reply-form' method='post'><input type='hidden' name='newsurlin' value='/news/id'><input type='hidden' name='_news_idin' value='_news_id'><input type='hidden' name='parentCommentIdin' value='" + commentid + "'><textarea id='reply-comment' name='replycommentin' placeholder='Let him know what you think!'></textarea><input class='answer-button' type='submit' value='Answer'></form></div>");

        /*
        $('#com' + commentid).children('.postcontent').children('.message').append("<div id='comment-reply' " + styleItoComment +"><form id='comment-reply-form' method='post'><textarea id='reply-comment' name='replycommentin' placeholder='Let him know what you think!'></textarea><input class='answer-button' type='submit' value='Answer'></form></div>");
        */

        $('#comment-reply-form').submit(function (event) {
            //event.preventDefault();
            if ($('textarea[name=replycommentin]').val().trim().length < 4) {
                alert('Enter 4 characters at least..');
                //event.preventDefault();
            } else {
                //event.preventDefault();
                var serializedFormInputArray = $('#comment-reply-form').serializeArray();
                postAddComment(serializedFormInputArray);
                //return false;
            }
        });
    }
};

var main = function () {
    $('#main-reply-form').submit(function (event) {
        //event.preventDefault();
        if ($('textarea[name=replycomment]').val().trim().length < 4) {
            alert('Enter 4 characters at least..');
            //event.preventDefault();
            return false;
        } else {
            //event.preventDefault();
            var serializedFormInputArray = $('#main-reply-form').serializeArray();
            postAddComment(serializedFormInputArray);
            //return false;
        }
    });
};

$(document).ready(main);