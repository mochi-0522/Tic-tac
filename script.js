const player = [
{   name: "player1",
    mark: "◯",
    script:"プレイヤー1(マル)のターンです"
},
{   name: "player2",
    mark:"×",
    script:"プレイヤー2(バツ)のターンです"
}]

const board = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],];
let count = 0;
let playerSelector = 0;
let gameActive = true;
const cell = document.querySelectorAll('.cell');
const playerDisplay = document.getElementById('player');
const switchPlayer = (i) => {
    playerDisplay.textContent = "";
    if(i === 0){
        i = 1;
        playerDisplay.textContent = player[1].script;
    }else{
        i = 0;
        playerDisplay.textContent = player[0].script;
    }
    return i;

}

cell.forEach(cell => {
    
    cell.addEventListener('click', () =>{
        if(cell.childNodes.length > 1){
            console.log('not empty');
        }else{
            if(gameActive){
                const h1 = document.createElement('h1');
                h1.innerHTML = player[playerSelector].mark;
                h1.classList.add('mark');
                cell.appendChild(h1);
                board[playerSelector][cell.id] += 1;
                switchPlayer(playerSelector);
                playerSelector = switchPlayer(playerSelector);
                checkWinner();
                count++;
                if(count === 9 && gameActive === true){
                    alert('引き分けです');
                    playerDisplay.textContent = "引き分けです";
                    gameActive = false;
                }
            }
        }
    });
});

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];

    for (let i = 0; i < 2; i++) {
        for (const combination of winningCombinations) {
            if (
                board[i][combination[0]] === 1 &&
                board[i][combination[1]] === 1 &&
                board[i][combination[2]] === 1
            ) {
                alert('プレイヤー' + (i + 1) + 'のかちです！ ');
                playerDisplay.textContent = "  プレイヤー" + (i + 1) + "のかちです！";
                gameActive = false;
                return;
            }
        }
    }
}
