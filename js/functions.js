$(document).ready(function () {


    // Navigation


    function exitDialog() {
        $('#moreDialog').fadeOut(400);
    }

    function showDialog() {
        $('#moreDialog').fadeIn(400);
    }


    function exitAboutDialog() {
        $('#aboutDialog').fadeOut(400);
        $(".cca__logo").removeClass('tmp-hide');

    }

    function showAboutDialog() {
        $('#aboutDialog').fadeIn(400);
        $(".cca__logo").addClass('tmp-hide');

    }



    function showMainPage() {
        $('.cca-page-content-wrap').fadeIn(400);
        $('#innitialAlert').fadeOut(400);
        $('.cca__logo').addClass('upper');
        firstScreenIsActive = false;
    }

    function donateButton() {
        $('.cca-page-content-wrap').fadeOut(400);
        $('#thankYouMsg').fadeIn(400);
        $('.cca__logo').removeClass('upper');
        // Here goes the captive portal and analytics code        
    }

    function cancelButton() {
        $('.cca-page-content-wrap').fadeOut(400);
        $('#noDonationMsg').fadeIn(400);
        $('.cca__logo').removeClass('upper');
        // Here goes the captive portal and analytics code        
    }


    $("#backDialog").on("click", exitDialog);
    $("#learnMoreButton").on("click", showDialog);

    $("#backAboutDialog").on("click", exitAboutDialog);
    $(".cca__logo").on("click", showAboutDialog);


    $("#okButtonDialog").on("click", showMainPage);
    $("#dontDonateButton").on("click", cancelButton);
    $("#donateButton").on("click", donateButton);




    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (!isSafari) {
        // If browser is chrome then background blur is not supported
        $(".cca-surface").addClass('cca-surface--no-webkit');
    }


    // Change coordiantes
    var NUM_OF_DIGITS = 3;
    var MOVE_MAGNITUDE = 3;
    var firstScreenIsActive = true;

    function randomizeCoord() {
        // if (firstScreenIsActive) {
            // Get random numbers
            var c1 = Math.floor(Math.random() * (Math.pow(10, NUM_OF_DIGITS)));
            var c2 = Math.floor(Math.random() * (Math.pow(10, NUM_OF_DIGITS)));
            // Change text
            $("#randomizeNumbers1").text(c1);
            $("#randomizeNumbers2").text(c2);
            // Move marker
            $(".cca__location-marker").css('left', 'calc(50% - 130px + ' + MOVE_MAGNITUDE * (c1 / Math.pow(10, NUM_OF_DIGITS - 1)) + 'px)');
            $(".cca__location-marker").css('top', 'calc(50% - 250px + ' + MOVE_MAGNITUDE * (c2 / Math.pow(10, NUM_OF_DIGITS - 1)) + 'px)');

        // }

    }
    randomizeCoord();
    $(function () {
        setInterval(randomizeCoord, 5630);
    });


    // slider change
    $('#donationSlider').change(function () {
        var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

        $(this).css('background-image',
            '-webkit-gradient(linear, left top, right top, ' +
            'color-stop(' + val + ', #3F51B5), ' +
            'color-stop(' + val + ', #B1B1B1)' +
            ')'
        );

        $('#modal-kbps-number').text($(this).val());
        $('#modal-percent-number').text(Math.floor((parseInt($(this).val()) / 1400) * 100) + "%");
    });



    // Zippy interaction
    $(".cca__modal-title").click(function () {
        $(this).siblings(".cca__modal-conetnt").slideToggle();
        $(this).toggleClass('cca__zippy--open');
    });


    // Language change

    //default to english
    switchLangToEng();



    $(".cca__heb-button").click(function () {
        $('.cca__flash-screen').addClass('cca__flash-screen--visible');
        setTimeout(
            function () {
                switchLangToHeb();

                $('.cca__flash-screen').removeClass('cca__flash-screen--visible');
            }, 200);

    });
    $(".cca__eng-button").click(function () {
        $('.cca__flash-screen').addClass('cca__flash-screen--visible');
        setTimeout(
            function () {
                switchLangToEng();

                $('.cca__flash-screen').removeClass('cca__flash-screen--visible');
            }, 200);
    });

    function switchLangToHeb() {
        $('.cca__modal-wrap, .cca__logo, .cca__alert__subtitle, .cca__alert__title, .cca__page__slider-subtitle, .cca__page__slider-title, .cca__language-switch').addClass('hebrew-font');
        $('#backAboutDialog, #backDialog').html('arrow_forward')
        for (var key in translations) {
            if (translations.hasOwnProperty(key)) {
                $('#' + key).html(translations[key].heb);
                $('#' + key).addClass('hebrew-font');
            }
        }
    }

    function switchLangToEng() {
        $('.cca__modal-wrap, .cca__logo, .cca__alert__subtitle, .cca__alert__title, .cca__page__slider-subtitle, .cca__page__slider-title, .cca__language-switch').removeClass('hebrew-font');
        $('#backAboutDialog, #backDialog').html('arrow_back')
        for (var key in translations) {
            if (translations.hasOwnProperty(key)) {
                $('#' + key).html(translations[key].eng);
                $('#' + key).removeClass('hebrew-font');
            }
        }
    }





    // Background animation

    var screensize = {
        w: window.innerWidth,
        h: window.innerHeight
    }
    var center = {
        x: -50,
        y: -150
    }
    

    var imgRatio;
    var imgInnitialSizeH,imgInnitialSizeW;

    // Renderer
    var renderer = PIXI.autoDetectRenderer(screensize.w, screensize.h);
    $('#pixi-container').append(renderer.view);
    renderer.autoResize = true;
    renderer.resize(screensize.w, screensize.h);
    // Stage
    var stage = new PIXI.Stage(0x021019);
    var container = new PIXI.DisplayObjectContainer();
    stage.addChild(container);
    var loader = new PIXI.AssetLoader(["images/map.gif"]);
    loader.onComplete = setup;
    loader.load();
    var displacementFilte, bg;
    $(window).on('resize', resize);

    function resize() {
        var screensize = {
            w: window.innerWidth,
            h: window.innerHeight
        }

        bg.height =  imgInnitialSizeH/2;
        bg.width =  imgInnitialSizeW/2;
        bg.position.y = center.y+(screensize.h / 2 - bg.height / 2);
        bg.position.x = center.x+(screensize.w / 2 - bg.width / 2);

        // if (screensize.w > screensize.h) {
        //     var ratio = screensize.w / screensize.h;
        //     bg.width = screensize.w + 200
        //     bg.height = ratio * screensize.w + 200;
        //     bg.position.y = -(screensize.w - screensize.h) - 100;

        // } else {
        //     var ratio = screensize.h / screensize.w;
        //     bg.width = ratio * screensize.h + 200;
        //     bg.height = screensize.h + 200;
        //     bg.position.x = -100 - (screensize.h - screensize.w) * 2;
        // }
        renderer.resize(screensize.w, screensize.h);
    }
    function setup() {
        var texture = PIXI.TextureCache["images/map.gif"];
        bg = new PIXI.Sprite(texture);
        container.addChild(bg);
        imgRatio = bg.width / bg.height;
        imgInnitialSizeH = bg.height;
        imgInnitialSizeW = bg.width;
        // Stretch background
        resize();
        // Filter
        var displacementTexture = PIXI.Texture.fromImage("images/bump.jpg");
        displacementFilter = new PIXI.DisplacementFilter(displacementTexture);
        container.filters = [displacementFilter];
        requestAnimFrame(animate);
    }

    // Animate
    function animate() {
        var offset = 0.5;
        displacementFilter.offset.x += offset;
        // displacementFilter.offset.y += offset;
        renderer.render(stage);
        requestAnimFrame(animate);

    }

});