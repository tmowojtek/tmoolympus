var main = function () {
    $('.show-more').click(function () {
        var currShowMore = $(this);
        /*$('#'+$(this).attr('id')+'-news').slideToggle('slow', function() {
            currShowMore.text($(this).is(':visible') ? 'LESS' : 'MORE');
        });*/
        $('.show-more').each(function () {
            var localShowMore = $(this);
            if (localShowMore.attr('id') == currShowMore.attr('id')) {
                $('#' + localShowMore.attr('id') + '-news').slideToggle('slow', function () {
                    currShowMore.text($(this).is(':visible') ? 'LESS' : 'MORE');
                });
            } else {
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
};

$(document).ready(main);