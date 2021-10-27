var FrameWidth = window.innerWidth * 0.7;
var FrameHeight = window.innerHeight * 0.8;
var FrameRatio = 800 / 500;
var rotate = false;

var width = 1600;
var height = 500;

var width_back = 1600;
var height_back = 500;

var data, data_text, recipient="People";

function initial(){

    data = [{"h":100, "t":"2021", "text":"", "color":"none", "stage":0}, 
            {"h":100, "t":"Jan.", "text":"", "color":"none", "stage":0}, 
            {"h":100, "t":"Feb.", "text":"", "color":"none", "stage":0}, 
            {"h":100, "t":"Mar.", "text":"","color":"none", "stage":0}, 
            {"h":100, "t":"Apr.", "text":"process1", "color":"#8CC6D4", "stage":1}, 
            {"h":100, "t":"May", "text":"process1", "color":"#8CC6D4", "stage":1},
            {"h":100, "t":"Jun.", "text":"process1", "color":"#8CC6D4", "stage":1},
            {"h":100, "t":"Jul.", "text":"process1", "color":"#8CC6D4", "stage":1},
            {"h":100, "t":"Aug.", "text":"process1", "color":"#8CC6D4", "stage":1},
            {"h":100, "t":"Set.", "text":"process1", "color":"#8CC6D4", "stage":1},
            {"h":100, "t":"Oct.", "text":"process2", "color":"#BAABC8", "stage":2},
            {"h":100, "t":"Nov.", "text":"process2", "color":"#BAABC8", "stage":2},
            {"h":100, "t":"Dec.", "text":"", "color":"none", "stage":0}, 
            {"h":100, "t":"2022", "text":"", "color":"none", "stage":0}];

    data_text = {
                "name":"Product Name",
                "farm":"Farm Name"
            }
    
    // var x = document.getElementsByClassName("other-val");
    // x.attachShadow({mode: "open"});

    getWH(1600,500)

    drawFrontTitle(data_text, width, height)
    drawFrontChart(data, width, height, rotate);

    drawBack(recipient, width_back, height_back)
}


initial();


let viz_text = {}
let card_width, card_height = 500;

let time_process = new Array(13).fill(0);
let naming_process = new Array(4).fill("");

const PNAME = ["Grow","Collect","Brew","Prepare"]
const COLOR = ["#8CC6D4","#BAABC8","#EAD971","#C2464E"]
const MONTHES = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."]


const formElement = document.querySelector('form#rendered-form')

// convert the form to JSON
// const getFormJSON = (form) => {
// const data = new FormData(form);
// return Array.from(data.keys()).reduce((result, key) => {
//     result[key] = data.get(key);
//     return result;
// }, {});
// };

const getFormJSON = (form) => {
    const data = new FormData(form);

    return Array.from(data.keys()).reduce((result, key) => {
      if (result[key]) {
        result[key] = data.getAll(key)
        return result
      }
      result[key] = data.get(key);
      return result;
    }, {});
  };

// handle the form submission event, prevent default form behaviour, check validity, convert form to JSON
const handler = (event) => {
    event.preventDefault();
    const valid = formElement.reportValidity();
    if (valid) {
        const result = getFormJSON(formElement);
        console.log(result)
    
//-----------custom

    handleProcess(result)

    card_width = result["width"];
    card_height = result["height"];

    data_text = {
        "name": result["product-name"],
        "farm": result["farmName"],
    }

    if (result["recipientName"] != ""){
        recipient = result["recipientName"]
    } else {
        recipient = "People"
    }
    

   getVizData(time_process);
   getWH(card_width,card_height)
   drawFrontChart(data, width, height, rotate);
   drawFrontTitle(data_text, width, height);
   drawBack(recipient, width, height, rotate)

}
}


formElement.addEventListener("submit", handler)

