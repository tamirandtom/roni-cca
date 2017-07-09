$(document).ready(function () {


    $(".cca__modal-title").click(function () {
        $(this).siblings(".cca__modal-conetnt").slideToggle();
    });

    function exitDialog() {
        $('.cca__modal-wrap').fadeOut(400);
    }
    function showDialog() {
        $('.cca__modal-wrap').fadeIn(400);
    }

    function showMainPage() {
        $('.cca-page-content-wrap').fadeIn(400);
        $('#innitialAlert').fadeOut(400);

    }

    function donateButton() {
        $('.cca-page-content-wrap').fadeOut(400);
        $('#thankYouMsg').fadeIn(400);

    }
    function cancelButton() {
        $('.cca-page-content-wrap').fadeOut(400);
        $('#noDonationMsg').fadeIn(400);

    }


    $("#backDialog").on("click", exitDialog);
    $("#learnMoreButton").on("click", showDialog);
    $("#okButtonDialog").on("click", showMainPage);

    $("#dontDonateButton").on("click", cancelButton);
    $("#donateButton").on("click", donateButton);
    $(window).on('resize', resize);
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

        }
        else {
            var ratio = screensize.h / screensize.w;
            bg.width = ratio * screensize.h;
            bg.height = screensize.h;
            bg.position.x = -(screensize.h - screensize.w)*2;
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
        var displacementTexture = PIXI.Texture.fromImage("http://i.imgur.com/2yYayZk.png");
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