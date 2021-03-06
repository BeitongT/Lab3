function shape() {
  var counts = {};
  d3.csv("./scrubbed.csv", function (data) {


    console.log(data);
    da = data;
    // console.log(da);
    rawdata = number(da);
    // console.log(rawdata);
  })


  function number(d) {
    // console.log(d);
    for (var i = 0; i < d.length; i++) {
      counts[d[i].shape] = 1 + (counts[d[i].shape] || 0);
    }
    return counts;
  }

  console.log(counts)


  var w = 1600, h = 1000;
  var t0 = Date.now();

  var planets = [
    { R: 300, width: 50, speed: 2, phi0: 90 },
    { R: 150, width: 20, speed: 2, phi0: 120 },
    { R: 400, width: 90, speed: 2, phi0: 20 }
  ];

  var svg = d3.select("#shape").insert("svg")
    .attr("width", w).attr("height", h);



  var container = svg.append("g")
    .attr("transform", "translate(" + 550 + "," + 500 + ")");


  container.append("defs")
    .append("filter").attr("id", "blur")
    .attr("x", "-50%").attr("y", "-50%")
    .attr("height", "250%").attr("width", "250%")
    .append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", 25);

  container.selectAll("g.planet").data(planets).enter().append("g")
    .attr("class", "planet").each(function (d, i) {
      d3.select(this).append("circle").attr("class", "orbit")
        .attr("r", d.R).attr("filter", "url(#blur)");
    });


  container.append("image").attr("xlink:href", "icons/Nicon1.png")
    .attr("width", 70).attr("x", 400).attr("cy", 0).attr("class", "planet1")
    .on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);

  function handleMouseOut(d, i) {
    container.select("text").remove();
  }

  function handleMouseOver(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.chevron) + "   " + "Chevron")
      .attr("class", "shapecount")
  }
  function handleMouseOver2(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.cigar) + "   " + "Cigar")
      .attr("class", "shapecount")
  }
  function handleMouseOver3(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.circle) + "   " + "Circle")
      .attr("class", "shapecount")
  }

  function handleMouseOver4(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.cone) + "   " + "Cone")
      .attr("class", "shapecount")
  }
  function handleMouseOver5(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.crescent) + "   " + "Crescent")
      .attr("class", "shapecount")
  }

  function handleMouseOver6(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.cross) + "   " + "Cross")
      .attr("class", "shapecount")

  }

  function handleMouseOver7(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.cylinder) + "   " + "Cylinder")
      .attr("class", "shapecount")

  }

  function handleMouseOver8(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.delta) + "   " + "Delta")
      .attr("class", "shapecount")

  }

  function handleMouseOver9(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.diamond) + "   " + "Diamond")
      .attr("class", "shapecount")
  }

  function handleMouseOver10(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.disk) + "   " + "Disk")
      .attr("class", "shapecount")
  }

  function handleMouseOver11(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.dome) + "   " + "Dome")
      .attr("class", "shapecount")
  }

  function handleMouseOver12(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.egg) + "   " + "Egg")
      .attr("class", "shapecount")
  }

  function handleMouseOver13(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.fireball) + "   " + "Fireball")
      .attr("class", "shapecount")
  }

  function handleMouseOver14(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.flare) + "   " + "Flare")
      .attr("class", "shapecount")

  }

  function handleMouseOver15(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.flash) + "   " + "Flash")
      .attr("class", "shapecount")
  }

  function handleMouseOver16(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.formation) + "   " + "Formation")
      .attr("class", "shapecount")
  }

  function handleMouseOver17(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.hexagon) + "   " + "Hexagon")
      .attr("class", "shapecount")

  }
  function handleMouseOver18(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.light) + "   " + "Light")
      .attr("class", "shapecount")

  }

  function handleMouseOver19(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.oval) + "   " + "Oval")
      .attr("class", "shapecount")
  }

  function handleMouseOver20(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.pyramid) + "   " + "Pyramid")
      .attr("class", "shapecount")
  }

  function handleMouseOver21(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.rectangle) + "   " + "Rectangle")
      .attr("class", "shapecount")

  }

  function handleMouseOver22(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.round) + "   " + "Round")
      .attr("class", "shapecount")
  }

  function handleMouseOver23(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.sphere) + "   " + "Sphere")
      .attr("class", "shapecount")
  }

  function handleMouseOver24(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.teardrop) + "   " + "Teardrop")
      .attr("class", "shapecount")
  }

  function handleMouseOver25(d, i) {
    container.append("text").attr("text-anchor", "middle")
      .text(Number(counts.triangle) + "   " + "Triangle").attr("class", "shapecount")
  }
  container.append("image").attr("xlink:href", "icons/Nicon2.png")
    .attr("width", 70).attr("x", 300).attr("cy", 0).attr("class", "planet2")
    .on("mouseover", handleMouseOver2)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon3.png")
    .attr("width", 70).attr("x", 200).attr("cy", 0).attr("class", "planet3")
    .on("mouseover", handleMouseOver3)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon4.png")
    .attr("width", 70).attr("x", 300).attr("cy", 0).attr("class", "planet4")
    .on("mouseover", handleMouseOver4)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon5.png")
    .attr("width", 70).attr("x", 400).attr("cy", 0).attr("class", "planet5")
    .on("mouseover", handleMouseOver5)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon6.png")
    .attr("width", 70).attr("x", 300).attr("cy", 0).attr("class", "planet6")
    .on("mouseover", handleMouseOver6)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon7.png")
    .attr("width", 70).attr("x", 400).attr("cy", 0).attr("class", "planet7")
    .on("mouseover", handleMouseOver7)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon8.png")
    .attr("width", 70).attr("x", 300).attr("cy", 0).attr("class", "planet8")
    .on("mouseover", handleMouseOver8)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon9.png")
    .attr("width", 70).attr("x", 400).attr("cy", 0).attr("class", "planet9")
    .on("mouseover", handleMouseOver9)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon10.png")
    .attr("width", 70).attr("x", 200).attr("cy", 0).attr("class", "planet10")
    .on("mouseover", handleMouseOver10)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon11.png")
    .attr("width", 70).attr("x", 360).attr("cy", 0).attr("class", "planet11")
    .on("mouseover", handleMouseOver11)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon12.png")
    .attr("width", 70).attr("x", 370).attr("cy", 0).attr("class", "planet12")
    .on("mouseover", handleMouseOver12)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon13.png")
    .attr("width", 50).attr("x", 200).attr("cy", 0).attr("class", "planet13")
    .on("mouseover", handleMouseOver13)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon14.png")
    .attr("width", 70).attr("x", 200).attr("cy", 0).attr("class", "planet14")
    .on("mouseover", handleMouseOver14)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon15.png")
    .attr("width", 50).attr("x", 300).attr("cy", 0).attr("class", "planet15")
    .on("mouseover", handleMouseOver15)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon16.png")
    .attr("width", 90).attr("x", 400).attr("cy", 0).attr("class", "planet16")
    .on("mouseover", handleMouseOver16)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon17.png")
    .attr("width", 70).attr("x", 130).attr("cy", 0).attr("class", "planet17")
    .on("mouseover", handleMouseOver17)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon18.png")
    .attr("width", 50).attr("x", 220).attr("cy", 0).attr("class", "planet18")
    .on("mouseover", handleMouseOver18)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon19.png")
    .attr("width", 70).attr("x", 280).attr("cy", 0).attr("class", "planet19")
    .on("mouseover", handleMouseOver19)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon20.png")
    .attr("width", 70).attr("x", 200).attr("cy", 0).attr("class", "planet20")
    .on("mouseover", handleMouseOver20)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon21.png")
    .attr("width", 70).attr("x", 120).attr("cy", 0).attr("class", "planet16")
    .on("mouseover", handleMouseOver21)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon22.png")
    .attr("width", 70).attr("x", 400).attr("cy", 0).attr("class", "planet17")
    .on("mouseover", handleMouseOver22)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon23.png")
    .attr("width", 70).attr("x", 300).attr("cy", 0).attr("class", "planet18")
    .on("mouseover", handleMouseOver23)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon24.png")
    .attr("width", 50).attr("x", 450).attr("cy", 0).attr("class", "planet19")
    .on("mouseover", handleMouseOver24)
    .on("mouseout", handleMouseOut);

  container.append("image").attr("xlink:href", "icons/Nicon25.png")
    .attr("width", 70).attr("x", 350).attr("cy", 0).attr("class", "planet20")
    .on("mouseover", handleMouseOver25)
    .on("mouseout", handleMouseOut);

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet1").attr("transform", function (d) {
      return "rotate(" + 0 + delta * 2 / 150 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet2").attr("transform", function (d) {
      return "rotate(" + 0 + delta * 2 / 180 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet3").attr("transform", function (d) {
      return "rotate(" + 0 + delta * 2 / 200 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet4").attr("transform", function (d) {
      return "rotate(" + 20 + delta * 2 / 150 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet5").attr("transform", function (d) {
      return "rotate(" + 20 + delta * 2 / 180 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet6").attr("transform", function (d) {
      return "rotate(" + 40 + delta * 2 / 200 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet7").attr("transform", function (d) {
      return "rotate(" + 40 + delta * 2 / 150 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet8").attr("transform", function (d) {
      return "rotate(" + 60 + delta * 2 / 180 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet9").attr("transform", function (d) {
      return "rotate(" + 60 + delta * 2 / 200 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet10").attr("transform", function (d) {
      return "rotate(" + 80 + delta * 2 / 150 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet11").attr("transform", function (d) {
      return "rotate(" + 80 + delta * 2 / 180 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet12").attr("transform", function (d) {
      return "rotate(" + 100 + delta * 2 / 200 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet13").attr("transform", function (d) {
      return "rotate(" + 100 + delta * 2 / 150 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet14").attr("transform", function (d) {
      return "rotate(" + 120 + delta * 2 / 180 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet15").attr("transform", function (d) {
      return "rotate(" + 120 + delta * 2 / 200 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet16").attr("transform", function (d) {
      return "rotate(" + 120 + delta * 2 / 150 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet17").attr("transform", function (d) {
      return "rotate(" + 140 + delta * 2 / 180 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet18").attr("transform", function (d) {
      return "rotate(" + 140 + delta * 2 / 200 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet19").attr("transform", function (d) {
      return "rotate(" + 160 + delta * 2 / 150 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet20").attr("transform", function (d) {
      return "rotate(" + 160 + delta * 2 / 180 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet21").attr("transform", function (d) {
      return "rotate(" + 160 + delta * 2 / 200 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet22").attr("transform", function (d) {
      return "rotate(" + 160 + delta * 2 / 150 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet23").attr("transform", function (d) {
      return "rotate(" + 180 + delta * 2 / 180 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet24").attr("transform", function (d) {
      return "rotate(" + 200 + delta * 2 / 200 + ")";
    });
  });

  d3.timer(function () {
    var delta = (Date.now() - t0);
    svg.selectAll(".planet25").attr("transform", function (d) {
      return "rotate(" + 190 + delta * 2 / 150 + ")";
    });
  });
}
shape();