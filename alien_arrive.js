
/*this is drawing a us map in perspective*/

var width = window.screen.width;
height = 640;

var projection = d3.geo.orthographic()
    .scale(1500)
    .translate([width / 2, height*2.7])
    .clipAngle(100)
    .precision(.5);

projection.rotate([95, 23]);

var canvas = d3.select("#ufoLine").append("canvas")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context);


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

        context.clearRect(0, 0, width, height);

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


        context.beginPath();
        path(USA[0]);
        context.strokeStyle = "rgb(131, 14, 14)";
        context.lineWidth = 1;
        context.stroke();
        context.fillStyle = "url(\"#RadialGradient\")";
        context.fill();

  /*end map*/


  /*start path  BeitongTian*/
  var smallerData = ufoData.filter(function(d){
    return d.country == "us" && d.state != "hi";  //filter out other countries and Hawaii state 
  });

  var interestingPoints = smallerData.map(function(d){  //create array of x and y coordinates on the transformed MAP
    var tempArray = [+d.longitude,+d.latitude];
    var tempResult = projection(tempArray);
    return tempResult;
   });


  /*start canvas*/


  var parentX = width/2;  // x y coordinates of the start points
  var parentY = 0;

  interestingPoints.forEach(function(d,i){


    var tempX = interestingPoints[i][0];
    var tempY = interestingPoints[i][1];
    var differenceX = parentX - tempX;
    var factor = 0.2; //control the curvature of the curve || larger the curvature will be larger
    var controlX = (parentX + tempX) / 2 - differenceX * factor;
    var controlY = (parentY + tempY) / 2;

    context.beginPath();
    context.moveTo(parentX, parentY);
    context.quadraticCurveTo(controlX, controlY, tempX, tempY);
    context.strokeStyle = "rgba(255, 153, 0, 0.1)";
    context.lineWidth = 0.08;
    context.stroke();



    context.fillStyle = "rgba(255, 153, 0, 0.5)";
    context.beginPath();
    context.arc(tempX,tempY,1.2,0,Math.PI * 2,true);
    context.fill();
  });


  /*end canvas*/




}

  

