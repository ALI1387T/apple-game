let canvas = document.querySelector("#canvas")
let appleImage = document.querySelector("#apple")
let score = document.querySelector("#score")
let restartKey = document.querySelector("#restart")

canvas.width = 548
canvas.height = 483
let c = canvas.getContext("2d");
let gameLevel = 2
setInterval(() => { if (gameLevel != 0 && gameLevel <= 9 && snake.vx != 0 || snake.vy != 0) { gameLevel += 0.1 } }, 1000)
let scoreValue = 0

class Snake {
    constructor() {
        this.y = 33
        this.x = 33
        this.vx = 0
        this.vy = 0
        this.width = 30
        this.height = 30
        this.draw()
    }
    draw() {
        c.beginPath()
        c.rect(this.x, this.y, this.width, this.height)
        c.fillStyle = "red"
        c.fill()
    }
    update() {
        if (this.x + this.width + gameLevel > 548 || this.x - gameLevel < 0) {
            gameLevel = 0
            this.vx = 0
            gameOver()
            restartKey.removeAttribute("hidden", "")
        } else if (this.y + this.height + gameLevel > 483 || this.y - gameLevel < 0) {
            gameLevel = 0
            this.vy = 0
            gameOver()
            restartKey.removeAttribute("hidden", "")
        }
        this.y += this.vy
        this.x += this.vx
        this.draw()
    }
}
class Apple {
    constructor() {
        this.dx = random(10, 520) - 20
        this.dy = random(10, 450) - 20
        this.draw()
    }
    draw() {
        c.drawImage(appleImage, this.dx, this.dy);
    }
}
let apple = []
for (let i = 0; i < 2; i++) {
    apple.push(new Apple)
}
let snake = new Snake()
function animation() {
    c.clearRect(0, 0, innerWidth, innerHeight)
    apple.forEach(apples => {
        apples.draw()
        let appleEat = Math.sqrt(Math.pow(snake.x - apples.dx, 2) + Math.pow(snake.y - apples.dy, 2))
        if (appleEat <= 30) {
            scoreValue++
            score.innerHTML = scoreValue
            apples.dx = random(10, 530)
            apples.dy = random(10, 460)
        }
    });
    // function convertAndHeightAndWidth(a, b) {
    //     if (a == w) {
    //         snake.width -= gameLevel
    //     } else if (a == h) {
    //         snake.height -= gameLevel
    //     } if (b == w) {
    //         snake.width += gameLevel
    //     } else if (b == h) {
    //         snake.height += gameLevel
    //     }
    // }
    snake.update()
    requestAnimationFrame(animation)
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

addEventListener("keydown", e => {
    if (e.key == "ArrowUp") {
        snake.vy = -gameLevel
        snake.vx = 0
    } else if (e.key == "ArrowDown") {
        snake.vy = gameLevel
        snake.vx = 0
    } else if (e.key == "ArrowRight") {
        snake.vy = 0
        snake.vx = gameLevel
    } else if (e.key == "ArrowLeft") {
        snake.vy = 0
        snake.vx = -gameLevel
    }
})
function gameOver() {

}
restartKey.addEventListener("click", () => {
    score.innerHTML = "0"
    gameLevel = 2
    snake.x = 33
    snake.y = 33
    apple.forEach(apples => {
        apples.dx = random(10, 530)
        apples.dy = random(10, 460)
    })
    restartKey.setAttribute("hidden", "")
})
animation()