//Mettre le code JavaScript lié à la page photographer.html
import getData from '../factories/getData.js'
import photographerFactory from '../factories/photographer.js'
import {
	getImage,
	textBlock,
	getContElemCont,
} from '../factories/createDomElems.js'
/* create photographer based in class  */
import Photographer from '../factories/photographerClass.js'

const url =
	'https://lostmart.github.io/Front-End-Fisheye/data/photographers.json'

// DOM slements
const mainCont = document.querySelector('#main')
const toggleBtn = document.querySelectorAll('li')[0]
const listUl = document.querySelectorAll('ul')[0]
const bodyClick = document.querySelector('body')

let openList = false
/*
agregar luego
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
*/

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

async function init() {
	// Récupère les datas des photographes et media
	const newData = new getData(url)
	const { media, photographers } = await newData.brigMeData()
	// console.log(media, photographers)
	rederDataDom(photographers)
}

function rederDataDom(photographers) {
	// creation
	const photographerModel = photographerFactory(
		new Photographer(photographers[0])
	)
	const picture = `assets/photographers/${photographerModel.portrait}`
	const photographHeader = getContElemCont('section', 'photograph-header')
	const photographHeader__content = getContElemCont(
		'div',
		'photograph-header__content'
	)
	const photographHeader__title = textBlock('h2', photographerModel.name)
	const contactBtn = getContElemCont('button', 'contact_button')
	const photographHeader__location = textBlock('p', photographerModel.place)
	const photographHeader__tag = textBlock('p', photographerModel.tagline)
	const photographHeader__imgCont = getContElemCont(
		'div',
		'photograph-header__imgCont'
	)
	const photographerHeader_img = getImage(photographerModel.name, picture)

	const photographHeader__info = getContElemCont(
		'div',
		'photograph-header__info'
	)
	const photographHeader__likes = getContElemCont(
		'span',
		'photograph-header__likes'
	)
	const heartIcon = getImage('likes', './assets/icons/heart.svg')
	const photographMedia = getContElemCont('div', 'photograph-media')
	photographMedia.innerHTML = '<h2>La medialuna deliciosa!</h2>'

	// preparation
	contactBtn.textContent = 'Contactez-moi'
	contactBtn.setAttribute('onclick', 'displayModal()')
	photographHeader__location.classList.add('photograph-header__location')
	photographHeader__tag.classList.add('photograph-header__tag')
	photographHeader__info.classList.add('photograph-header__info')

	const spanLikes = document.createElement('span')
	spanLikes.innerHTML = '297&nbsp;081'
	photographHeader__likes.appendChild(spanLikes)
	photographHeader__likes.appendChild(heartIcon)
	const spanPrice = document.createElement('span')
	spanPrice.textContent = photographerModel.price

	// append
	photographHeader__content.appendChild(photographHeader__title)
	photographHeader__content.appendChild(photographHeader__location)
	photographHeader__content.appendChild(photographHeader__tag)
	photographHeader__imgCont.appendChild(photographerHeader_img)
	photographHeader.appendChild(photographHeader__content)
	photographHeader.appendChild(contactBtn)
	photographHeader.appendChild(photographHeader__imgCont)
	photographHeader__info.appendChild(photographHeader__likes)
	photographHeader__info.appendChild(spanPrice)
	photographHeader.appendChild(photographHeader__info)
	mainCont.appendChild(photographHeader)
	mainCont.appendChild(photographMedia)
}

init()
