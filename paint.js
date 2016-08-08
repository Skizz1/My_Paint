var c;
var ctx;
var calque;
var count;
var index;
var active;
var mouse;
var lastmouse;
var pencil;
var circlepl;
var circlevi;
var rayon;
var start_angle;
var end_angle;
var line;
var firstx;
var firsty;
var rectanglepl;
var secondx;
var secondy;
var rectanglevi;
var gomme;
var taille;
var symetrie;
var symetriex;
var sym_x;
var sym_x2;
var sym_y;
var sym_y2;

$(document).ready(function() {

      calque = 'new';
      c = document.getElementById(calque);
      ctx = c.getContext("2d");

      $(document).on("click",".calque-view",function()
      {
            calque = $(this).data('name');
            c = $("#"+calque)[0];
            ctx = c.getContext("2d");
      });

  
      console.log(c);

      var symv = null;
      $('#symetriev').click(function() {
            symv = $(this).data('name');
      });

      
      $('#default').click(function() {
            symv = $(this).data('name');
      });

      $('#symetrieh').click(function() {
            symv = $(this).data('name');
      });

      count = 0;
      index = -20;
      $('#calque').click(function() {
            count++;
            
            $('<div class="calque-view" data-name="canvas'+count+'">Calque '+count+'</div>').appendTo('#calques');

            $('<canvas id="canvas'+count+'" width="1300" height="645"></canvas>').prependTo('#canvas');
            $('#canvas'+count+'').css({
                  'z-index' : index,
                  'position' : 'absolute',
                  'top' : '175px',
                  'left' : '430px'
            });
      });

/*
*
* Function image slider
*
*/
active = null;
$('.legende').click(function() {
      active = $(this).data('name');
      if (calque == 'new') {
            $('#new').css('cursor', 'url(cursor/cursor_'+active+'.cur), progress');
      } else {
            $('#'+calque).css('cursor', 'url(cursor/cursor_'+active+'.cur), progress');
      }
});


/*
*
* Function pencil
*
*/
var X;
var Y;
mouse = {x:0, y:0};
lastmouse = {x:0, y:0};
$('#'+calque).mousedown(function(e) {
      pencil = true;
      if(active == "pencil"){

            X = e.clientX + window.pageXOffset - 429;
            Y = e.clientY + window.pageYOffset - 176;
            ctx.moveTo(X, Y);
      }
});
$('#'+calque).mouseup(function(e) {
      pencil = false;
});


$('#'+calque).mousemove(function(e){
      var x = e.clientX + window.pageXOffset - 429;
      var y = e.clientY + window.pageYOffset - 176;
      lastmouse.x = mouse.x;
      lastmouse.y =  mouse.y;
      mouse.x = x;
      mouse.y = y;

      $('#'+calque).click(function(e) {

            if(active == "pencil") {
                  ctx.beginPath();
                  ctx.lineWidth= $('#number').val();
                  ctx.strokeStyle = $('#color').val();
                  ctx.arc(X, Y, 1, 0, 2 * Math.PI);
                  ctx.stroke();     
            }
      });
      
      if (symv === 'symetriev' && active === "pencil" && pencil === true ) {
            vertical(lastmouse, mouse);
            ctx.strokeStyle = $('#color').val();
            ctx.stroke();

      } if (symv === 'symetrieh' && active === "pencil" && pencil === true ) {
            horizontale(lastmouse, mouse);
            ctx.strokeStyle = $('#color').val();
            ctx.stroke();

      } else if (pencil === true && active === "pencil") {
            ctx.lineTo(x, y); 
             ctx.lineWidth= $('#number').val();
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = $('#color').val();
            ctx.stroke();     
      }
});



/*
*
* Function filled circle
*
*/
circlepl = 0;
$('#'+calque).click(function(e) {

      if (active == 'cerclepl') {
            circlepl++;
            if (circlepl == 1) {
                  x = e.clientX + window.pageXOffset - 429;
                  y = e.clientY + window.pageYOffset - 176;
            } else {
                  var firstx = e.clientX + window.pageXOffset - 429;
                  var firsty = e.clientY + window.pageYOffset - 176;
                  var start_degrees = 0;
                  var start_angle = (Math.PI/180) * start_degrees;

                  var end_degrees = 360;
                  var end_angle = (Math.PI/180) * end_degrees;

                  var rayon = ((y - firsty) * (y - firsty)) + ((x - firstx) * (x - firstx));
                  rayon = Math.sqrt(rayon);

                  ctx.beginPath();
                  ctx.lineWidth= $('#number').val();
                  ctx.arc(x, y, rayon, start_angle, end_angle, true);
                  ctx.globalCompositeOperation = "source-over";
                  ctx.fillStyle = $('#color').val();
                  ctx.fill();
                  circlepl = 0;
                  
                  if (symv == 'symetriev') {
                        vertical(x, y,rayon);
                        ctx.fillStyle = $('#color').val(); 
                        ctx.fill();
                  }

                  if (symh == 'symetrieh') {
                        horizontale(x, y,rayon);
                        ctx.fillStyle = $('#color').val(); 
                        ctx.fill();
                  }

            }

      }
});


/*
*
* Function empty circle
*
*/
circlevi = 0;
$('#'+calque).click(function(e) {

      if (active == 'cerclevi') {
            circlevi++;
            rayon = 0;
            if (circlevi == 1) {
                  x = e.clientX + window.pageXOffset - 429;
                  y = e.clientY + window.pageYOffset - 176;
            } else {
                  var firstx = e.clientX + window.pageXOffset - 429;
                  var firsty = e.clientY + window.pageYOffset - 176;
                  var start_degrees = 0;
                  start_angle = (Math.PI/180) * start_degrees;

                  var end_degrees = 360;
                  end_angle = (Math.PI/180) * end_degrees;

                  rayon = ((y - firsty) * (y - firsty)) + ((x - firstx) * (x - firstx));
                  rayon = Math.sqrt(rayon);

                  ctx.beginPath();
                  ctx.lineWidth= $('#number').val();
                  ctx.arc(x, y, rayon, start_angle, end_angle, true);
                  ctx.globalCompositeOperation = "source-over";
                  ctx.strokeStyle = $('#color').val();
                  ctx.stroke();
                  circlevi = 0;
            }

            if (symv == 'symetriev') {
                  vertical(x, y,rayon);
                  ctx.strokeStyle = $('#color').val(); 
                  ctx.stroke();
            }

            if (symv == 'symetrieh') {
                  horizontale(x, y,rayon);
                  ctx.strokeStyle = $('#color').val(); 
                  ctx.stroke();
            }
      }
});


/*
*
* Function line
*
*/
line = 0;
$('#'+calque).click(function(e) {

      if (active == 'line') {
            line++;
            firstx = 0;
            firsty = 0;
            if (line == 1) {
                  x = e.clientX + window.pageXOffset - 429;
                  y = e.clientY + window.pageYOffset - 176;  
            } else {
                  firstx = e.clientX + window.pageXOffset - 429;
                  firsty = e.clientY + window.pageYOffset - 176;

                  ctx.beginPath();
                  ctx.lineWidth= $('#number').val();
                  ctx.moveTo(x, y);
                  ctx.lineTo(firstx, firsty);
                  ctx.globalCompositeOperation = "source-over";
                  ctx.strokeStyle = $('#color').val();
                  ctx.stroke();
                  line = 0;

                  if (symv == 'symetriev') {
                        vertical(x, y, firstx, firsty);
                        ctx.strokeStyle = $('#color').val(); 
                        ctx.stroke();
                  }

                  if (symv == 'symetrieh') {
                        horizontale(x, y, firstx, firsty);
                        ctx.strokeStyle = $('#color').val(); 
                        ctx.stroke();
                  }
            }
      }
});


/*
*
* Function filled rectangle
*
*/
rectanglepl = 0;
$('#'+calque).click(function(e) {

      if (active == 'rectanglepl') {
            rectanglepl++;
            if (rectanglepl == 1) {
                  x = e.clientX + window.pageXOffset - 429;
                  y = e.clientY + window.pageYOffset - 176;  
            } else {
                  firstx = e.clientX + window.pageXOffset - 429;
                  firsty = e.clientY + window.pageYOffset - 176;
                  secondx = firstx - x;
                  secondy = firsty - y;

                  ctx.beginPath();
                  ctx.lineWidth= $('#number').val();
                  ctx.globalCompositeOperation = "source-over";
                  ctx.fillStyle = $('#color').val();
                  ctx.rect(x, y, secondx, secondy);
                  ctx.fill();
                  rectanglepl = 0;
            }

            if (symv == 'symetriev') {
                  vertical(firstx, y, secondx, secondy);
                  ctx.fillStyle = $('#color').val(); 
                  ctx.fill();
            }

            if (symv == 'symetrieh') {
                  horizontale(x, firsty, secondx, secondy);
                  ctx.fillStyle = $('#color').val(); 
                  ctx.fill();
            }
      }
});


/*
*
* Function empty rectangle
*
*/
rectanglevi = 0;
var x = 0;
var y = 0;
$('#'+calque).click(function(e) {

      if (active == 'rectanglevi') {
            rectanglevi++;
            if (rectanglevi == 1) {
                  x = e.clientX + window.pageXOffset - 429;
                  y = e.clientY + window.pageYOffset - 176;  

            } else {
                  firstx = e.clientX + window.pageXOffset - 429;
                  firsty = e.clientY + window.pageYOffset - 176;
                  secondx = firstx - x;
                  secondy = firsty - y;

                  ctx.beginPath();
                  ctx.lineWidth= $('#number').val();
                  ctx.globalCompositeOperation = "source-over";
                  ctx.strokeStyle = $('#color').val();
                  ctx.rect(x, y, secondx, secondy);
                  ctx.stroke();
                  rectanglevi = 0;
            }

            if (symv == 'symetriev') {
                  vertical(firstx, y, secondx, secondy);
                  ctx.strokeStyle = $('#color').val(); 
                  ctx.stroke();
            }

            if (symv == 'symetrieh') {
                  horizontale(x, firsty, secondx, secondy);
                  ctx.strokeStyle = $('#color').val(); 
                  ctx.stroke();
            }
      }
});

/*
*
* Function rubber
*
*/
$('#gomme').click(function() {

      $('#'+calque).mousedown(function(e) {
            if (active == 'gomme') {
                  gomme = true;
                  $('#'+calque).mouseup(function(e) {
                        gomme = false;
                  });
                  var x = e.clientX + window.pageXOffset - 429;
                  var y = e.clientY + window.pageYOffset - 176;
                  ctx.beginPath();
                  ctx.lineWidth= $('#number').val();
                  ctx.arc(x, y, 1, 0, 2 * Math.PI);
                  ctx.moveTo(x, y);
                  ctx.globalCompositeOperation = "destination-out";
                  ctx.strokeStyle = "rgba(0,0,0,1.0)";
                  ctx.stroke();

                  $('#'+calque).mousemove(function(e){
                        if (gomme === true ) {
                              x = e.clientX + window.pageXOffset - 429;
                              y = e.clientY + window.pageYOffset - 176;
                              ctx.lineTo(x, y);
                              ctx.globalCompositeOperation = "destination-out";
                              ctx.strokeStyle = "rgba(0,0,0,1.0)"; 
                              ctx.stroke();     
                        }
                  });
            }
      });
});


/*
*
* Download canvas with choice name file
*
*/
function downloadCanvas(link, canvasId, filename) {
      link.href = document.getElementById(canvasId).toDataURL();
      link.download = filename;
}
document.getElementById('download').addEventListener('click', function() {
      var name = prompt("Nom de votre fichier");
      downloadCanvas(this, 'new', name+'.png');
}, false);

/*
*
* Upload canvas
*
*/
function readImage() {
      if ( this.files && this.files[0] ) {
            var FR = new FileReader();
            FR.onload = function(e) {
                  var img = new Image();
                  img.onload = function() {
                        ctx.drawImage(img, 0, 0);
                  };
                  img.src = e.target.result;
            };       
            FR.readAsDataURL( this.files[0] );
      }
}

document.getElementById('upload').addEventListener("change", readImage, false);


});

