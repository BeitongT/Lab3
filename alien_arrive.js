
/*this is drawing a us map in perspective*/

var width = window.screen.width;
height = 820;

var projection = d3.geo.orthographic()
    .scale(1500)
    .translate([width / 2, height*2.3])
    .clipAngle(100)
    .precision(.5);

projection.rotate([97, 23]);

//create the canvas
var canvas = d3.select("#ufoLine").append("canvas")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)

//create the context
var context = canvas.node().getContext("2d");


// create path generator
var path = d3.geo.path()
    .projection(projection)
    .context(context);

// create graticule
var graticule = d3.geo.graticule();


queue()
  .defer(d3.json, "./world-50m.json")
  .defer(d3.csv, "./ufo-sightings/scrubbed.csv")
  .await(callback);



// call back function
function callback (error, world, ufoData) {
  if (error) throw error;

  /*start map*/
    var countries = topojson.feature(world, world.objects.countries);
    var land = topojson.feature(world, world.objects.land);
    var USA = countries.features.filter(function(d,i){if(d.id == 840) console.log(i);return d.id == 840;});
    var sphere = {type: "Sphere"};

    // context.clearRect(0, 0, width, height);

    // draw sphere
    context.beginPath();
    path(sphere);
    context.fillStyle = "rgb(10,10,10)";
    context.fill();

    // Graticule
    context.beginPath();
    path(graticule());
    context.strokeStyle = "rgba(131, 131, 131,0.5)";
    context.lineWidth = 0.5;
    context.stroke();

    // Countries 
    context.beginPath();
    path(countries);
    context.strokeStyle = "rgba(46, 44, 44, 0.178";
    context.lineWidth = 1;
    context.stroke();
    context.fillStyle = "rgba(255, 255, 255, 0.014)";
    context.fill();

    //USA
    context.beginPath();
    path(USA[0]);
    context.strokeStyle = "rgb(131, 14, 14)";
    context.lineWidth = 1;
    context.stroke();
    context.fillStyle = "black";
    context.fill();

  /*end map*/


  /*start path*/
  var smallerData = ufoData.filter(function(d){
    return d.country == "us" && d.state != "hi";  //filter out other countries and Hawaii state 
  });


  var dataLength = smallerData.length;  //get the data length to stop the timer 

  var interestingPoints = smallerData.map(function(d){  //create array of x and y coordinates on the transformed MAP
    var tempArray = [+d.longitude,+d.latitude];
    var tempResult = projection(tempArray);
    return tempResult;
   });



  var counter = 0;
  var factor = 0.4; //control the curvature of the curve || larger the curvature will be larger

  var timerFunction = function () {  // this function will process after the previous line finish  

    var lineWidth = 3 / (counter + 1);
    var duration = 1000;

    //points information
    var parentX = width / 2;
    var parentY = 80;
    var childX = interestingPoints[counter][0];
    var childY = interestingPoints[counter][1];
    var differenceX = parentX - childX;
    var controlX = (parentX + childX) / 2 - differenceX * factor;
    var controlY = (parentY + childY) / 2;

    var start = null;
    
    var step = function animatePathDrawingStep(timestamp) {
        if (start === null)
            start = timestamp;
        var delta = timestamp - start;
        var progress = Math.min(delta / duration, 1); //the progress of the line animation

        // Draw curve
        drawBezierSplit(context, parentX, parentY, controlX, controlY, childX, childY, 0, progress,lineWidth);
        

        if (progress < 1) { //redo the drawing
            window.requestAnimationFrame(step);
        }
        if(progress >= 1) {     
            //draw the circle
            context.fillStyle = "rgba(255, 153, 0, 0.5)";
            context.beginPath();
            context.arc(childX,childY,1.2,0,Math.PI * 2,true);
            context.fill();

            //which means the line is finished. For the color effect, we need to draw it again;
            context.moveTo( parentX, parentY );
            context.quadraticCurveTo( controlX, controlY, childX, childY );
            var gradient=context.createLinearGradient(0,0,0,600);
                gradient.addColorStop("0","rgba(131, 14, 14, 0.005)");
                // gradient.addColorStop("0.6","rgba(131, 14, 14, 0.1)");
                // gradient.addColorStop("1.0","rgba(131, 14, 14 0.1)");
                gradient.addColorStop("0.4","rgba(255, 153, 0, 0.06)");
                gradient.addColorStop("1.0","rgba(255, 153, 0, 0.1)");
                context.strokeStyle = gradient;
                context.lineWidth = lineWidth;
                context.stroke();
        }
    };
    

    window.requestAnimationFrame(step);
    counter++;


    if(counter > 5) {
        timer.restart(timerFunction3,500);
    }

}

  var timerFunction2 = function () {  // this function will process after the previous line finish  

    if(counter >= dataLength) {     //if finish all the lines. stop the timer
        console.log("end");
        console.log(d3.now());
        timer.stop();
    }

    // line parameters
    var lineWidth = Math.max(3 / (counter + 1),0.1);
    var duration = 500;



    //points information
    var parentX = width / 2;
    var parentY = 80;
    var childX = interestingPoints[counter][0];
    var childY = interestingPoints[counter][1];
    var differenceX = parentX - childX;
    var controlX = (parentX + childX) / 2 - differenceX * factor;
    var controlY = (parentY + childY) / 2;

    var start = null;
    
    var step = function animatePathDrawingStep(timestamp) {
        if (start === null)
            start = timestamp;
        var delta = timestamp - start;
        var progress = Math.min(delta / duration, 1); //the progress of the line animation

        // Draw curve
        drawBezierSplit(context, parentX, parentY, controlX, controlY, childX, childY, 0, progress,lineWidth);
        

        if (progress < 1) { //redo the drawing
            window.requestAnimationFrame(step);
        }
        if(progress >= 1) {     
            //draw the circle
            context.fillStyle = "rgba(255, 153, 0, 0.5)";
            context.beginPath();
            context.arc(childX,childY,1.2,0,Math.PI * 2,true);
            context.fill();

            //which means the line is finished. For the color effect, we need to draw it again;
            context.moveTo( parentX, parentY );
            context.quadraticCurveTo( controlX, controlY, childX, childY );
            var gradient=context.createLinearGradient(0,0,0,600);
                gradient.addColorStop("0","rgba(131, 14, 14, 0.005)");
                // gradient.addColorStop("0.6","rgba(131, 14, 14, 0.1)");
                // gradient.addColorStop("1.0","rgba(131, 14, 14 0.1)");
                gradient.addColorStop("0.4","rgba(255, 153, 0, 0.06)");
                gradient.addColorStop("1.0","rgba(255, 153, 0, 0.1)");
                context.strokeStyle = gradient;
                context.lineWidth = lineWidth;
                context.stroke();
        }
    };
    

    window.requestAnimationFrame(step);
    counter++;
    
}

var speed  = 500;

var timerFunction3 = function () { 
    for(var i = 0; i< speed; i++) {
    timerFunction2();
  }
}






  console.log("start"); //calculate the time
  console.log(d3.now());
  var timer = d3.interval(timerFunction,1000); // time function




//function for the line animation
 
 function drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, t0, t1,lineWidth) {
    ctx.beginPath();
    
    if( 0.0 == t0 && t1 == 1.0 ) {
        ctx.moveTo( x0, y0 );
        ctx.quadraticCurveTo( x1, y1, x2, y2 );
    } else if( t0 != t1 ) {
        var t00 = t0 * t0,
            t01 = 1.0 - t0,
            t02 = t01 * t01,
            t03 = 2.0 * t0 * t01;
        
        var nx0 = t02 * x0 + t03 * x1 + t00 * x2,
            ny0 = t02 * y0 + t03 * y1 + t00 * y2;
        
        t00 = t1 * t1;
        t01 = 1.0 - t1;
        t02 = t01 * t01;
        t03 = 2.0 * t1 * t01;
        
        var nx2 = t02 * x0 + t03 * x1 + t00 * x2,
            ny2 = t02 * y0 + t03 * y1 + t00 * y2;
        
        var nx1 = lerp ( lerp ( x0 , x1 , t0 ) , lerp ( x1 , x2 , t0 ) , t1 ),
            ny1 = lerp ( lerp ( y0 , y1 , t0 ) , lerp ( y1 , y2 , t0 ) , t1 );
        
        ctx.moveTo( nx0, ny0 );
        ctx.quadraticCurveTo( nx1, ny1, nx2, ny2 );
    }


    // context.strokeStyle = "rgb(131, 144, 14)";
    var gradient=context.createLinearGradient(0,0,0,600);
    gradient.addColorStop("0","rgba(131, 14, 14, 0.005)");
    // gradient.addColorStop("0.6","rgba(131, 14, 14, 0.1)");
    // gradient.addColorStop("1.0","rgba(131, 14, 14 0.1)");
    gradient.addColorStop("0.4","rgba(255, 153, 0, 0.06)");
    gradient.addColorStop("1.0","rgba(255, 153, 0, 0.1)");
    context.strokeStyle = gradient;
    context.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
}

/**
 * Linearly interpolate between two numbers v0, v1 by t
 */
 
function lerp(v0, v1, t) {
    return ( 1.0 - t ) * v0 + t * v1;
}

}

  

