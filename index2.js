//Width and height of map
var width = 1200;
var height = 800;

//the circle radius we will draw
var circleRadius = Math.min(width,height)/600;
var ScircleRadius = Math.min(width,height)/100;
console.log(circleRadius);
// D3 Projection define the size of the map
var projection = d3.geo.albersUsa()
           .translate([width/2, height/2])    // translate to center of screen
           .scale(Math.min(width,height) * 1500 / 1100);    // scale things down so see entire US
        
// create canvas (like create the sketch book)
// var canvas = d3.select("body").append("canvas")
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr("width", width)
//     .attr("height", height)
//     .attr("class","main");
//create the context (like create the pen and eraser)
var c1 = document.getElementById("canvas1");
var context =c1.getContext("2d");
// Define path generator (like create the idea to paint(how we draw))
var path = d3.geo.path()               
         .projection(projection)  // tell path generator to use albersUsa projection
         .context(context);
var c = document.getElementById("canvas2");
var context2 =c.getContext("2d");
var color = d3.scale.linear()
        .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

// Define path generator (like create the idea to paint(how we draw))
var path2 = d3.geo.path()               
         .projection(projection)  // tell path generator to use albersUsa projection
         .context(context2);
     
// Load GeoJSON data and merge with states data
d3.json("./us-states.json", function(us) {
  //draw states ( draw it)
  context.beginPath();  // begin to draw
  path(us);       // what is the path
  context.strokeStyle = "orange";   //set color
  context.lineWidth = 1;      // set width
  context.stroke();       //draw on the canvas
d3.csv("scrubbed.csv", function(data) {
  // console.log(data);
  //filter the data
  var datanew = data.filter(function(d){
    if(d.country == "us" && d.state != "pr") return 1;
    else return 0;
  });
  //apply projection on the data
  var dataprojection = datanew.map(function(d){
    var newdata;
    var tempPosition = projection([+d.longitude,+d.latitude]);
    var tempcity = d.city;
    newdata = {position:tempPosition,city:tempcity};
    return newdata;
  });
  //draw the circle for each point
  dataprojection.forEach(function(d){
    var childX = d.position[0];
      var childY = d.position[1];
      context.beginPath();  //begin to draw 
      context.arc(childX,childY,circleRadius,0,Math.PI * 2,true); //how to draw a circle (xposition,yposition, radius, start angle, finish angle.. like draw an arc)
      context.fillStyle = "rgba(255, 153, 0, 0.5)"; //set color
      context.fill(); //lets draw it 
  })
  //read from the slider
  function drawOpenings() {
  context2.clearRect(0,0,width,height);
  // d3.selectAll(".openings")
  // .remove();
  var selectedYear = document.getElementById("menu").value;
  var filteredData = datanew.filter(function(d) {return d.year == selectedYear; });
  var record = filteredData.length;
  // console.log(typeof d.datetime);
  // console.log(filteredData);
  //apply projection on the data
  var Selecteddataprojection = filteredData.map(function(d){
    var selectnewdata;
    var selectedtempPosition = projection([+d.longitude,+d.latitude]);
    var selectedtempcity = d.city;
    selectnewdata = {position:selectedtempPosition,city:selectedtempcity};
    return selectnewdata;
  });
  console.log(Selecteddataprojection);
  //draw the circle for each point
  Selecteddataprojection.forEach(function(d){
    var SchildX = d.position[0];
      var SchildY = d.position[1];
      context2.beginPath(); //begin to draw 
      context2.arc(SchildX,SchildY,ScircleRadius,0,Math.PI * 2,true); //how to draw a circle (xposition,yposition, radius, start angle, finish angle.. like draw an arc)
      context2.fillStyle = "rgba(255, 0, 0, 0.5)";  //set color
      context2.fill();  //lets draw it 
  })
    //tool tip
  d3.select("#canvas2").on('mousemove',function(){
    // console.log('move');
    var mouseX = d3.event.layerX || d3.event.offsetX; // get the mouse x cooridinate
    var mouseY = d3.event.layerY || d3.event.offsety; // get the mouse y cooridinate
    var thispoint = Selecteddataprojection.filter(function(d){
      // check if the mouse is near some points?
      if(d.position[0] >= mouseX-ScircleRadius && d.position[0] <= mouseX+ScircleRadius && d.position[1] >= mouseY - ScircleRadius && d.position[1] <= mouseY + ScircleRadius)  return 1;
      else return 0;
    });
    // if the mouse points to some points we will draw a tooltip
    if(thispoint.length>0) {
      d3.select('#tooltip')
        .style('opacity', 0.8)
        .style('top', d3.event.pageY + 5 + 'px')
        .style('left', d3.event.pageX + 5 + 'px')
        .html('city: ' + thispoint[0].city);
    }
    //if the mouse points nothing, we will make the tooltip disappear
    else {
      d3.select('#tooltip')
        .style('opacity', 0);
    }
  });
  // var openings = canvas.selectAll(".openings")
  //  .data(filteredData)
  //  .enter()
  //  .append("circle")
  //    .attr("cx", function(d) {
  //    return projection([d.longitude, d.latitude])[0];
  //    })
  //    .attr("cy", function(d) {
  //    return projection([d.longitude, d.latitude])[1];
  //    })
  //    .attr("r", 3);
  d3.select(".year").text("Year: " + selectedYear);
  d3.select(".total").text("Total records in " + selectedYear);

  var format = d3.format(",d");

  d3.select(".transition")
    .transition()
    .duration(1500)
    .on("start", function repeat() {
      d3.active(this)
          .tween("text", function() {
            var that = d3.select(this),
                i = d3.interpolateNumber(that.text().replace(/,/g, ""), record);
            return function(t) { that.text(format(i(t))); };
          })
          // .transition()
          // .delay(1500)
          // .on("input", repeat());
    });

  // var countByYear=d3.nest()
  //  .key(function(d) {return d.openyear;})
  //  .rollup(function(values) { return values.length; })
  //  .entries(filteredData);
  // d3.select(".count")
  // .text(function(d,i) {
 //        return "New Stores: " + countByYear[i].values
 //      });
};
d3.select("#menu")
  .on("input", function () {
    drawOpenings();

});
});  // end for scrubbed.csv

}); // end for us-states.json