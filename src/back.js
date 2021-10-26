function drawBack(receipient, width, height, rotate = false){

var fontSize = 20;
var repeatContent, total;
var message = `Farm to ${receipient}`;

// var ratio = width / 500;
// var margin =  {"top": 100*ratio, "right": 100*ratio, "bottom": 100*ratio, "left": 100*ratio };

//vertically
if (!rotate){
    total = Math.floor( height / fontSize);  
} else {
    total = Math.floor( width / message.length * fontSize);
}

repeatContent = new Array(total).fill(message);

// repeatContent = message;

var back = d3.select("svg#back-content")
                .selectAll("text")
                .data(repeatContent);;

    // back.selectAll("*").remove();

    back	
        .attr("width", width)
        .attr("height", height)
        .style("fill", "black")


        console.log(back)

// back.enter()
// .append("text")
// .merge(back)
// .text(function(d){ return d})
// .attr("class","text-back") 
// .attr("transform", function(d,i){
//     return  `translate( ${width/myRandom()} ${i*fontSize})`
// })
// .attr("x", 0)
// // .attr("y", height - measure_text.height * scale - margin.top - margin.bottom)
// .attr("y", 0)
// .style("font-size", "1rem");

if (!rotate){

    back.enter()
        .append("text")
        .merge(back)
        .text(function(d){ return d})
        .attr("class","text-back") 
        .attr("transform", function(d,i){
            return  `translate( ${width/myRandom()} ${i*fontSize})`
        })
        .attr("x", 0)
        // .attr("y", height - measure_text.height * scale - margin.top - margin.bottom)
        .attr("y", 0)
        .style("fill", "black")
        .style("font-size", "1rem");


} else{
    back.enter()
    .append("text")
    .merge(back)
    .text(function(d){ return d})
    .attr("class","text-back") 
    .attr("transform", function(d,i){
        return  `translate( ${i*fontSize*message.length} ${height/myRandom()})`
    })
    // .attr("transform", `translate(` + function(d,i){ return i*fontSize*message.length} + `${height/myRandom()})`)
    .attr("x", 0)
    // .attr("y", height - measure_text.height * scale - margin.top - margin.bottom)
    .attr("y", 0)
    .style("fill", "black")
    .style("font-size", "1rem");
    
}

// back.exit().remove();

}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function myRandom(){
    return getRandomInt(2) + 2
}

function getPosition(rotate, i){
    if (!rotate){
        return i*fontSize
    } else {
        return i*fontSize*message.length
    }
}