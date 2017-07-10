$(document).ready(function () {

    // slider change

    $('#donationSlider').on("change mousemove", function () {
        $('.cca__page__slider-title').text($(this).val() + "KBPS");
        $('.cca__page__slider-subtitle').text(Math.floor((parseInt($(this).val()) / 1400) * 100) + "% of your internet speed");
    });


    // navigation
    $(".cca__modal-title").click(function () {
        $(this).siblings(".cca__modal-conetnt").slideToggle();
    });

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

    var screensize = {
        w: window.innerWidth,
        h: window.innerHeight
    }
    // Renderer
    var renderer = PIXI.autoDetectRenderer(screensize.w, screensize.h);
    $('#pixi-container').append(renderer.view);
    renderer.autoResize = true;
    renderer.resize(screensize.w, screensize.h);
    // Stage

    var stage = new PIXI.Stage(0x000000);
    var container = new PIXI.DisplayObjectContainer();
    stage.addChild(container);
    var loader = new PIXI.AssetLoader(["images/map.png"]);
    loader.onComplete = setup;
    loader.load();
    var displacementFilte, bg;
    $(window).on('resize', resize);

    function resize() {
        var screensize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        if (screensize.w > screensize.h) {
            var ratio = screensize.w / screensize.h;
            bg.width = screensize.w
            bg.height = ratio * screensize.w;
            bg.position.y = -(screensize.w - screensize.h);

        } else {
            var ratio = screensize.h / screensize.w;
            bg.width = ratio * screensize.h;
            bg.height = screensize.h;
            bg.position.x = -(screensize.h - screensize.w) * 2;
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