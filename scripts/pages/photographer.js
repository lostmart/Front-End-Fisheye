//Mettre le code JavaScript lié à la page photographer.html
import getData from '../factories/getData.js'
import mediaFactory from '../factories/media.js'
import photographerFactory from '../factories/photographer.js'
import {
	getImage,
	textBlock,
	getContElemCont,
} from '../factories/createDomElems.js'
/* create photographer based in photographer class  */
import Photographer from '../classes/photographerClass.js'
/* create media array of objects based in media class  */
import Photo from '../classes/mediaClass.js'

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
const urlParams = new URLSearchParams(window.location.search)
const usersId = urlParams.get('id')

/* return selected photographer */
function selectedPhotographer(photographers) {
	return photographers.find((e) => e.id == usersId)
}

async function init() {
	// Récupère les datas des photographes et media
	const newData = new getData(url)
	const { media, photographers } = await newData.brigMeData()

	/*  PHOTOGRAPHER CONSTRUCT */
	const photographerModel = photographerFactory(
		new Photographer(selectedPhotographer(photographers))
	)
	photographerModel.singlePageHeader(photographerModel, mainCont)

	/*  PHOTO ARRAY CONSTRUCT    */
	/*  creates an object with an array of all the needed photos
	and three useful methods                             */
	const photoModel = mediaFactory(media, usersId)
	photoModel.modelPhotosArray.forEach((photo) => populateMediaScroll(photo))

	// populateMediaScroll(photoModel.modelPhotosArray)
	//const newdata = new MediaData(media[0])
	//console.log(newdata)
}

function populateMediaScroll(selectedPic) {
	/* check this is not a video */
	if (selectedPic.image) {
		const photographMedia = document.querySelector('.photograph-media')
		const photographHeader__content = getContElemCont(
			'article',
			'photograph-media__card'
		)
		const link = document.createElement('a')
		link.setAttribute('href', 'javascript:void(0)')
		link.setAttribute('onclick', 'displayGallery()')

		const photographMedia__imgCont = getContElemCont(
			'div',
			'photograph-media__imgCont'
		)
		const imgUrl = `assets/images/Mimi/${selectedPic.image}`
		const img = getImage(selectedPic.title, imgUrl)

		photographMedia__imgCont.appendChild(img)
		link.appendChild(photographMedia__imgCont)

		const photoMedia__text = getContElemCont('div', 'photo-media__text')
		photoMedia__text.appendChild(textBlock('h2', selectedPic.title))
		const div = document.createElement('div')
		div.appendChild(textBlock('span', selectedPic.likes))
		photoMedia__text.appendChild(div)
		div.appendChild(getImage('likes', './assets/icons/heart-red.svg'))
		photoMedia__text.appendChild(div)
		link.appendChild(photoMedia__text)
		photographHeader__content.appendChild(link)
		photographMedia.appendChild(photographHeader__content)

		console.log(photographHeader__content)
	}
}

init()
