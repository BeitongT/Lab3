
/*this is drawing a us map in perspective*/

var width = window.screen.width;
height = 680;

var projection = d3.geo.orthographic()
    .scale(1500)
    .translate([width / 2, height*2.5])
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




d3.json("/world-50m.json", function (error, world) {
    if (error) throw error;

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

});



aa = [-122.490402, 37.786453];
bb = [-122.389809, 37.72728];


var data = d3.range(11).map(function(){return Math.random()*10})
    var x = d3.scale.linear().domain([0, 10]).range([0, 1600]);
    var y = d3.scale.linear().domain([0, 10]).range([10, 700]);
    var line = d3.svg.line()
      .interpolate("cardinal")
      .x(function(d,i) {return x(i);})
      .y(function(d) {return y(d);})

var path2 = svg.append("path")
       .attr("d", line(data))
      .attr("stroke", "white")
      .attr("stroke-width", "2")
      .attr("fill", "none");
      
      var totalLength = path2.node().getTotalLength();

path2
.attr("stroke-dasharray", totalLength + " " + totalLength)
.attr("stroke-dashoffset", totalLength)
.transition()
  .duration(2000)
  .ease("linear")
  .attr("stroke-dashoffset", 0);

