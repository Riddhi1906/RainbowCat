function dough() {
    if (frameCount % 90 === 0) {
     var dough = createSprite(650, 200.10, 10);
     dough.addImage(dough1);
     dough.y = Math.round(random(50, 350));
     // dough.velocityX = -7;
     dough.velocityX = -(7 + EatT * 1.5 / 8);
     dough.scale = 0.1;
 
     doughG.add(dough);
     }
   }
 
 function hole() {
    if (frameCount % 190 === 0) {
     var hole = createSprite(650, 200.10, 10);
     hole.addImage(hole111);
     hole.y = Math.round(random(50, 330));
     // hole.velocityX = -7;
     hole.scale = 0.5;
     hole.setCollider("rectangle", 0, 0, 200, 200);
     hole.velocityX = -(7 + EatT * 1.5 / 10);
     holeG.add(hole);
     }
   }
 
 function reset() {
    if ((touches.length > 0 || keyDown("r"))) {
     gamestate = START;
     back.visible = true;
     cat.visible = true;
     text1.visible = true;
     EatT = 0;
     time = 0;
     deaths = deaths + 1;
     touches = [];
   }
 }