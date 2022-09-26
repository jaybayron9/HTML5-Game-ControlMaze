const body = document.querySelectorAll(".body.grayed")
const gameContainer = document.querySelector(".game_container");
const starts = document.querySelectorAll(".start");
const stages = document.querySelectorAll(".stage")
const shock = document.querySelector(".shock")
const shockEnd = document.querySelector(".shock_end")
const exitBtns = document.querySelectorAll(".exit_btn")
const lifeContainer = document.querySelector(".life_container")
let level = document.querySelector(".game_container h1")
let stageCount;
let lifeCount;


let gameReset = shocker => {
    rmvMouseWatch()
    shocker.style.display = "block";
    lifeCount = 3
    stageCount = 1;
    localStorage.setItem("userLife", lifeCount)
    localStorage.setItem("userStage", stageCount)
    stageSet(stageCount)
}


let lifeDisplay = () => {
    let heart = document.createElement("img")
    heart.setAttribute("src", "img/heart.png")
    lifeContainer.appendChild(heart)
}


let execLifeCreate = () => {
    let cnt = lifeCount
    while(!(cnt < 1)){
        lifeDisplay()
        cnt--
    }
} 


exitBtns.forEach(function (exitBtn) {
    exitBtn.onclick = () => {
        document.querySelectorAll(".life_container img").forEach(img => {
          img.remove()
        })
        execLifeCreate()
        shock.style.display = "none"
        shockEnd.style.display = "none"
    }
})


let lifeCheck = life => {
    if (life === 0) {
        gameReset(shock)
        return 0;
    }
}


const stageSet = stageNumber => {    
    stages.forEach(stage => {
        stage.classList.remove("show")
    })  
    document.querySelector(".stage-" + stageNumber).classList.add("show")
    level.innerHTML = `Stage ${stageNumber}`
    console.trace("washei: ", stageCount, lifeCount)
}



const mouseWatch = e => {
    cursorCheck(e.target.classList.value)
}

const rmvMouseWatch = () => {
    gameContainer.removeEventListener("mousemove", mouseWatch)
}


starts.forEach(function (start) {
    start.addEventListener("mouseenter", function () {              
        body.forEach(function (el) {
            el.classList.add("game")
        })
        gameContainer.addEventListener("mousemove", mouseWatch)
    })
})


const cursorCheck = classValue => {
    if (classValue === "end") {
        if(stageCount === 3 || stageCount > 3) {
            gameReset(shockEnd);
            return 0;
        }
        gameContainer.removeEventListener("mousemove", mouseWatch) 
        body.forEach(el => {
            el.classList.remove("game")
        })
        stageCount++ 
        localStorage.setItem("userStage", stageCount)
        console.trace(localStorage.getItem("userStage"))
        stageSet(stageCount)
        return 0;
    }
    if (classValue.includes("body") || classValue === "start" || classValue === "horror") 
        return 0
    body.forEach(el => {
        el.classList.remove("game")
    })
    rmvMouseWatch();  
    lifeCount--
    lifeCheck(lifeCount)
    const heartImgs = document.querySelectorAll(".life_container img") // need to put it here to check how many hearts left. when declared on top it collects heart as soon as the page loads , therefore the nodelist will be empty
    heartImgs[lifeCount].classList.add("died")
    localStorage.setItem("userLife", lifeCount)
}


if (typeof(Storage) === "undefined") {
    let test = confirm("Local storage is not available. \n Your game might not be saved whenever you refresh, close the tab, close your browser or whenever your computeshutsdown \n\n Still want to continue?")
    if(!test) {
        window.location.replace("ThePoint")
    }
}


window.addEventListener("load", () => {
    let getLife = localStorage.getItem("userLife")
    let getStage = localStorage.getItem("userStage")
    if (getLife === null || 
        getStage === null || 
        getLife <= 0 ||
        getStage <= 0 || 
        getLife > 3 ||
        getStage > 3){
        getLife = 3
        getStage = 1
    }
    lifeCount = getLife
    stageCount = getStage
    stageSet(stageCount)
    execLifeCreate();
})
