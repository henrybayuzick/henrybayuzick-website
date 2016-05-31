$('[data-fit]').slabText();

var mainPosition = $('[data-main]').offset();
var mainPositionWidth = $('[data-main]').width();
var mainPositionHeight = $('[data-main]').height()

$('[data-work]').click(function(){
    $('[data-links]').each(function(){
    var newq = makeNewPosition($(this).parent());
    $(this).css({'opacity':'1', 'position':'absolute', 'top': newq[0], 'left': newq[1]});
    animateDiv($(this));
});

})

//var newq = makeNewPosition($('[data-work="1"]'));

function makeNewPosition($container) {
    // Get viewport dimensions (remove the dimension of the div)
    var h = $container.height() - 50;
    var w = $container.width() - 50;


    while (true) {
        var nh = Math.floor(Math.random() * h);
        var nw = Math.floor(Math.random() * w);

        console.log("New width: "+nw);
        console.log("Main left: "+mainPosition.left);
        console.log("Main width: "+mainPositionWidth);

        // Check width 
        if ((nw < mainPosition.left) || (nw > (mainPosition.left+mainPositionWidth) ) ) {
            console.log('true width')

            // Check height
            if ((nh < mainPosition.top) || (nh > mainPositionHeight)) {
                console.log('true height')

                break;
            }
        }
        else {
            console.log('false');
            continue;
        }
    }


    return [nh, nw]; 
}

function animateDiv($target) {
    var newq = makeNewPosition($target.parent());
    var oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $target.animate({
        top: newq[0],
        left: newq[1]
    }, speed, function() {
        animateDiv($target);
    });

};

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.05;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;
}