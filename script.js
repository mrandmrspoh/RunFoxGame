var stage = document.querySelector("h1");
var entireFrame = document.querySelector("body");
var char = document.querySelector("#character");
var charMarginTop = char.offsetTop;
var charHeight = char.offsetHeight;
var charWidth = char.offsetWidth;
var obsParent = document.querySelector("#obstacleParent");
var obsArray = [];
var gap;
var gameScore= 0;
var startButton = document.querySelector("#start");
var stopFlag =[];


////initiate arrow key functions
document.addEventListener("keydown", function(event) {
    keyboardKeys(event);
});


////user initiate start game
var initateGameStart = function() {
    startButton.style.visibility= "hidden";
    showStage();
    initiateScoreCounter();
    stage1aObstacles();
    stage1bObstacles();
    stage2Obstacles();
    stage3Obstacles();
    stage4Obstacles();
    initiateMovingObstacle();
    removeObstacle();
};


var keyboardKeys = function(event) {
    switch (event.keyCode) {
        case 13: //start
        initateGameStart();
        myAudio1 = document.createElement("audio");
        myAudio1.src = "melodyloops-preview-jolly-fun-2m30s.mp3";
        myAudio1.play();
        break;
        case 37: //left arrow`
        char.style.marginLeft = (char.offsetLeft - 10) + "px"
        break;
        case 39: //right arrow
        char.style.marginLeft = (char.offsetLeft + 10) + "px"
        break;
        case 38://uparrow
        charJump(charHeight);
        myAudio2 = document.createElement("audio");
        myAudio2.src = "Funny-cartoon-jump-sound-effect.mp3";
        myAudio2.play();
        break;
    }
}


var showStage = function() {
    stage1 = setTimeout(function()
    {   document.querySelector("h2").innerHTML ="STAGE 1...";
        document.querySelector("h2").style.visibility ="visible";
    }, 1000);
    stage1e = setTimeout(function()
    { document.querySelector("h2").style.visibility ="hidden";
    }, 4000);
    stage2 = setTimeout(function()
    {   document.querySelector("h2").innerHTML ="STAGE 2...";
        document.querySelector("h2").style.visibility ="visible";
    }, 17000);
    stage2e = setTimeout(function()
    {    document.querySelector("h2").style.visibility ="hidden";
    }, 20000);
    stage3 = setTimeout(function()
    {   document.querySelector("h2").innerHTML ="STAGE 3...";
        document.querySelector("h2").style.visibility ="visible";
    }, 35000);
    stage3e = setTimeout(function()
    {    document.querySelector("h2").style.visibility ="hidden";
    }, 38000);
    stage4 = setTimeout(function()
    {   document.querySelector("h2").innerHTML ="STAGE 4...";
        document.querySelector("h2").style.visibility ="visible";
    }, 60000);
    stage4e = setTimeout(function()
    {    document.querySelector("h2").style.visibility ="hidden";
    }, 63000);
    stage5 = setTimeout(function()
    {   document.querySelector("h2").innerHTML ="Mr Fox has reached home safely! Please look out for his next adventure!";
        document.querySelector("h2").style.fontSize = "40px";
        document.querySelector("h2").style.visibility ="visible";
    }, 85000);

}


function moveSelection(event) {
    switch (event.keyCode) {
        case 37: //left arrow
        char.style.marginLeft = (char.offsetLeft - 10) + "px"
        break;
        case 39: //right arrow
        char.style.marginLeft = (char.offsetLeft + 10) + "px"
        break;
        case 38://uparrow
        charJump(charHeight);
        break;
    }
}


var charJump = function(jumpHeight) {
    ////get default char margin-top from HTML and adjust by jump height
        charMarginTop -= jumpHeight;
        //console.log(charMarginTop)
    ////update jump height in DOM (HTML)
        char.style.marginTop = charMarginTop + "px";
        //console.log(charMarginTop)
////Time landing action after every jump
        setTimeout(function() {
        ////get char jump height from DOM (HTML) and adjust back to default
            charMarginTop += jumpHeight;
            // console.log(charMarginTop);
        ////update land position (default) in DOM (HTML)
            char.style.marginTop = charMarginTop + "px";
            // console.log(charMarginTop);
        },1500)
};


