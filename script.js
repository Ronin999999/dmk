
let mines = [];
let gameStarted = false;
let soundOn = true;
const mineCount = 3;

function toggleSound() {
    soundOn = !soundOn;
    document.querySelector('.sound-btn').textContent = soundOn ? '🔊' : '🔇';
}

function startGame() {
    gameStarted = true;
    mines = [];
    document.getElementById('grid').innerHTML = '';
    document.getElementById('maxWin').textContent = "0 ₽";
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.onclick = () => revealCell(cell);
        document.getElementById('grid').appendChild(cell);
    }
    // Random mines
    while (mines.length < mineCount) {
        const r = Math.floor(Math.random() * 25);
        if (!mines.includes(r)) mines.push(r);
    }
}

function revealCell(cell) {
    if (!gameStarted || cell.classList.contains('revealed')) return;
    const index = parseInt(cell.dataset.index);
    cell.classList.add('revealed');
    if (mines.includes(index)) {
        cell.textContent = '💣';
        cell.classList.add('mine');
        gameStarted = false;
        revealAllMines();
        alert("Вы проиграли!");
    } else {
        cell.textContent = '⭐';
        updateWin();
    }
}

function revealAllMines() {
    document.querySelectorAll('.cell').forEach(cell => {
        const index = parseInt(cell.dataset.index);
        if (mines.includes(index)) {
            cell.textContent = '💣';
            cell.classList.add('mine');
        }
    });
}

function updateWin() {
    const revealedStars = document.querySelectorAll('.cell.revealed:not(.mine)').length;
    const bet = parseInt(document.getElementById('bet').value);
    const win = Math.floor(bet * (1 + revealedStars * 0.5));
    document.getElementById('maxWin').textContent = win + " ₽";
}