//from FormData API to my json
function handleProcess(result){

    time_process.fill(0);

    for (let i=1; i<5; i++){

        //looping through 4 processes
        let process = `process${i}[]`;
        if (result[process]){

            if (Array.isArray(result[process])){

                let list = result[process];

                if (list[list.length-1] == ""){  
                    //other isn't empty - get the customized name
                    setProcessName(true,i) 
                    //drop the 'other value'
                    list.pop()
                } else {
                    //use default name
                    setProcessName(false,i) 
                }

                //counting the months checked
                for (l in list){
                          
                        let month = parseInt(list[l].slice(6))
                        time_process[month] = i;
 
                } }
            
            //not an array, meaning in this process only one month being selected
            else if (result[process] != ""){

                setProcessName(false,i)        
                let month = parseInt(result[process].slice(6))
                time_process[month] = i;
                
            } 
 

        }

    }

    console.log(time_process);
    console.log(naming_process);
}

//not useful yet
function setProcessName(customize = false, i){

    if (customize == false){
        naming_process[i] = PNAME[i-1];
    } else {
        //get the customized name
        // let c = document.getElementById(`process${i}-other-value`).children[0].text;
        console.log(document.getElementById(`process${i}-other-value`).innerHTML)
        // naming_process[i] = c;

    }
}

function getVizData(time_process, h=100){

    let viz_text = [];
    viz_text.push(
        {"h":h, "t":"2021", "text":"", "color":"none", "stage":0}
    )

    for (let i=1; i<13; i++){

        if (time_process[i] == 0){
            viz_text.push(
                {"h":h, "t":MONTHES[i-1], "text":"", "color":"none", "stage":0}
            ) 
        }else{
            viz_text.push(
                {"h":h, "t":"", "text":naming_process[time_process[i]], "color":COLOR[time_process[i]-1], "stage":time_process[i]}
            )
        }
       
    }
    
    viz_text.push(
        {"h":h, "t":"2022", "text":"", "color":"none", "stage":0}
    ) 

    data = viz_text;
}


function getWH(w,h){

let height_sum = FrameHeight;
let width_sum = FrameWidth;

let height_try, width_try = 0;

    //determine layout
    if (w/h > 1.5){
        
        // title&chart horizontally stacked
        document.getElementById("front").style.flexDirection = "row";
        document.getElementById("landing-page-right").style.flexDirection = "column";

        //1-fit width
        height_try = FrameWidth / w * h;

        if ( height_try * 2 < FrameHeight){

            height = height_try;
            height_back = height_try;

            width = width_sum / 2; // title + chart
            width_back = width_sum;

            rotate = false;
        }
        else{
            //2-fit (height, double)
            width_try = (FrameHeight / 2) / h * w;

            height = height_sum / 2;
            height_back = height_sum / 2;

            width = width_try /2;
            width_back = width_try;

            rotate = false;
        }

    }
    else { 
        //vertical
        document.getElementById("front").style.flexDirection = "column";
        document.getElementById("landing-page-right").style.flexDirection = "row";

        //1-fit height
        width_try = (FrameHeight / h * w) 

        if (width_try * 2 < FrameWidth){

            height = height_sum / 2;
            height_back = height_sum;

            width = width_try;
            width_back = width_try;

            rotate = true;

        } else {

            //2-fit width
            height_try = (FrameWidth / 2) / w * h;

            height = height_try / 2;
            height_back = height_try;

            width = FrameWidth / 2;
            width_back = FrameWidth / 2;

            rotate = true;
        }

 

        // if (w/h < 0.3) { rotate = true;}

    } 

    document.getElementById("front").style.width = width_back * 1.01 +"px";
    document.getElementById("front").style.height = height_back * 1.01 +"px";

    document.getElementById("back").style.width = width_back * 1.01 +"px";
    document.getElementById("back").style.height = height_back * 1.01 +"px";
}

document.getElementById('resetBtn').addEventListener("click", function(){
    location.reload();
        return false;
})