////score count accumulation based on time on game..
var initiateScoreCounter = function() {
    scoreCounter = setInterval(function() {
        gameScore ++;
        document.querySelector("h3").innerHTML = "Mr Fox has run for " + gameScore + "s..";
            if (gameScore == 85 || stopFlag[0] === "Y")
            {
            clearInterval(scoreCounter);
            }
    }, 1000)
}


////create obstacles on ground
var createObsType1 = function(initIndex, count, height, width, gapLeftFixed, gapLeftFactor) {
////Loop creation of obstacles
    for (i = initIndex; i < count; i++) {
    ////create obstacle element in DOM (HTML)
        var newObs = document.createElement("div");
    ////set up obstacle individual running ID and shared classification in HTML
        newObs.id = "obs" + i;
        newObs.setAttribute ("class", "obstacle");
    ////randomize 2 types of obstacle height based on 1x or 2x of "height" variable
        if (Math.random() <= 0.5) {
            var newObsHeight = height - 5;
        } else {
            newObsHeight= (height * 2) - 5;
        }
    ////update obstacle height and width in DOM (HTML)
        newObs.style.height = newObsHeight + "px";
        newObs.style.width = width + "px";
    ////update obstacle marginTop and marginLeft in DOM (HTML)
        newObs.style.marginTop = 400 - newObsHeight + "px";
        newObs.style.marginLeft = gapLeftFixed + (i * 190 * gapLeftFactor)  + "px";
    ////append obstacle to parent in DOM (HTML)
        obsParent.appendChild(newObs);
    ////also store number of obstacles by ID in an array
        obsArray.push(i);
        //console.log(obsArr)
    }
}

////create matching obstacles on ground and Sky. additional heightBuffer included due to increased game complexity
var createObsType2 = function(initIndex, count, height, width, gapLeftFixed, gapLeftFactor, heightBuffer) {
////Loop creation of obstacles
    for (i = initIndex; i < count; i++) {
    ////create obstacle element in DOM (HTML)
        var newObsGround = document.createElement("div");
        var newObsSky = document.createElement("div");
    ////set up obstacle individual running ID and shared classification in HTML
        newObsGround.id = "obs" + i;
        newObsSky.id = "obs" + i + "c";
        newObsGround.setAttribute ("class", "obstacle");
        newObsSky.setAttribute ("class", "obstacle");
    ////randomize 2 types of obstacle height based on 1x or 2x of "height" variable
        if (Math.random() <= 0.5) {
            var newObsHeightGround = height - 5;
            var newObsHeightSky = 400 - 5 - newObsHeightGround - charHeight - 15 - heightBuffer;
        } else {
            newObsHeightGround= (height * 2) - 5;
            newObsHeightSky = 400 - 5 - newObsHeightGround - charHeight - 15 - heightBuffer
        }
    ////update obstacle height and width in DOM (HTML)
        newObsGround.style.height = newObsHeightGround + "px";
        newObsSky.style.height = newObsHeightSky + "px";
        newObsGround.style.width = width + "px";
        newObsSky.style.width = width + "px";
    ////update obstacle marginTop and marginLeft in DOM (HTML) based on obstacle height defined earlier
        newObsGround.style.marginTop = 400 - newObsHeightGround + "px";
        newObsSky.style.marginTop = 0
        newObsGround.style.marginLeft = gapLeftFixed + (i * 190 * gapLeftFactor)  + "px";
        newObsSky.style.marginLeft = gapLeftFixed + (i * 190 * gapLeftFactor)  + "px";
    ////append obstacle to parent in DOM (HTML)
        obsParent.appendChild(newObsGround);
        obsParent.appendChild(newObsSky);
    ////also store number of obstacles by ID in an array
        obsArray.push(i);
        obsArray.push(i + "c");
        //console.log(obsArr)
    }
}


