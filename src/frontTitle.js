

function drawFrontTitle(data_text, width, height){

var benchmark_text;
if (data_text["name"].length > data_text["farm"].length){
    benchmark_text = data_text.name
} else {
    // benchmark_text = Math.max(data_text["name"].length, data_text["farm"].length) 
    benchmark_text = data_text.farm
}

var ratio = width / 500;
var margin =  {"top": 20*ratio, "right": 10*ratio, "bottom": 20*ratio, "left": 30*ratio };

console.log(margin)

var title = d3.select("svg#front-title");

    title.selectAll("*").remove();
    title	
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "black");



var title_measure = title.append("text")
    .attr("class","text-title-measure")
    .attr("fill", "none")
    .attr("x", "0")
    .attr("y", "0")
    .style("font-size", "1px")
    .text(benchmark_text);

var measure_text = title_measure.node().getBBox(); 

// var ttt = title_measure.node().getBoundingClientRect();
// var measure_text = {
//     "width": ttt.right - ttt.left,
//     "height": ttt.bottom - ttt.top
// }
var scale = Math.min( (width - margin.left - margin.left - margin.right) / (measure_text.width + 1), (height - margin.top - margin.bottom) / (measure_text.height * 2 + 1))

console.log("measure text", measure_text, scale, benchmark_text)

title.append("text")
    .attr("class","text-title")
    .attr("fill", "black")
    .attr("transform", `translate(${margin.left} ${margin.top + measure_text.height * scale})`)  
    // .attr("x", margin.left)
    // .attr("y", margin.top + measure_text.height * scale / 2)

    .attr("x","0" )
    .attr("y", "0")
    .style("font-size", scale + "px")
    .text(data_text.name);

title.append("text")
    .attr("class","text-farm")
    .text(data_text.farm)   
    .attr("x", margin.left)
    // .attr("y", height - measure_text.height * scale - margin.top - margin.bottom)
    .attr("y", margin.top * 2 + measure_text.height * scale * 2)
    .style("font-size", scale + "px");

}


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

