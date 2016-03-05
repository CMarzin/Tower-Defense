var container = $('#container'),
    wcontainer = container.width(),
    box = $('#box'),
    wh = container.width() - box.width(),
    wv = container.height() - box.height(),
    d = {},
    x = 5,
    bullet = $('.bullet').offset(),
    tower = $(".tower").offset(),
    wbullet = 16,
    hbullet = 16,
    wtower = $(".tower").width(),
    htower = $(".tower").height(),
    wbox = $("#box").width(),
    hbox = $("#box").height(),
    towerX = tower.left + wtower / 2,
    towerY = tower.top + htower / 2,
    radiusBullet = wbullet / 2;
    radiusBox = wbox / 2,
    radiustower = wtower / 2;
    hit = false;




var deplacement_balle = {
    x: 0,
    y: 0,
};

var bullets = [];

/*
* MOVE FUNCTION ONLY
*/
function newh(v, a, b) {
    var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
    return n < 0 ? 0 : n > wh ? wh : n;
}

function newv(v, a, b) {
    var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
    return n < 0 ? 0 : n > wv ? wv : n;
}

$(window).keydown(function (e) {
    d[e.which] = true;
});
$(window).keyup(function (e) {
    d[e.which] = false;
});

setInterval(function () {
    box.css({
        left: function (i, v) {
            return newh(v, 37, 39);
        },
        top: function (i, v) {
            return newv(v, 38, 40);
        }
    });
    wh = container.width() - box.width();
    wv = container.height() - box.height();
}, 20);


/*
* Tower function
*/

function update() {
    boxOffset = $("#box").offset();
    boxX = boxOffset.left + wbox / 2;
    boxY = boxOffset.top + hbox / 2;


    if(hit === true){
      console.log('check pos balle');
      var bulletOffset = $('.bullet').offset();
      var bulletX = bulletOffset.left + wbullet / 2;
      var bulletY = bulletOffset.top + hbullet / 2;
      /*
      *Hitbox bullet
      */

      var dx_bullet = boxX - bulletX;
      var dy_bullet = boxY - bulletY;
      var distance = Math.sqrt(dx_bullet * dx_bullet + dy_bullet * dy_bullet);

      if (distance < radiusBox + radiusBullet) {
        $('.bullet').last().remove();
      } else {
        //  $("#box").css("background", "black");
      }
    } else {
      console.log('fais rien')
    }


    $(".bullet").each(function () {

        var torpille = bullets[bullets.length - 1];

        torpille.x = torpille.dom.offset().left + 7.5; //35 - 28 + 0.5
        torpille.y = torpille.dom.offset().top + 7.5; // taille de .bullet/2
        var move = "translateX(" + deplacement_balle.x + "px) translateY(" + deplacement_balle.y + "px)";
        this.style.transform = move;

        if (torpille.y < boxY) {
            deplacement_balle.y += boxY / 20;
        } else {
            deplacement_balle.y -= boxY / 20;
        }
        if (torpille.x < boxX) {
            deplacement_balle.x += boxX / 20;
        } else {
            deplacement_balle.x -= boxX / 20;
        }


    });
}
setInterval(update, 200);



var Tower = {
    type: 'basic',
    move: function () {

    },
    shoot: function () {
      hit = true;
        $(".tower").append($("<div>").addClass("bullet").css({
            "left": 0,
            "top": 0,
            //"margin": "-67.5px",
            "z-index": 1,
        }));
        var last_bullet = {};
        last_bullet.dom = $('.bullet').last();
        last_bullet.h = last_bullet.dom.width();
        last_bullet.w = last_bullet.dom.height();
        last_bullet.x = last_bullet.dom.offset().left;
        last_bullet.y = last_bullet.dom.offset().top;
        bullets.push(last_bullet);
        console.log('tir');





    },
    hitbox: function () {

        /*
        *Hitbox range
        */
        var boxOffset = $("#box").offset(),
            boxX = boxOffset.left + wbox / 2,
            boxY = boxOffset.top + hbox / 2;

        var dx = boxX - towerX,
            dy = boxY - towerY,
            distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radiusBox + radiustower) {
            $("#box").css("background", "red");
            Tower.shoot();
        } else {
            $("#box").css("background", "black");
        }



    },
}

var ice_tower = Object.create(Tower);
ice_tower.type = 'ice';

window.addEventListener("keydown", Tower.hitbox, false);
