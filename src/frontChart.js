   
    // options
    var margin = {"top": 20, "right": 10, "bottom": 20, "left": 30 }
    var width = 800;
    var height = 500;

    var secondaryTextPadding = 10;
    
    
    // data
    var data = [{"h":100, "t":"2021", "text":"", "color":"none", "stage":0}, 
                {"h":100, "t":"", "text":"", "color":"none", "stage":0}, 
                {"h":100, "t":"", "text":"", "color":"none", "stage":0}, 
                {"h":100, "t":"", "text":"","color":"none", "stage":0}, 
                {"h":100, "t":"Apr.", "text":"Seed", "color":"green", "stage":1}, 
                {"h":100, "t":"", "text":"", "color":"green", "stage":1},
                {"h":100, "t":"", "text":"", "color":"green", "stage":1},
                {"h":100, "t":"", "text":"", "color":"green", "stage":1},
                {"h":100, "t":"", "text":"", "color":"green", "stage":1},
                {"h":100, "t":"Set.", "text":"harvest", "color":"green", "stage":1},
                {"h":100, "t":"", "text":"", "color":"none", "stage":0},
                {"h":100, "t":"", "text":"", "color":"none", "stage":0},
                {"h":100, "t":"", "text":"", "color":"none", "stage":0}, 
                {"h":100, "t":"2022", "text":"", "color":"none", "stage":0}];
   

    var num_rects = data.length;
    var rectWidth = (width- margin.left - margin.right) / num_rects;


    
    
    // scales
    var xMax = num_rects * rectWidth;
    var xScale = d3.scaleLinear()
    	.domain([0, xMax])
    	.range([margin.left, width - margin.right]);

       

    var yMax = d3.max(data, function(d){return d.h});

    var yScale = d3.scaleLinear()
    	.domain([0, yMax])
    	.range([height - margin.bottom, margin.top]);
     
    // svg element
    var svg = d3.select('#front-chart');
	
    svg	
    .attr("width", width)
	.attr("height", height);


    //calculating stages, maximum = 5
    let stages = new Array(5).fill(0);

    data.forEach(function(d){ 
        stages[d.stage] += 1})
    
    //painting bars
    for (let s in stages){
        let total = stages[s]

        let count = 0;
        data.forEach(function(d,i){

            if (d.stage == s){
                count +=1; 
                let gradient = Math.trunc( 8 - (count/total) * 8 ) + 1
                console.log(gradient)

                    // bars 
                    var rect = svg
                                .append('rect')
                                .attr('x', xScale(i * rectWidth))
                                .attr('y', yScale(d.h))
                                .attr('width', xScale(rectWidth) - margin.left)
                                .attr('height', height - margin.bottom - yScale(d.h))
                                .attr('mask', `url(#circles-${gradient}-mask)`)
                                .attr('fill', d.color)
                                .attr('margin', 0);

            
                           
            }

        }
        )    
    }
    


    var xAxis = d3.axisTop()
        .tickValues(setTickValue() )
    	.scale(xScale)
    	.tickFormat("")
        .tickSize(height - margin.top - margin.bottom);

    
    svg.append('g')
      	.attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
      	.call(xAxis);

    //remove axis's path
    svg.select(".domain").remove()
            // .attr("stroke","#E04836")
            // .attr("stroke-width","6")
            // .attr("opacity",".6");

    //adding secondary text
    data.forEach((d,i)=>{

        if (d.text !== ""){

            var text = svg
                .append("text")
                .attr('class','text-my')
                .attr('x', '0')
    	        .attr('y', '0')               
                .attr("transform", `translate(${xScale(i * rectWidth) + rectWidth/3} ${height - margin.bottom - secondaryTextPadding}) rotate(90)`) 
                .attr("text-anchor", "end")             
                .style("font-weight", "normal")
                .style("font-size", "1rem")
                .style("fill", "black")
                .text(d.text);
                
        }

        if (d.t !== ""){
        
            var txt = svg
                // .select("#_" + d.text)
                .append("text")
                .attr('x', '0')
    	        .attr('y', '0')               
                .attr("transform", `translate(${xScale(i * rectWidth) + rectWidth/3} ${margin.top + secondaryTextPadding}) rotate(90)`)              
                .style("font-weight", "normal")
                .style("font-size", "1rem")
                .style("fill", "black")
                .text(d.t);

        }

    })

function rightAlign(text){
    console.log(text, text.length);
    return text.length * 1
}

// axes
function setTickValue(){
    let l = []
    data.forEach( 
        function(d,i){ if (i !== 0) {l.push(i * rectWidth)}
    })
    return l
}