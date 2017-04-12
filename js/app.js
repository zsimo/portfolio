/**
 * Created by Simone.Sacchi on 08/04/2017.
 */


"use strict";

(function () {


    var slides_id = [];
    if (location.hash === "") {
        location.hash = "#!slide1";
    }
    var browserHeight = getBrowserHeight();
    var index = parseInt(location.hash.substring(7));
    var count = 1;
    var slides_number;

    $('div[id^=slide]').each(function () {
        slides_id.push(this.id);
        //$('this').addClass('hide');
        if (count === index) {
            this.className = "slide";
        } else {
            this.className = "slide hide";
        }

        this.style.height = ((browserHeight / 100) * 80) + "px";

        count += 1;
    });
    slides_number = slides_id.length;



    // https://developer.mozilla.org/en-US/docs/Web/Events/resize
    function throttle(type, name) {
        var running = false;
        var func = function () {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(function () {
                window.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        window.addEventListener(type, func);
    };



    function getBrowserHeight() {
        return window.innerHeight || Math.max(document.documentElement.clientHeight, document.body.clientHeight);
    }


    function resize() {
        var browserHeight = getBrowserHeight();

        var slides = document.getElementsByClassName("slide");

        for (var i = 0, len = slides.length; i < len; i += 1) {
            slides[i].style.height = ((browserHeight / 100) * 80) + "px";
        }
    }

    function moveLeft() {
        if (index > 1) {

            $("#slide" + index)
                .removeClass('animated fadeInLeftBig')
                .toggleClass('hide');

            index -= 1;
            location.hash = "#!slide" + index;

            $("#slide" + index)
                .toggleClass('hide')
                .addClass('animated fadeInLeftBig');

        }
    }

    function moveRight() {
        if (index < slides_number) {

            $("#slide" + index)
                .removeClass('animated fadeInRightBig')
                .toggleClass('hide');

            index += 1;
            location.hash = "#!slide" + index;

            $("#slide" + index)
                .toggleClass('hide')
                .addClass('animated fadeInRightBig');

        }
    }

    function swipeLeft() {
        if (index < slides_number) {
            $("#slide" + index)
                .removeClass('animated fadeInRightBig')
                .toggleClass('hide');

            index += 1;
            location.hash = "#!slide" + index;

            $("#slide" + index)
                .toggleClass('hide')
                .addClass('animated fadeInRightBig');
        }
    }

    function swipeRight() {
        if (index > 1) {
            $("#slide" + index)
                .removeClass('animated fadeInLeftBig')
                .toggleClass('hide');

            index -= 1;
            location.hash = "#!slide" + index;

            $("#slide" + index)
                .toggleClass('hide')
                .addClass('animated fadeInLeftBig');
        }
    }

    function onKeyDown(e) {
        // left arrow
        if (e.keyCode === 37) {
            moveLeft();
        }
        // right arrow
        else if (e.keyCode === 39) {
            moveRight();
        }
    }




    // attach events
    $(document).keydown(onKeyDown);
    Hammer(document.getElementById('body')).on("swipeleft", swipeLeft);
    Hammer(document.getElementById('body')).on("swiperight", swipeRight);
    window.addEventListener("optimizedResize", resize);
    throttle("resize", "optimizedResize");

})();

