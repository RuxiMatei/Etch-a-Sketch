
let unicornToggle = "off";
let unicornButton = document.getElementById("unicorn");

let eraserToggle = "off";
let eraserButton = document.getElementById("eraser");

let pencilToggle = "on";
let pencilButton = document.getElementById("pencil");

let buttonsTogglersArray = [
    {buttons: pencilButton, togglers: pencilToggle, name: "pencil"},
    {buttons: unicornButton, togglers: unicornToggle, name: "unicorn"},
    {buttons: eraserButton, togglers: eraserToggle, name: "eraser"}
];

let paperColor = document.getElementById("paperColor");
let paper = paperColor.value;

let pencilColor = document.getElementById("pencilColor");
let pencil = pencilColor.value;

let boardSizeLabel = document.querySelector("form-label");
let size = document.getElementById("boardSize").value;
let grid = document.getElementById("board");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let offCounter = 2; 

// ------ FUNCTIONS -----
// button toggler
let buttonToggler = (toggler, button) => {
    if(toggler == "off") {
        toggler = "on";
        button.classList.add("tog");
    } else {
        toggler = "off";
        button.classList.remove("tog");
    };
    return toggler;
};
// color and slider value changer
let parameterChanger = (input, parameter) => {
    parameter = input.value;
    return parameter;
};

// change in cell colors
unicornColorGenerator = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256); 
    
    let rgbColor = "rgb(" + r + "," + g + "," + b + ")";
    return rgbColor;
};
colorChanger = (e) => {
    if (e.type === 'mouseover' && !mouseDown) return;
    let currentMode;
    buttonsTogglersArray.forEach(button => {
        if (button.togglers == "on"){
            currentMode = button.name;
        };
    });
    if (currentMode == "pencil"){
        e.target.classList.remove("unchanged");
        e.target.style.backgroundColor = pencil;
    } else if (currentMode == "unicorn") {
        e.target.classList.remove("unchanged");
        e.target.style.backgroundColor = unicornColorGenerator();
    } else {
        e.target.classList.add("unchanged");
        e.target.style.backgroundColor = paper; 
    };
};

//------------ GRID FUNCTIONS -----------------
//create grid
let createGrid = (size) => {
    for(let i = 0; i < size*size; i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element", "unchanged"); //--- unchanged is for changing board color or eraser
        grid.appendChild(gridElement);

        gridElement.addEventListener('mouseover', colorChanger);
        gridElement.addEventListener('mousedown', colorChanger);
        gridElement.style.backgroundColor = paper; //keep board color if it's a reload
    };
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
};

// clear board
let clearGrid = () => {
    grid.innerHTML = '';
};
//reload board
let reloadBoard = () => {
    clearGrid();
    createGrid(size);
};
document.getElementById("clearBoard").addEventListener("click", reloadBoard);

// ----- TRACK CHANGES -----
//track changes in paper and pen colors
paperColor.addEventListener('change', function(){
    //let paperOld = paper;
    paper = parameterChanger(paperColor, paper);
    $(".unchanged").css("background-color", paper);
});
pencilColor.addEventListener('change', function(){
    pencil = parameterChanger(pencilColor, pencil);
});
// track changes in paper size
document.getElementById("boardSize").addEventListener('change', function(){
    size = document.getElementById("boardSize").value;
    let txt = size + " x " + size;
    $(".form-label").text(txt);
    reloadBoard(size);
});

// buttons listeners
buttonsTogglersArray.forEach(element => {
 /*   let offCounter = 0;
    for (let i = 0; i < 3; i++){
        if (buttonsTogglersArray[i].togglers = "off" && buttonsTogglersArray[i] !== element){
            offCounter ++;
        };
    }; */
    element.buttons.addEventListener('click', function(){
        if (element.togglers == "on" && offCounter !== 3) {
            console.log("one option must be on");
            return;
        } else {
            element.togglers = buttonToggler(element.togglers, element.buttons);
            offCounter --;
            for (i = 0; i < 3; i++){ //only one button works at a time
                if (buttonsTogglersArray[i] !== element && element.togglers == "on"){
                    buttonsTogglersArray[i].togglers = "off";
                    offCounter ++;
                    buttonsTogglersArray[i].buttons.classList.remove("tog");
                };
            };
        };
    });
});

window.onload = () => {
    createGrid(size);
  }
  

