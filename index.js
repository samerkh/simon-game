const buttons = [
    { color: 'blue', sound: new Audio('./sounds/blue.mp3') },
    { color: 'green', sound: new Audio('./sounds/green.mp3') },
    { color: 'red', sound: new Audio('./sounds/red.mp3') },
    { color: 'yellow', sound: new Audio('./sounds/yellow.mp3') }
];
const wrongSound = new Audio('./sounds/wrong.mp3');
let soundSequence = [];
let level = 1;
let sequenceIndex = 0;
let started = false;

for (let i = 0; i < 4; i++) {
    const btn = $('.btn').eq(i);
    btn.click(function () {
        const btnColor = btn.attr('class').split(/\s+/)[1];
        buttons.find(item => item.color == btnColor).sound.play();
        animateButton(btn);
        if (validate(btnColor, sequenceIndex)) {
            sequenceIndex++;
            if (sequenceIndex == soundSequence.length) {
                LevelUp();
            }
        }
        else {
            GameOver();
        }

    });
}

$(document).keypress(function (event) {
    if (!started) {
        started = true;
        $('#level-title').text(`Level ${level}`)
        setTimeout(() => {
            generateSequence();
        }, 1000);
    }
})

function animateButton(btn) {
    btn.addClass('pressed');
    setTimeout(function () {
        btn.removeClass('pressed');
    }, 100);
}

function GameOver() {
    started = false;

    $('body').addClass('game-over');
    setTimeout(function () {
        $('body').removeClass('game-over');
    }, 100);

    wrongSound.play();
    soundSequence = [];
    sequenceIndex = 0;
    level = 1;
    $('#level-title').text(`Press A Key to Start`)

}

function LevelUp() {
    level++;
    $('#level-title').text(`Level ${level}`)
    sequenceIndex = 0;
    setTimeout(() => {
        generateSequence();
    }, 1000);
}

function validate(btnColor, index) {
    if (soundSequence.length > 0) {
        if (btnColor != soundSequence[index].color) {
            return false;
        }
        return true;
    }
}

function generateSequence() {
    let random = Math.floor(Math.random() * 4);
    const randomButton = buttons[random];

    soundSequence.push(randomButton);
    playSequence();
}

function playSequence() {
    soundSequence.map((item, i) => {
        setTimeout(() => {
            const btn = $(`.${item.color}`);
            item.sound.play();
            btn.fadeIn(100).fadeOut(100).fadeIn(100);
        }, i * 500);
    })
}


