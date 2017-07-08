$(document).ready(function () {


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
    var loader = new PIXI.AssetLoader(["../images/background-image.png"]);
    loader.onComplete = setup;
    loader.load();
var displacementFilte;
    function setup() { 
        var texture = PIXI.TextureCache["../images/background-image.png"];
        var bg = new PIXI.Sprite(texture);
        container.addChild(bg);
        // Stretch background
        bg.scale.x = screensize.w/bg.width;
        bg.scale.y = screensize.h/bg.height;
        // Filter
        var displacementTexture = PIXI.Texture.fromImage("http://i.imgur.com/2yYayZk.png");
        displacementFilter = new PIXI.DisplacementFilter(displacementTexture);
        container.filters = [displacementFilter];
        requestAnimFrame(animate);
    }
    // Animate
    function animate() {
        var offset = 0.2;
        displacementFilter.offset.x += offset;
        // displacementFilter.offset.y += offset;
        renderer.render(stage);
        requestAnimFrame(animate);
       
    }

});