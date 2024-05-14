const btnStart = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.getElementById('time-list')
const remainingTime = document.getElementById('time')
const board = document.getElementById('board')
let time = 0
let score = 0

btnStart.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})

function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		gameOver()
	} else {
	let current = --time
	if (current < 10) {
		current = `0${current}`
	}
	setTime(current)
	}
}

function setTime(value) {
	remainingTime.innerHTML = `00:${value}`
}

function gameOver() {
	remainingTime.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Cчёт: <span class='primary'>${score}</span> </h1>`
}

function createRandomCircle() {
	const circle = document.createElement('div')
	const size = getRandomNumber(10, 60)
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`
	circle.style.background = getRandomColor()
	board.append(circle)
}

function getRandomNumber(min, max) {
	return Math.round (Math.random() * (max - min) + min)
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'; // Возможные символы в цвете
  let color = '#'; // Начальное значение цвета
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]; 
  }
  return color; 
}