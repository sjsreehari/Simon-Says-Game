let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "blue", "green", "orange", "pink", "cyan", "magenta", "lime", "brown", "navy", "olive", "teal", "maroon", "silver", "gold", "bronze", "salmon", "khaki", "coral", "indigo", "violet", "amber", "azure"];
let started = false;
let level = 0;
let h3 = document.querySelector("h3");
let startBtn = document.querySelector(".start-btn");

checkWindowSize();

function checkWindowSize(){
    if(window.innerWidth < 610){
        h3.innerText = `Click Start to start the Game`;
    }
    else if(window.innerWidth >= 610) {
        hiddenStartBtn();
    }
}

document.addEventListener("keypress", function(){
    if(!started){
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

startBtn.addEventListener("click", function(){
    if(!started){
        console.log("Game Started");
        started = true;
        hiddenStartBtn();
        console.log("Button Start");
        levelUp();
    }
});

function hiddenStartBtn() {
    startBtn.style.display = "none";
}

function displayStartBtn(){
    startBtn.style.display = "inline-block";
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 1000);
}

function animateTile(tile) { tile.style.opacity = 0; tile.style.transition = "opacity 1s, transform 1s"; tile.style.transform = "scale(0.8) translateX(10px)"; setTimeout(() => { tile.style.opacity = 1; tile.style.transform = "scale(1.1) translateX(-10px)"; }, 10); setTimeout(() => { tile.style.transform = "scale(1)"; }, 1010); }

function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randIndex = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIndex];
    let randbtn = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);
    console.log("Game Seq: " + gameSeq);
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`#${color}`);
            animateTile(btn);
        }, index * 1200); // 1.2 seconds per animation
    });
    setTimeout(() => {
        h3.innerText = "Your Turn";
    }, gameSeq.length * 1200);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            h3.innerText = "Congrats! Moving to next level";
            setTimeout(levelUp, 1000);
        }
    } else {
        if(window.innerWidth < 610){
            h3.innerHTML = `<h2>Game Over!! Your Score <b>${level}</b><br>Press Start to restart</h2>`;
            displayStartBtn();
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(() => {
                document.querySelector("body").style.backgroundColor = "rgb(5, 52, 100)";
            }, 400);
            reset();
        } else {
            h3.innerHTML = `<h2>Game Over!! Your Score <b>${level}</b><br>Press any key to restart</h2>`;
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(() => {
                document.querySelector("body").style.backgroundColor = "rgb(5, 52, 100)";
            }, 400);
            reset();
        }
    }
}

function btnPress(){
    let btn = this;
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    userFlash(btn);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}
