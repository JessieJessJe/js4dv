//https://ourcodeworld.com/articles/read/38/how-to-capture-an-image-from-a-dom-element-with-javascript
// download: http://techslides.com/save-svg-as-an-image


document.getElementById('downloadBtn').addEventListener('click', function (){

    var node_front = document.getElementById('front');
    var node_back = document.getElementById('back');

    var [ML, MR, MT, MB, W, H] = getDivDimentions(node_front)

    imageDownload(node_front, "front");
    imageDownload(node_back, "back");

    function imageDownload(node, name){

        domtoimage.toPng(node).then(function (dataUrl) {
            // var img = new Image();
            //document.body.appendChild(img);
            
    
            // var img = '<img src="'+imgsrc+'">'; 
            // d3.select("#front-canvas").html(img);
    
            var image = new Image;
            image.src = dataUrl;
            document.body.appendChild(image);
            
    
            var canvas = document.querySelector("#front-canvas"),
            context = canvas.getContext("2d");
    
            image.onload = function() {
    
                // var imageH = image.naturalHeight;
                // var imageW = image.naturalWidth;
    
                canvas.height = H;
                canvas.width = W;
    
                // context.drawImage(image, 0, 0, imageW, imageH);
                context.drawImage(image, ML, MT, ML+W, MT+H, 0, 0, W, H);
    
                var canvasdata = canvas.toDataURL("image/png");
    
                var pngimg = '<img src="'+canvasdata+'">'; 
                d3.select("#pngdataurl").html(pngimg);
    
                var a = document.createElement("a");
                a.download = name + ".png";
                a.href = canvasdata;
                a.click();
            };
    
    
    
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

    }

    

})

function getDivDimentions(box){
    // let box = document.querySelector('.box');
    let style = getComputedStyle(box);

    let marginLeft = parseInt(style.marginLeft);
    let marginRight = parseInt(style.marginRight);
    let marginTop = parseInt(style.marginTop);
    let marginBottom = parseInt(style.marginBottom);

    let width = box.offsetWidth;
    let height = box.offsetHeight;

   return [marginLeft, marginRight, marginTop, marginBottom, width, height]
}

//https://mybyways.com/blog/convert-svg-to-png-using-your-browser

// document.getElementById('downloadBtn').addEventListener('click', function () {

//    var svg_front_chart = d3.select('#front-chart').node();
//    var svg_front_title = d3.select('#front-title').node();
//    var svg_front = document.getElementById('front');

//    partialDownload(width, height, svg_front_title);
//    partialDownload(width, height, svg_front_chart);

//     function partialDownload(width, height, svg){


//             var canvas = document.getElementById('front-canvas');

//             // svg.setAttribute('width', width.value);
//             // svg.setAttribute('height', height.value);

//             //svg is for front-chart
         

//             canvas.width = width;
//             canvas.height = height;

//             var data = new XMLSerializer().serializeToString(svg);

//             var win = window.URL || window.webkitURL || window;
//             var img = new Image();
//             var blob = new Blob([data], { type: 'image/svg+xml' });
//             var url = win.createObjectURL(blob);

//             img.onload = function () {
//             canvas.getContext('2d').drawImage(img, 0, 0);
//             win.revokeObjectURL(url);
//             var uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream');
//             var a = document.createElement('a');
//             document.body.appendChild(a);
//             a.style = 'display: none';
//             a.href = uri
//             a.download = (svg.id || svg.svg.getAttribute('name') || svg.getAttribute('aria-label') || 'untitled') + '.png';
//             a.click();
//             window.URL.revokeObjectURL(uri);
//             document.body.removeChild(a);
//             };
//             img.src = url;

//     }


//   });