function vertical(x, y, x2, y2) {
      taille = c.width / 2;
      symetrie = ((taille - x) * 2) + x;
      symetriex = ((taille - x2) * 2) + x2;

      ctx.beginPath();
      if (active == 'pencil') 
      {
            lastmouse = x;
            mouse = y;
            sym_x = c.width - lastmouse.x;
            sym_x2 = c.width - mouse.x;
            ctx.moveTo(sym_x, lastmouse.y);
            ctx.lineTo(sym_x2, mouse.y);
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth= $('#number').val();
            ctx.stroke();
            ctx.moveTo(lastmouse.x, lastmouse.y);
            ctx.lineTo(mouse.x, mouse.y);

      } else if (active == 'rectanglevi') {
            ctx.rect(symetrie, y, x2, y2);

      } else if (active == 'rectanglepl') {
            ctx.rect(symetrie, y, x2, y2);

      } else if (active == 'cerclevi') {
            ctx.arc(symetrie, y, x2, 0, 2 * Math.PI);

      } else if (active == 'cerclepl') {
            ctx.arc(symetrie, y, x2, 0, 2 * Math.PI);

      } else if (active == 'line') {
            ctx.moveTo(symetrie, y);
            ctx.lineTo(symetriex, y2);
      }

      ctx.lineWidth= $('#number').val();
      ctx.globalCompositeOperation = "source-over"; 
}

