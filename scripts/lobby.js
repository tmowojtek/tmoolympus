var main = function () {
    $('.show-more').click(function () {
        var currShowMore = $(this);
        var curHeight = $('#' + currShowMore.attr('id') + '-news-img').height();
        var autoHeight = $('#' + currShowMore.attr('id') + '-news-img').css('height', 'auto').height();
        /*currShowMore.height(curHeight).animate({ height: autoHeight }, 250);*/
        /*$('#'+$(this).attr('id')+'-news').slideToggle('slow', function() {
            currShowMore.text($(this).is(':visible') ? 'LESS' : 'MORE');
        });*/
        $('.show-more').each(function () {
            var localShowMore = $(this);
            if (localShowMore.attr('id') == currShowMore.attr('id')) {
                var newHeight = $('#' + localShowMore.attr('id') + '-news').is(':visible') ? '90px' : autoHeight;
                $('#' + localShowMore.attr('id') + '-news-img').height(curHeight).animate({
                    /*height: autoHeight*/
                    height: newHeight
                }, 1000);
                $('#' + localShowMore.attr('id') + '-news').slideToggle('slow', function () {
                    currShowMore.text($(this).is(':visible') ? 'LESS' : 'MORE');
                });
            } else {
                $('#' + localShowMore.attr('id') + '-news-img').animate({
                    height: '90px'
                }, 1000);
                $('#' + localShowMore.attr('id') + '-news').slideUp('slow', function () {
                    localShowMore.text($(this).is(':visible') ? 'LESS' : 'MORE');
                });
            }
        });
    });

    $('.slide-icon').click(function () {
        var currentSlideDot = $('.active');
        var currentSlide = $('.active-right-content');
        var nextSlideDot = $(this);
        var nextSlide = $('.right-content').eq($('.slide-icon').index(nextSlideDot));

        if ($('.slide-icon').index(nextSlideDot) === $('.slide-icon').index(currentSlideDot))
            return;

        currentSlide.fadeOut('slow', function () {
            currentSlideDot.removeClass('active');
            currentSlide.removeClass('active-right-content');
            currentSlide.addClass('is-hidden');


            nextSlide.fadeIn('slow', function () {
                nextSlide.removeClass('is-hidden');
                nextSlideDot.addClass('active');
                nextSlide.addClass('active-right-content');
            });

        });
    });

    /*
    $('.slide-show').cycle({
        timeout: 6000
    });
    
    $('.slide-show').on('mouseenter', function() {
        $('.slide-show').cycle('pause');
    });
    
    $('.slide-show').on('mouseleave', function() {
        $('.slide-show').cycle('resume');
    });
    */

    var addZero = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    var updateTime = function () {
        var now = new Date();
        var h = addZero(now.getHours());
        var m = addZero(now.getMinutes());
        $('#time').text(h + ':' + m);
    }

    updateTime();
    setInterval(updateTime, 5000);
};

$(document).ready(main);