//Mettre le code JavaScript lié à la page photographer.html
import getData from '../factories/getData.js'
const url =
	'https://lostmart.github.io/Front-End-Fisheye/data/photographers.json'

// DOM slements
const toggleBtn = document.querySelectorAll('li')[0]
const listUl = document.querySelectorAll('ul')[0]
const bodyClick = document.querySelector('body')

let openList = false
toggleBtn.addEventListener('click', (e) => {
	if (!openList) {
		e.stopPropagation()
		listUl.classList.add('open-list')
		toggleBtn.childNodes[1].classList.add('open-item')
		toggleBtn.style.borderBottomColor = 'white'
		listUl.childNodes[3].style.borderBottomColor = 'white'
		openList = true
	} else {
		closeList()
	}
})

bodyClick.addEventListener('click', () => {
	if (openList === true) {
		closeList()
	}
})

function closeList() {
	listUl.classList.remove('open-list')
	toggleBtn.childNodes[1].classList.remove('open-item')
	toggleBtn.style.borderBottomColor = 'transparent'
	listUl.childNodes[3].style.borderBottomColor = 'transparent'
	openList = false
}

/* data manipulation */
const newData = new getData(url)
const data = await newData.brigMeData()
console.log(data.media)

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await newBroughtData
	displayData(photographers)
	console.log(photographers)
}