function horizontale(x, y, x2, y2) {
      taille = c.height / 2;
      symetrie = ((taille - y) * 2) + y;
      symetriex = ((taille - y2) * 2) + y2;

      ctx.beginPath();
      if (active == 'pencil') {
            lastmouse = x;
            mouse = y;
            sym_y = c.height - lastmouse.y;
            sym_y2 = c.height - mouse.y;
            ctx.moveTo(lastmouse.x, sym_y);
            ctx.lineTo(mouse.x, sym_y2);
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth= $('#number').val();
            ctx.stroke();
            ctx.moveTo(lastmouse.x, lastmouse.y);
            ctx.lineTo(mouse.x, mouse.y);

      } else if (active == 'rectanglevi') {
            ctx.rect(x, symetrie, x2, y2);

      } else if (active == 'rectanglepl') {
            ctx.rect(x, symetrie, x2, y2);

      } else if (active == 'cerclevi') {
            ctx.arc(x, symetrie, x2, 0, 2 * Math.PI);

      } else if (active == 'cerclepl') {
            ctx.arc(x, symetrie, x2, 0, 2 * Math.PI);

      } else if (active == 'line') {
            ctx.moveTo(x, symetrie);
            ctx.lineTo(x2, symetriex);

      }

      ctx.lineWidth= $('#number').val();
      ctx.globalCompositeOperation = "source-over"; 
}