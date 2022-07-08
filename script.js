let music = new Audio("music.mp3");
let ting = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let turn = "X";
let gameFinish = false;

//Function to change the turn
const changeTurn = ()=> {
    return turn === "X"?"0":"X";
}

//Function to check for the winner
const checkWinner = ()=> {
    let boxtext = document.getElementsByClassName('boxText');
    let wins = [            //1st 3 digits -> combinations that can be made to win a game.
        [0,1,2,5,5,0],      //last 3 digits -> the translate and rotate digits.
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135],
    ]

    wins.forEach(e => {
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[0]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            gameFinish = true;
            document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector('.line').style.transform = 'translate('+e[3]+'vw, '+e[4]+'vw) rotate('+e[5]+'deg)';
            document.querySelector('.line').style.width = "20vw";
            gameOver.play();
            setTimeout(Reset, 2000);
        }
    })

    if(boxtext[0].innerText !== "" && boxtext[1].innerText !== "" && boxtext[2].innerText !== "" && boxtext[3].innerText !== "" && boxtext[4].innerText !== "" &&
    boxtext[5].innerText !== "" && boxtext[6].innerText !== "" && boxtext[7].innerText !== "" && boxtext[8].innerText !== "") {
        document.querySelector('.info').innerText = "Draw!";
        gameFinish = true;
        gameOver.play();
        //setTimeout(Reset, 2000);
    }
}

//Game Logic
//music.play();
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxText');
    element.addEventListener('click', ()=> {
        if(boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            ting.play();
            checkWinner();
            if(!gameFinish) {
                document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
            }
        }
    })
})

//Add onclick listener to reset button
reset.addEventListener('click', Reset);

function Reset() {
    let boxtexts = document.querySelectorAll('.boxText');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    gameFinish = false;
    document.querySelector('.line').style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "0px";
}
