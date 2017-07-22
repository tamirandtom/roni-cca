$(document).ready(function () {


    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (isChrome) { 
        // If browser is chrome then background blur is not supported
        $(".cca-surface").addClass('cca-surface--no-webkit');
    }
    // slider change
    var NUM_OF_DIGITS = 3;
    var MOVE_MAGNITUDE = 3;
    var firstScreenIsActive = true;

    function randomizeCoord() {
        if (firstScreenIsActive) {
            // Get random numbers
            var c1 = Math.floor(Math.random() * (Math.pow(10, NUM_OF_DIGITS)));
            var c2 = Math.floor(Math.random() * (Math.pow(10, NUM_OF_DIGITS)));

            // Change text
            $("#randomizeNumbers1").text(c1);
            $("#randomizeNumbers2").text(c2);

          
            $(".cca__location-marker").css('left','calc(20% + '+MOVE_MAGNITUDE * (c1 / Math.pow(10, NUM_OF_DIGITS - 1))+'px)');
            $(".cca__location-marker").css('top','calc(10% + '+MOVE_MAGNITUDE * (c2 / Math.pow(10, NUM_OF_DIGITS - 1))+'px)');


            // Move map
            // bg.position.y = innitialPos.y + ;
            // bg.position.x = innitialPos.x + MOVE_MAGNITUDE * (c2 / Math.pow(10, NUM_OF_DIGITS - 1));


        }

    }
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

        $('.cca__page__slider-title').text($(this).val() + "KBPS");
        $('.cca__page__slider-subtitle').text(Math.floor((parseInt($(this).val()) / 1400) * 100) + "% of your internet speed");
    });



    // zippy
    $(".cca__modal-title").click(function () {
        $(this).siblings(".cca__modal-conetnt").slideToggle();
        $(this).toggleClass('cca__zippy--open');
    });


    // navigation


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

    }

    function cancelButton() {
        $('.cca-page-content-wrap').fadeOut(400);
        $('#noDonationMsg').fadeIn(400);
        $('.cca__logo').removeClass('upper');

    }


    $("#backDialog").on("click", exitDialog);
    $("#learnMoreButton").on("click", showDialog);

    $("#backAboutDialog").on("click", exitAboutDialog);
    $(".cca__logo").on("click", showAboutDialog);


    $("#okButtonDialog").on("click", showMainPage);
    $("#dontDonateButton").on("click", cancelButton);
    $("#donateButton").on("click", donateButton);


    // Background animation

    var screensize = {
        w: window.innerWidth,
        h: window.innerHeight
    }
    var innitialPos = {
        x: 0,
        y: 0
    }

    // Renderer
    var renderer = PIXI.autoDetectRenderer(screensize.w, screensize.h);
    $('#pixi-container').append(renderer.view);
    renderer.autoResize = true;
    renderer.resize(screensize.w, screensize.h);
    // Stage

    var stage = new PIXI.Stage(0xff0000);
    var container = new PIXI.DisplayObjectContainer();
    stage.addChild(container);
    var loader = new PIXI.AssetLoader(["images/map.png"]);
    loader.onComplete = setup;
    loader.load();
    var displacementFilte, bg;
    $(window).on('resize', resize);



    // function resize() {
    //             var ww = window.clientWidth, hh = window.clientHeight;
    //             var ratio = Math.min(1, Math.min(ww / w0, hh / h0));
    //             w1 = Math.ceil(ratio * w0); h1 = Math.ceil(ratio * h0);
    //             bg.width = w1 + "px";
    //             bg.height = h1 + "px";
    //             bg.left = Math.floor((ww-w1)/2) + "px";
    //             bg.top = Math.floor((hh-h1)/2) + "px";

    // }

    function resize() {
        var screensize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        if (screensize.w > screensize.h) {
            var ratio = screensize.w / screensize.h;
            bg.width = screensize.w + 200
            bg.height = ratio * screensize.w + 200;
            bg.position.y = -(screensize.w - screensize.h) - 100;

        } else {
            var ratio = screensize.h / screensize.w;
            bg.width = ratio * screensize.h + 200;
            bg.height = screensize.h + 200;
            bg.position.x = -100 -(screensize.h - screensize.w) * 2;
        }
        renderer.resize(screensize.w, screensize.h);
    }


    function setup() {
        var texture = PIXI.TextureCache["images/map.png"];
        bg = new PIXI.Sprite(texture);
        container.addChild(bg);
        // Stretch background
        resize();
        // Filter
        var displacementTexture = PIXI.Texture.fromImage("images/bump.png");
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