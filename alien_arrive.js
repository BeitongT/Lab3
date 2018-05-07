
/*this is drawing a us map in perspective*/

var width = window.screen.width;
height = 680;

var projection = d3.geo.orthographic()
    .scale(1500)
    .translate([width / 2, height*2.7])
    .clipAngle(100)
    .precision(.5);

projection.rotate([95, 23]);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var svg = d3.select("#ufoLine").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);

svg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

svg.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);



queue()
  .defer(d3.json, "/world-50m.json")
  .defer(d3.csv, "ufo-sightings/scrubbed.csv")
  .await(callback);



// call back function
function callback (error, world, ufoData) {
  // console.log(ufoData);
  if (error) throw error;

  /*Start map*/
  // svg.insert("path", ".graticule")
  //     .datum(topojson.feature(world, world.objects.land))
  //     .attr("class", "land")
  //     .attr("d", path);
      
  var countries = topojson.feature(world, world.objects.countries).features

  svg.selectAll(".country")
      .data(countries)
      .enter().insert("path", ".graticule")
      .attr("class", function (d) { return "country " + "code" + d.id; })
      .attr("d", path);

  /*end map*/


  /*start path  BeitongTian*/
  var dataRange = [0,100]; // data range from dataRange[0] to dataRange[1]
  var smallerData = ufoData.slice(dataRange[0],dataRange[1]).filter(function(d){
    return d.country == "us" && d.state != "hi";  //filter out other countries and Hawaii state 
  });

  var interestingPoints = smallerData.map(function(d){  //create array of x and y coordinates on the transformed MAP
    var tempArray = [+d.longitude,+d.latitude];
    var tempResult = projection(tempArray);
    return tempResult;
   });


  var isSpline = 0; // 0 for straight line  || 1 for curve 

  var data = [];

  var parentX = width/2;  // x y coordinates of the start points
  var parentY = 0;

  data.push([parentX,parentY]);
  data.push([0,0]);
  if(isSpline) {
    data.push([0,0]);
  }

  // general variables 
  var lineTime = 2000;  //line animation time
  var speedUpRate = 0.2;  //animation speed up rate linear
  var circleTime = 20;  //circle animation time
  var lineOpacity = 0.3;  
  var lineWidth = 3;
  var circleOpacity = 0.4;
  var circleRadius = 5;

  //temp variables 
  var thisLineTimeNew = 0;
  var thisLineTimeHis = 0;
  var speedUP = speedUpRate * lineTime;
  var lineTotalDelay = 0;
  var circleTotalDelay = 0;

  interestingPoints.forEach(function(d,i){

    /* animation delay time calculation start*/
    thisLineTimeNew = Math.max(circleTime,lineTime - speedUP * i);

    if(i == 0) {
      lineTotalDelay = 0;
      circleTotalDelay = lineTime;
    }
    else {
      lineTotalDelay = lineTotalDelay + thisLineTimeHis + circleTime;
      circleTotalDelay = lineTotalDelay + thisLineTimeNew;
    }

    thisLineTimeHis = thisLineTimeNew;
    /* animation delay time calculation end*/

    /*process the data for create path start*/
    var tempX = interestingPoints[i][0];
    var tempY = interestingPoints[i][1];
    var differenceX = parentX - tempX;
    var factor = 0.2; //control the curvature of the curve || larger the curvature will be larger

    if(isSpline) {
        data[1] = [(parentX + tempX) / 2 - differenceX * factor,(parentY + tempY) / 2];
        data[2] = [tempX,tempY];
    }

    else data[1] = [tempX,tempY];
    /*process the data for create path end*/


    var line = d3.svg.line()  //create line array
                     .interpolate("basis")
                     .x(function(d) {return d[0];})
                     .y(function(d) {return d[1];})

    var path2 = svg.append("path")  //create path
                   .attr("d", line(data))
                   .attr("stroke", "orange")
                   .style("opacity",lineOpacity)
                   .attr("stroke-width", lineWidth)
                   .attr("fill", "none");

    var circles = svg.append("circle")  //create circles
                   .attr("cx", function(d) {
                    if(isSpline) return data[2][0];
                    else return data[1][0];
                  })
                   .attr("cy",  function(d) {
                    if(isSpline) return data[2][1];
                    else return data[1][1];
                  })
                   .style("opacity",0)
                   .attr("r", circleRadius)
                   .attr("fill", "orange");

    var totalLength = path2.node().getTotalLength();

    path2   // path animation
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .duration(thisLineTimeNew)
      .delay(lineTotalDelay)
      .ease("linear")
      .attr("stroke-dashoffset", 0);

    circles //circle animation
    .transition()
      .duration(circleTime)
      .delay(circleTotalDelay)
      .style("opacity",circleOpacity);

  });
  /*end path*/


}

  

