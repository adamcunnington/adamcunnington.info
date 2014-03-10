'use strict';

$(document).ready(function () {
    var programmaticScroll = false;
    var $currentSection = $(document.getElementById(window.location.hash
    .replace('#', ''))) || $('section').first();

    function scrollTo($element) {
        programmaticScroll = true;
        $('html, body').stop().animate({
            scrollTop: $element.offset().top
        }, 800, 'swing');
        updateSection($element);
        programmaticScroll = false;
    }

    function updateSection($element) {
        window.location.hash = $element.attr('id');
        $currentSection = $element;
    }

    $(window).on('hashChange', function (event) {
        event.preventDefault();
    });

    $('a[href*=#]').click(function (event) {
        event.preventDefault();
        scrollTo($($(this).attr('href')));
    });
    // Uncomment the below if mousewheel should behave like arrow keys.
    /*$('section').mousewheel(function (event) {
        event.preventDefault();
        var $element;
        if (event.deltaY > 0) {
            $element = $(this).prev();
        } else {
            $element = $(this).next();
        }
        if (!$element.length) {
            return;
        }
        scrollTo($element);
    });*/

    $(document).keydown(function (event) {
        var $element;
        if (event.which === 38) {
            $element = $currentSection.prev('section');
        } else if (event.which === 40) {
            $element = $currentSection.next('section');
        } else {
            return;
        }
        event.preventDefault();
        if (!$element.length) {
            return;
        }
        scrollTo($element);
    });

    $('section').on('scrollSpy:enter', function () {
        if (!programmaticScroll) {
            updateSection($(this));
        }
    });

    $('section').scrollSpy();
});