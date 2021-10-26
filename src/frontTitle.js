// document.getElementById('#front-title')

var data_text = {
    "name":"Broccoli Rabe",
    "farm":"Magnolia Farm"
}

var benchmark_text;
if (data_text.name.length > data_text.farm.length){
    benchmark_text = data_text.name
} else {
    benchmark_text = data_text.farm
}

var width = 800;
var height = 400;

var margin =  {"top": 20, "right": 10, "bottom": 20, "left": 30 };

var title = d3.select("svg#front-title");

title	
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "black");



var title_measure = title.append("text")
    .attr("class","text-title-measure")
    .attr("fill", "none")
    .attr("x", "-100")
    .attr("y", "-100")
    .style("font-size", "1px")
    .text(benchmark_text);

var measure_text = title_measure.node().getBBox();
var scale = Math.min( (width - margin.left - margin.right) / measure_text.width, (height - margin.top - margin.bottom) / (measure_text.height * 2))

title.append("text")
    .attr("class","text-title")
    .attr("fill", "black")
    // .attr("text-anchor", "end")  
    .attr("x", margin.left)
    .attr("y", margin.top + measure_text.height * scale)
    .style("font-size", scale + "px")
    .text(data_text.name);

title.append("text")
    .attr("class","text-farm")
    .text(data_text.farm)   
    .attr("x", margin.left)
    .attr("y", height - measure_text.height * scale)
    .style("font-size", scale + "px");

// let u = d3.select(".text-farm")
//     u.attr("fill", "black")
//     .each(function getFontSize(d) {
//         var bbox = this.getComputedTextLength();
//         var scale = width/bbox;
//             console.log(bbox, scale)
//         d.scale = scale;  
//         })
//     .style("font-size", function(d){ return d.scale + "px"; });

    //https://stackoverflow.com/questions/20115090/d3-js-auto-font-sizing-based-on-nodes-individual-radius-diameter

