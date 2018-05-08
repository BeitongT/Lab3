
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
  var smallerData = ufoData.slice(0,10000).filter(function(d){
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
  var duration = 20;  // each line animation time



  var timer = d3.interval(function () {  // this function will process after the previous line finish  

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
        drawBezierSplit(context, parentX, parentY, controlX, controlY, childX, childY, 0, progress);
        

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
        if(progress == 1) {
            //draw the circle
            context.fillStyle = "rgba(255, 153, 0, 0.5)";
            context.beginPath();
            context.arc(childX,childY,1.2,0,Math.PI * 2,true);
            context.fill();
        }
    };
    

    window.requestAnimationFrame(step);
    counter++;

    //if finish all the lines. stop the timer
    if(counter >= dataLength) timer.stop();


},duration);


//function for the line animation
 
 function drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, t0, t1) {
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
    gradient.addColorStop("0","rgba(131, 14, 14, 0.012)");
    // gradient.addColorStop("0.6","rgba(131, 14, 14, 0.1)");
    // gradient.addColorStop("1.0","rgba(131, 14, 14 0.1)");
    gradient.addColorStop("0.4","rgba(255, 153, 0, 0.12)");
    gradient.addColorStop("1.0","rgba(255, 153, 0, 0.2)");
    context.strokeStyle = gradient;
    context.lineWidth = 0.1;
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

  

