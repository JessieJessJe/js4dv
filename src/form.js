const FrameWidth = window.innerWidth * 0.7;
const FrameHeight = window.innerHeight * 0.8;
const FrameRatio = 800 / 500;

let rotate = false;
let width = 800;
let height = 400;

const PNAME = ['Grow', 'Collect', 'Brew', 'Prepare'];
const COLOR = ['#8CC6D4', '#BAABC8', '#EAD971', '#C2464E'];
const MONTHES = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const INITIAL_DATA = [
  { h: 100, t: '2021', text: '', color: 'none', stage: 0 },
  { h: 100, t: 'Jan.', text: '', color: 'none', stage: 0 },
  { h: 100, t: 'Feb.', text: '', color: 'none', stage: 0 },
  { h: 100, t: 'Mar.', text: '', color: 'none', stage: 0 },
  { h: 100, t: 'Apr.', text: 'process1', color: '#8CC6D4', stage: 1 },
  { h: 100, t: 'May', text: 'process1', color: '#8CC6D4', stage: 1 },
  { h: 100, t: 'Jun.', text: 'process1', color: '#8CC6D4', stage: 1 },
  { h: 100, t: 'Jul.', text: 'process1', color: '#8CC6D4', stage: 1 },
  { h: 100, t: 'Aug.', text: 'process1', color: '#8CC6D4', stage: 1 },
  { h: 100, t: 'Set.', text: 'process1', color: '#8CC6D4', stage: 1 },
  { h: 100, t: 'Oct.', text: 'process2', color: '#BAABC8', stage: 2 },
  { h: 100, t: 'Nov.', text: 'process2', color: '#BAABC8', stage: 2 },
  { h: 100, t: 'Dec.', text: '', color: 'none', stage: 0 },
  { h: 100, t: '2022', text: '', color: 'none', stage: 0 },
];

let data, data_text;

function initial() {
  data = INITIAL_DATA;
  data_text = {
    name: 'Product Name',
    farm: 'Farm Name',
  };

  setCardSize(1600, 500);
  drawFrontTitle(data_text, width, height);
  drawFrontChart(data, width, height, rotate);
}

let viz_text = {};

let time_process = new Array(13).fill(0);
let naming_process = new Array(4).fill('');

const formBtn = document.querySelector('form#rendered-form');

const getFormJSON = (form) => {
  const data = new FormData(form);

  return Array.from(data.keys()).reduce((result, key) => {
    if (result[key]) {
      result[key] = data.getAll(key);
      return result;
    }
    result[key] = data.get(key);
    return result;
  }, {});
};

// handle the form submission event, prevent default form behaviour, check validity, convert form to JSON
const handler = (event) => {
  //prevent default form behaviour,
  event.preventDefault();
  const valid = formBtn.reportValidity();
  if (valid) {
    const result = getFormJSON(formBtn);
    console.log('form result', result);

    //-----------custom functionality--------------------

    handleProcess(result);

    data_text = {
      name: result['product-name'],
      farm: result['farmName'],
    };

    getVizData(time_process);

    setCardSize();
    drawFrontChart(data, width, height, rotate);
    drawFrontTitle(data_text, width, height);
  }
};

//from FormData API to my json
function handleProcess(result) {
  time_process.fill(0);

  for (let i = 1; i < 5; i++) {
    //looping through 4 processes
    let process = `process${i}[]`;
    if (result[process]) {
      if (Array.isArray(result[process])) {
        let list = result[process];

        if (list[list.length - 1] == '') {
          //other isn't empty - get the customized name
          setProcessName(true, i);
          //drop the 'other value'
          list.pop();
        } else {
          //use default name
          setProcessName(false, i);
        }

        //counting the months checked
        for (l in list) {
          let month = parseInt(list[l].slice(6));
          time_process[month] = i;
        }
      }

      //not an array, meaning in this process only one month being selected
      else if (result[process] != '') {
        setProcessName(false, i);
        let month = parseInt(result[process].slice(6));
        time_process[month] = i;
      }
    }
  }
}

//not useful yet
function setProcessName(customize = false, i) {
  if (customize == false) {
    naming_process[i] = PNAME[i - 1];
  } else {
    //get the customized name
    // let c = document.getElementById(`process${i}-other-value`).children[0].text;
    console.log(document.getElementById(`process${i}-other-value`).innerHTML);
    // naming_process[i] = c;
  }
}

function getVizData(time_process, h = 100) {
  let viz_text = [];
  viz_text.push({ h: h, t: '2021', text: '', color: 'none', stage: 0 });

  for (let i = 1; i < 13; i++) {
    if (time_process[i] == 0) {
      viz_text.push({ h: h, t: MONTHES[i - 1], text: '', color: 'none', stage: 0 });
    } else {
      viz_text.push({
        h: h,
        t: '',
        text: naming_process[time_process[i]],
        color: COLOR[time_process[i] - 1],
        stage: time_process[i],
      });
    }
  }

  viz_text.push({ h: h, t: '2022', text: '', color: 'none', stage: 0 });

  data = viz_text;
}

function setCardSize(w, h) {
  document.getElementById('front').style.width = width + 'px';
  document.getElementById('front').style.height = height + 'px';
}

///////////function calls

initial();

formBtn.addEventListener('submit', handler);

document.getElementById('resetBtn').addEventListener('click', function () {
  location.reload();
  return false;
});