////create obstacles on the Sky
var createObsType3 = function(initIndex, count, height, width, gapLeftFixed, gapLeftFactor, heightBuffer) {
////Loop creation of obstacles
    for (i = initIndex; i < count; i++) {
    ////create obstacle element in DOM (HTML)
        var newObs = document.createElement("div");
    ////set up obstacle individual running ID and shared classification in HTML
        newObs.id = "obs" + i;
        newObs.setAttribute ("class", "obstacle");
    ////randomize 2 types of obstacle height based on 1x or 2x of "height" variable
        if (Math.random() <= 0.5) {
            var newObsHeight = height- 5;
        } else {
            newObsHeight = (height*2) -5;
        }
        if (Math.random() <= 0.5) {
            var newObsWidth = width;
        } else {
            newObsWidth = (width*2);
        }
    ////update obstacle height and width in DOM (HTML)
        newObs.style.height = newObsHeight + "px";
        newObs.style.width = newObsHeight + "px";
    ////update obstacle marginTop and marginLeft in DOM (HTML) based on obstacle height defined earlier
        newObs.style.marginTop = 0;
        newObs.style.marginLeft = gapLeftFixed + (i * 190 * gapLeftFactor)  + "px";
    ////append obstacle to parent in DOM (HTML)
        obsParent.appendChild(newObs);
    ////also store number of obstacles by ID in an array
        obsArray.push(i);
        //console.log(obsArr)
    }
}



////initial set of obstacles on game start.
stage1aObstacles = function() {
    createObsType1(0, 5, charHeight, charWidth, 240, 1);
}

////subsequent creation of obstacles (on ground) based on  time interval. creation will stop after completion of 4 intervals.
stage1bObstacles = function() {
    var j = 4;
    var stage1bInterval = setInterval(function() {
        j++;
        //console.log(j);
        createObsType1(j, j+1, charHeight, charWidth*1.5, 1000, 0);
        if (stopFlag[0] ==="Y") {
            clearInterval(stage1bInterval);
        }
    },3000);
    setTimeout (function() {
        clearInterval(stage1bInterval);
    }, 3000*4+1);
}


////timed creation of combination obstacles (ground + Sky) based on time interval. creation starts after previous round + 1s, and will stop after completion of 4 intervals.
stage2Obstacles = function() {
    var k = 8;
    stage2Timeout = setTimeout(function() {
        stage2Interval = setInterval(function() {
            k++;
            //console.log(j);
            createObsType2(k, k+1, charHeight, charWidth*1.5, 1000, 0, 0);
            if (stopFlag[0] ==="Y") {
                clearInterval(stage2Interval);
            }
        },3000);
            setTimeout (function() {
                clearInterval(stage2Interval);
            }, 3000*4+1);
    }, 13000);
}


////timed creation of combination obstacles (tunnel effect) based on time interval. creation starts after previous round + 1s, and will stop after completion of 8 intervals.
stage3Obstacles = function() {
    var k = 12;
    stage3Timeout = setTimeout(function() {
        stage3Interval = setInterval(function() {
            k++;
            //console.log(j);
            createObsType2(k, k+1, charHeight, charWidth*5, 1000, 0, 90);
            if (stopFlag[0] ==="Y") {
                clearInterval(stage3Interval);
            }
       },3000)
        setTimeout (function() {
            clearInterval(stage3Interval);
            }, 3000*8+1)
    }, 26000)
}