// call back function
function callback (error, world, ufoData) {
  // console.log(ufoData);
  if (error) throw error;

  /*Start map*/
  // svg.insert("path", ".graticule")
  //     .datum(topojson.feature(world, world.objects.land))
  //     .attr("class", "land")
  //     .attr("d", path);
      
  var countries = topojson.feature(world, world.objects.countries).features

  svg.selectAll(".country")
      .data(countries)
      .enter().insert("path", ".graticule")
      .attr("class", function (d) { return "country " + "code" + d.id; })
      .attr("d", path);

  /*end map*/


  /*start path  BeitongTian*/
  var dataRange = [0,100]; // data range from dataRange[0] to dataRange[1]
  var smallerData = ufoData.slice(dataRange[0],dataRange[1]).filter(function(d){
    return d.country == "us" && d.state != "hi";  //filter out other countries and Hawaii state 
  });

  var interestingPoints = smallerData.map(function(d){  //create array of x and y coordinates on the transformed MAP
    var tempArray = [+d.longitude,+d.latitude];
    var tempResult = projection(tempArray);
    return tempResult;
   });


  var isSpline = 0; // 0 for straight line  || 1 for curve 

  var data = [];

  var parentX = width/2;  // x y coordinates of the start points
  var parentY = 0;

  data.push([parentX,parentY]);
  data.push([0,0]);
  if(isSpline) {
    data.push([0,0]);
  }

  // general variables 
  var lineTime = 2000;  //line animation time
  var speedUpRate = 0.2;  //animation speed up rate linear
  var circleTime = 20;  //circle animation time
  var lineOpacity = 0.3;  
  var lineWidth = 3;
  var circleOpacity = 0.4;
  var circleRadius = 5;

  //temp variables 
  var thisLineTimeNew = 0;
  var thisLineTimeHis = 0;
  var speedUP = speedUpRate * lineTime;
  var lineTotalDelay = 0;
  var circleTotalDelay = 0;

  interestingPoints.forEach(function(d,i){

    /* animation delay time calculation start*/
    thisLineTimeNew = Math.max(circleTime,lineTime - speedUP * i);

    if(i == 0) {
      lineTotalDelay = 0;
      circleTotalDelay = lineTime;
    }
    else {
      lineTotalDelay = lineTotalDelay + thisLineTimeHis + circleTime;
      circleTotalDelay = lineTotalDelay + thisLineTimeNew;
    }

    thisLineTimeHis = thisLineTimeNew;
    /* animation delay time calculation end*/

    /*process the data for create path start*/
    var tempX = interestingPoints[i][0];
    var tempY = interestingPoints[i][1];
    var differenceX = parentX - tempX;
    var factor = 0.2; //control the curvature of the curve || larger the curvature will be larger

    if(isSpline) {
        data[1] = [(parentX + tempX) / 2 - differenceX * factor,(parentY + tempY) / 2];
        data[2] = [tempX,tempY];
    }

    else data[1] = [tempX,tempY];
    /*process the data for create path end*/


    var line = d3.svg.line()  //create line array
                     .interpolate("basis")
                     .x(function(d) {return d[0];})
                     .y(function(d) {return d[1];})

    var path2 = svg.append("path")  //create path
                   .attr("d", line(data))
                   .attr("stroke", "orange")
                   .style("opacity",lineOpacity)
                   .attr("stroke-width", lineWidth)
                   .attr("fill", "none");

    var circles = svg.append("circle")  //create circles
                   .attr("cx", function(d) {
                    if(isSpline) return data[2][0];
                    else return data[1][0];
                  })
                   .attr("cy",  function(d) {
                    if(isSpline) return data[2][1];
                    else return data[1][1];
                  })
                   .style("opacity",0)
                   .attr("r", circleRadius)
                   .attr("fill", "orange");

    var totalLength = path2.node().getTotalLength();

    path2   // path animation
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .duration(thisLineTimeNew)
      .delay(lineTotalDelay)
      .ease("linear")
      .attr("stroke-dashoffset", 0);

    circles //circle animation
    .transition()
      .duration(circleTime)
      .delay(circleTotalDelay)
      .style("opacity",circleOpacity);

  });
  /*end path*/


}

  


//start drawing lines//
// function drawlines{
// d3.csv()

// }

// var data = d3.range(11).map(function(){return Math.random()*10})
//     var x = d3.scale.linear().domain([0, 10]).range([0, 1600]);
//     var y = d3.scale.linear().domain([0, 10]).range([10, 700]);
//     var line = d3.svg.line()
//       .interpolate("cardinal")
//       .x(function(d,i) {return x(i);})
//       .y(function(d) {return y(d);})

// var path2 = svg.append("path")
//        .attr("d", line(data))
//       .attr("stroke", "white")
//       .attr("stroke-width", "2")
//       .attr("fill", "none");
      
//       var totalLength = path2.node().getTotalLength();

// path2
// .attr("stroke-dasharray", totalLength + " " + totalLength)
// .attr("stroke-dashoffset", totalLength)
// .transition()
//   .duration(2000)
//   .ease("linear")
//   .attr("stroke-dashoffset", 0);




  