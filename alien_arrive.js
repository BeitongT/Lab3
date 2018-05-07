
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
  // console.log(ufoData);
  if (error) throw error;
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
  var dataRange = [0,80000]; // data range from dataRange[0] to dataRange[1]
  var smallerData = ufoData.slice(dataRange[0],dataRange[1]).filter(function(d){
    return d.country == "us" && d.state != "hi";  //filter out other countries and Hawaii state 
  });

  var interestingPoints = smallerData.map(function(d){  //create array of x and y coordinates on the transformed MAP
    var tempArray = [+d.longitude,+d.latitude];
    var tempResult = projection(tempArray);
    return tempResult;
   });


  // var isSpline = 0; // 0 for straight line  || 1 for curve 

  // var data = [];

  // var parentX = width/2;  // x y coordinates of the start points
  // var parentY = 0;

  // data.push([parentX,parentY]);
  // data.push([0,0]);
  // if(isSpline) {
  //   data.push([0,0]);
  // }

  // // general variables 
  // var lineTime = 2000;  //line animation time
  // var speedUpRate = 0.2;  //animation speed up rate linear
  // var circleTime = 20;  //circle animation time
  // var lineOpacity = 0.3;  
  // var lineWidth = 3;
  // var circleOpacity = 0.4;
  // var circleRadius = 5;

  // //temp variables 
  // var thisLineTimeNew = 0;
  // var thisLineTimeHis = 0;
  // var speedUP = speedUpRate * lineTime;
  // var lineTotalDelay = 0;
  // var circleTotalDelay = 0;

  // interestingPoints.forEach(function(d,i){

  //   /* animation delay time calculation start*/
  //   thisLineTimeNew = Math.max(circleTime,lineTime - speedUP * i);

  //   if(i == 0) {
  //     lineTotalDelay = 0;
  //     circleTotalDelay = lineTime;
  //   }
  //   else {
  //     lineTotalDelay = lineTotalDelay + thisLineTimeHis + circleTime;
  //     circleTotalDelay = lineTotalDelay + thisLineTimeNew;
  //   }

  //   thisLineTimeHis = thisLineTimeNew;
  //   /* animation delay time calculation end*/

  //   /*process the data for create path start*/
  //   var tempX = interestingPoints[i][0];
  //   var tempY = interestingPoints[i][1];
  //   var differenceX = parentX - tempX;
  //   var factor = 0.2; //control the curvature of the curve || larger the curvature will be larger

  //   if(isSpline) {
  //       data[1] = [(parentX + tempX) / 2 - differenceX * factor,(parentY + tempY) / 2];
  //       data[2] = [tempX,tempY];
  //   }

  //   else data[1] = [tempX,tempY];
  //   /*process the data for create path end*/


  //   var line = d3.svg.line()  //create line array
  //                    .interpolate("basis")
  //                    .x(function(d) {return d[0];})
  //                    .y(function(d) {return d[1];})

  //   var path2 = svg.append("path")  //create path
  //                  .attr("d", line(data))
  //                  .attr("stroke", "orange")
  //                  .style("opacity",lineOpacity)
  //                  .attr("stroke-width", lineWidth)
  //                  .attr("fill", "none");

  //   var circles = svg.append("circle")  //create circles
  //                  .attr("cx", function(d) {
  //                   if(isSpline) return data[2][0];
  //                   else return data[1][0];
  //                 })
  //                  .attr("cy",  function(d) {
  //                   if(isSpline) return data[2][1];
  //                   else return data[1][1];
  //                 })
  //                  .style("opacity",0)
  //                  .attr("r", circleRadius)
  //                  .attr("fill", "orange");

  //   var totalLength = path2.node().getTotalLength();

  //   path2   // path animation
  //   .attr("stroke-dasharray", totalLength + " " + totalLength)
  //   .attr("stroke-dashoffset", totalLength)
  //   .transition()
  //     .duration(thisLineTimeNew)
  //     .delay(lineTotalDelay)
  //     .ease("linear")
  //     .attr("stroke-dashoffset", 0);

  //   circles //circle animation
  //   .transition()
  //     .duration(circleTime)
  //     .delay(circleTotalDelay)
  //     .style("opacity",circleOpacity);

  // });
  /*end path*/

  /*start canvas*/

  interestingPoints.forEach(function(d,i){
    var tempX = interestingPoints[i][0];
    var tempY = interestingPoints[i][1];
    context.fillStyle = "rgba(255, 153, 0, 0.5)";
    context.beginPath();
    context.arc(tempX,tempY,1.2,0,Math.PI * 2,true);
    context.fill();
  });


  /*end canvas*/




}

  