////timed creation of obstacles dropping form the sky based on time interval.Creation starts at beginning of game
stage4Obstacles = function() {
    createObsType3(21, 27, charHeight, charWidth, -400, 1.5, 0);
    var droppingObstacleTimeout = setTimeout(function() {
        var droppingObstacle = setInterval(function() {
                for (a = 0; a < obsArray.length; a++) {
        ////set up for all obstacle to drop every interval
                ////get latest list of obstacles from DOM (HTML)
                    var x = document.querySelector("#obs" + obsArray[a]);
                ////define movement for every interval
                    var obsMarginTop = x.offsetTop;
                    var obsHeight = x.offsetHeight;
                    obsMarginTop= obsMarginTop + 10;
                    if (obsMarginTop < 400- 1 - obsHeight) {
                        if (a%2 === 0) {
                            obsMarginTop = obsMarginTop + 80;
                        }
                        else if (a%3 === 0) {
                            obsMarginTop = obsMarginTop + 20;
                        }
                        else if (a%5 === 0) {
                            obsMarginTop = obsMarginTop + 30;
                        } else {
                            obsMarginTop = obsMarginTop + 10;
                        }
                    } else obsMarginTop = 400- 1 - obsHeight;
                ////update movement in DOM (HTML)
                    x.style.marginTop = obsMarginTop +"px"
                }
            if (stopFlag[0] ==="Y") {
            clearInterval(droppingObstacle);
            }
        },1500)
    }, 65000)
}


//movement of  obstacles towards character based on time interval
var initiateMovingObstacle = function() {
    var movingObstacle = setInterval(function() {
            for (a = 0; a < obsArray.length; a++) {
    ////set up for all obstacle to move every interval
            ////get latest list of obstacles from DOM (HTML)
                var x = document.querySelector("#obs" + obsArray[a]);
            // ////define movement for every interval
                var obsMarginLeft = x.offsetLeft;
                obsMarginLeft = obsMarginLeft - 10;
            ////update movement in DOM (HTML)
                x.style.marginLeft = obsMarginLeft +"px";
                // console.log(obsMarginLeft);
            ////check for collision between obstacles and character
                var charXStart =  char.offsetLeft;
                var charXEnd = charXStart + char.offsetWidth;
                var charYStart = char.offsetTop;
                var charYEnd = charYStart + char.offsetHeight;
                var obsXStart = x.offsetLeft;
                var obsXEnd = obsXStart + x.offsetWidth;
                var obsYStart = x.offsetTop;
                var obsYEnd = obsYStart + x.offsetHeight;
                    if (charXEnd - 10 > obsXStart && obsXEnd > charXStart + 10) {
                        if ((!x.id.includes("c") && charYEnd > obsYStart)
                            || (x.id.includes("c") && charYStart < obsYEnd))
                        {
                            stopFlag.push("Y");
                        ////stop movement and counter upon game end
                            clearInterval(movingObstacle);
                            clearInterval(scoreCounter);
                            clearTimeout(stage1);
                            clearTimeout(stage1e);
                            clearTimeout(stage2);
                            clearTimeout(stage2e);
                            clearTimeout(stage3);
                            clearTimeout(stage3e);
                            clearTimeout(stage4);
                            clearTimeout(stage4e);
                            clearTimeout(stage5);
                            clearTimeout(stage2Timeout);
                            clearTimeout(stage2Timeout);
                            document.querySelector("h2").style.visibility ="visible";
                            document.querySelector("h2").style.fontSize = "60px";
                            document.querySelector("h2").style.marginTop = "40px";
                            document.querySelector("h2").innerHTML ="GAME OVER!<br>Refresh page or press F5 to play again!";
                            myAudio1.pause();
                            myAudio2.pause();
                        }
                    }
            }
    },120)
}


////removal of  obstacles after exit from game frame. recurring check and removal based on time interval.
removeObstacle = function() {
    setInterval (function() {
        for (b = 0 ; b < obsArray.length; b ++) {
            if (document.querySelector("#obs"+obsArray[b]).offsetLeft < -200) {
                    document.querySelector("#obs"+obsArray[b]).remove();
                    obsArray.splice( obsArray.indexOf(obsArray[b]), 1 );
            }
        }
    }, 1000)
    }




