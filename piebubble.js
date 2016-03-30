var isDemo = true



var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["blue", "green"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { 

	return d.Maine; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("https://raw.githubusercontent.com/christopherliang/mapData/master/newDemo.csv", type, function(error, data) {
  if (error) throw error;
  
  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .transition()
      .duration(1000)
      .attr("d", arc)
      .style("fill", function(d) { 
	  return color(d.data.Candidate); });

  g.append("text")
      .transition()
      .duration(1000)
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.Candidate; });
});

function type(d) {
  d.Maine = +d.Maine;
  return d;
}
