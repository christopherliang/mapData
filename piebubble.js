var isDemo = true

var stuff;

d3.csv("https://raw.githubusercontent.com/christopherliang/mapData/master/democrats.csv",function(data){
    var stuff=data;
    console.log(stuff);

});

console.log(stuff);

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
	d3.csv("https://raw.githubusercontent.com/christopherliang/mapData/master/democrats.csv", function(data){
	    for(x=0;x<data.length;x++){
		if (data[x].State=="Iowa"){
		    console.log(data[x].Clinton);
		    return data[x];
		}
	    }
	})
	/*return d.Clinton;*/ });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("https://raw.githubusercontent.com/christopherliang/mapData/master/democrats.csv", type, function(error, data) {
  if (error) throw error;
  
  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { 
	  return color(d.data.State); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.State; });
});

function type(d) {
  d.Clinton = +d.Clinton;
  return d;
}
