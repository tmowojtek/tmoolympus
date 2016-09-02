'use strict'

var postAddComment = function (event, serializedFormInputArray) {
    console.log(serializedFormInputArray);
    $.ajax({
        type: 'POST'
        , url: $('input[name=warurl]').val() + '/addcomment' //serializedFormInputArray[0].value

        
        , data: {
            _war_id: $('input[name=_war_id]').val() //serializedFormInputArray[1].value

            
            , parentCommentId: serializedFormInputArray[2].value
            , _body: serializedFormInputArray[3].value
        }
        , cache: false
        , timeout: 10000
    }).done(function (data) {
        console.log('post comment done: ' + data.msg);
        alert(data.msg);
        //event.preventDefault();
        window.location.href = $('input[name=warurl]').val();
    }).fail(function (data) {
        console.log('error data: ' + data.msg);
        alert(data.msg);
        window.location.href = $('input[name=warurl]').val();
        //event.preventDefault();
    });
}

var addCommentResponseBox = function (commentid) {
    if ($('#com' + commentid) /*.children('.postcontent').children('.message')*/ .children('#comment-reply').length > 0) {
        $('#comment-reply').remove();
    } else {
        $('#comment-reply').remove();

        var styleItoComment = '';
        if ($('#com' + commentid).children('.comment-in').length > 0) {
            styleItoComment = "style='background-image: url(/static/images/tmoolympus/const_elements/tmocomments-straight_l.png);background-repeat: no-repeat;background-position: 0px 0px;'";
        }

        $('#com' + commentid + ' .postcontent:eq(0)').after("<div id='comment-reply' " + styleItoComment + "><form id='comment-reply-form' method='post'><input type='hidden' name='warurlin' value='/war/id'><input type='hidden' name='_war_idin' value='_war_id'><input type='hidden' name='parentCommentIdIn' value='" + commentid + "'><textarea id='reply-comment' name='replycommentin' placeholder='Let him know what you think!'></textarea><input class='answer-button' type='submit' value='Answer'></form></div>");

        /*
        $('#com' + commentid).children('.postcontent').children('.message').append("<div id='comment-reply' " + styleItoComment +"><form id='comment-reply-form' method='post'><textarea id='reply-comment' name='replycommentin' placeholder='Let him know what you think!'></textarea><input class='answer-button' type='submit' value='Answer'></form></div>");
        */

        $('#comment-reply-form').submit(function (event) {
            if ($('textarea[name=replycommentin]').val().trim().length < 4) {
                alert('Enter 4 characters at least..');
                //event.preventDefault();
                return false;
            } else {
                //event.preventDefault();
                var serializedFormInputArray = $('#comment-reply-form').serializeArray();
                postAddComment(event, serializedFormInputArray);
                return false;
            }
        });
    }
};

$(document).ready(function () {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementsByClassName('match-ss');
    for (var i = 0; i < img.length; i++) {
        img[i].onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            captionText.innerHTML = this.alt;
        }
    }
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    // Get the <span> element that closes the modal
    //var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    /*
    span.onclick = function () {
        modal.style.display = "none";
    }
    */

    modal.onclick = function () {
        modal.style.display = "none";
    };

    $('#main-reply-form').submit(function (event) {
        if ($('textarea[name=replycomment]').val().trim().length < 4) {
            alert('Enter 4 characters at least..');
            //event.preventDefault();
            return false;
        } else {
            //event.preventDefault();
            var serializedFormInputArray = $('#main-reply-form').serializeArray();
            postAddComment(event, serializedFormInputArray);
            return false;
        }
    });

    $('#delete-war p').click(function () {
        if (confirm('Do you want to delete this war?')) {


            $.ajax({
                type: 'DELETE'
                , url: '/war/delete/' + $('input[name=warid]').val() //serializedFormInputArray[0].value  
                    
                , data: {}
                , cache: false
                , timeout: 10000
            }).done(function (data) {
                if (data.msg == '-1') {
                    alert(data.msgDetail);
                } else {
                    console.log('war deleted: ' + data.msg);
                    alert(data.msg);
                    //event.preventDefault();
                    window.location.href = '/wars'
                }
            }).fail(function (data) {
                console.log('error data: ' + data.msg);
                alert(data.msg);
                //event.preventDefault();
            });
        } else {
            console.log('confirm cancelled');
        }
    });
});