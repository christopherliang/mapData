var dropdown = document.getElementById("state");
var userState = dropdown.options[dropdown.selectedIndex].value;
var isDemo = true;

var repeat = function(){

    if (isDemo){
        d3.select("#error").html("");


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

                console.log(d[userState]);

                return d[userState]; });

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        d3.csv("https://raw.githubusercontent.com/christopherliang/mapData/master/demo.csv", type, function(error, data) {
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
            .attr("transform", function(d) { 
                //console.log(d);
                //console.log(labelArc.centroid(d));

                return "translate(" + labelArc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.data.Candidate; });
        });
        var holder;
        function type(d) {
            //console.log(d);
            //console.log("then");
            var headerNames=d3.keys(d);
            holder=headerNames;
            console.log(d3.keys(d));
            for (x=1;x<headerNames.length;x++){
                d[headerNames[x]] = +d[headerNames[x]];
            }
            //console.log(d)
            return d;
        }
    }//end of if
    else{ //REPUBLICAN
        d3.select("#error").html("");


        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(["red", "orange","yellow","purple"]);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var labelArc = d3.svg.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { 

                console.log(d[userState]);

                return d[userState]; });

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
        var num = function(d) {
            return d[userState];
        };

        d3.csv("https://raw.githubusercontent.com/christopherliang/mapData/master/repub.csv", type, function(error, data) {
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
            .attr("transform", function(d) { 
                //console.log(d);
                //console.log(labelArc.centroid(d));

                return "translate(" + labelArc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .sort(null)
            .text(function(d) { 
                return d.data.Candidate;
            });
        });
        var holder;
        function type(d) {
            //console.log(d);
            //console.log("then");
            var headerNames=d3.keys(d);
            holder=headerNames;
            console.log(d3.keys(d));
            for (x=1;x<headerNames.length;x++){
                d[headerNames[x]] = +d[headerNames[x]];
            }
            //console.log(d)
            return d;
        }
    }

    d3.select('#state')
        .on('change',function(){
            //var headerNames=d3.keys(data[0]);
            userState = dropdown.options[dropdown.selectedIndex].value;
            console.log(userState);
            console.log(holder);
            /* d3.select("svg")
               .remove();
               repeat();*/
            for (x=1;x<holder.length;x++){
                if (holder[x]==userState){
                    d3.select("svg")
            .remove();
        repeat();
        break;
                }
                else{
                    console.log("being done")
            d3.select("#error").html("Delegates in this state have not voted yet");
            d3.select("svg")
                .remove();
                

                }
            }
            /*var pie = d3.layout.pie()
              .sort(null)
              .value(function(d) { 

              console.log(d[userState]);

              return d[userState]; });*/
        });
    console.log(userState);

}
repeat();

button=document.getElementById("changeParty");
button.addEventListener("click",function(){
    console.log("ere");
    d3.select("svg")
        .remove();
    if(isDemo){
        isDemo=false;
        d3.select('#party').html('Republican Delegate Breakdown');
    }
    else{
        isDemo=true;
        d3.select('#party').html('Democratic Delegate Breakdown');
    }
    repeat();
})
console.log(isDemo);

