import BLOCKS from "./blocks.js";

//ul에 li를 넣기 위해 DOM을 선언
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variablesi 
let score = 0;  //점수
let duration = 500; //블록이 떨어지는 시간
let downInterval;   //
let tempMovingItem; //moving 실행 전 잠시 담아두는 역할
let isFalling = false;


//movingItem은 블럭의 타입과 좌표 정보 갖는 변수

const movingItem = {
    type: "",
    direction: 3,   //디렉션은 화살표 키 눌렀을 때 블럭이 돌아가는 지표
    top: 0, //좌표 기준으로 어디까지 내려와 있는지, 내려와 있는지 표현해주는 역할
    left: 0    //좌표 기준 좌우 어디쯤에 있는지 알려주는 역할
};


init()  // 게임 시작하면 init이 호출되면서 게임판-줄 생성

//functions
function init() {    //처음 시작할때

    tempMovingItem = {...movingItem};   //스프레드 오퍼레이터 -> 값만 가져와서 사용한다!
    //따라서 무빙 아이템의 값이 변경되더라도 템프무빙은 변경되지 않는다
    for(let i = 0; i< GAME_ROWS; i++){
        prependNewLine()
    }
    generateNewBlock()
}

//li를 20번 넣을 것이고, 그 안에는 li를 가지고 있는 ul을 다시 넣을것
//함수 만들어서 그걸 10번 반복함으로서 만들것이다.

function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j = 0; j < GAME_COLS; j++){
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul)
    playground.prepend(li)
}

//블럭을 선택을 해서 값에 맞는 그림을 그려줄 친구 -> 블럭을 렌더링 할것
//랜더링이 뭐지?
function renderBlocks(moveType = ""){
    //하나하나 접근하기 힘드니까 변수처럼 접근 할 수 있도록 디스트럭처링
    const { type, direction, top, left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        //맨 아래로 갔는데 더 내려가고 사라지며 에러나는것 없애기 위해 삼항 연산자 사용
        //윗줄은 consol.log 켜서 확인해보는게 좋음
        const target = playground.childNodes[y]?    //삼항연산자 - 이게 예스면?
        playground.childNodes[y].childNodes[0].childNodes[x]    // 이걸 사용하고
        : null ;    //아니면 null

        const isAvailable = checkEmpty(target);
        if(isAvailable){
            target.classList.add(type, "moving")
        }
        else{
            tempMovingItem = {...movingItem}
            if(moveType === 'retry'){
                clearInterval(downInterval)
                showGameoverText()
            }
            setTimeout(() => {
                //이거 안하면 랜더 할때마다 MAximum call stack size error 발생
                //이벤트를 계속 호출하는 상황이 발생해서 그런것
                renderBlocks('retry')
                if(moveType === "top"){     //이건 바닥으로 내려간 블럭 없어지지 않게 하는 역할
                    seizeBlock();
                }
            }, 0)
            return true;
        }
        
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction; 
}

//이거는 바닥으로 내려간 블럭 생긴거, 위치 유지하면서 다음 블럭 생성 시키는 역할
function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMatch()
}

function checkMatch(){

    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li =>{
            if(!li.classList.contains("seized")){
                matched = false;
            }
        })
        if(matched){
            child.remove();
            prependNewLine()
            score++;
            scoreDisplay.innerText = score;
        }
    })

    generateNewBlock()
}

function generateNewBlock(){

    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock('top', 1)
    }, duration)

    const blockArray = Object.entries(BLOCKS);  //블럭 타입의 개수 저장
    const randomIndex = Math.floor(Math.random()*blockArray.length)
    movingItem.type = blockArray[randomIndex][0]
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem};
    renderBlocks()
}



function checkEmpty(target){
    if(!target || target.classList.contains("seized")){ 
        //타겟이seized라는 클래스를 가지고 있으면?true라 빈값이 아니다
        return false;
    }
    return true;
}
function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
}

function changeDirection(){
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks()   
}

function dropBlock(){
    clearInterval(downInterval); // 현재 진행중인 인터벌을 꺼두기
    downInterval = setInterval(()=>{
        moveBlock("top", 1)
    }, 10)
}

function showGameoverText(){
    gameText.style.display = "flex"
}
//event handling
document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 39:    //키 코드를 콘솔로그에서 확인하고 쓴것
            moveBlock("left", 1);
            break;

        case 37:
            moveBlock("left", -1);
            break;

        case 40:
            moveBlock("top", 1);
            break;

        case 38:
            changeDirection();
            break;

        case 32:
            dropBlock();
            break;
        
        default:
            break;
    }
})

restartButton.addEventListener("click", () => {
    playground.innerHTML = "";
    gameText.style.display = "none"
    init()
})