//Mettre le code JavaScript lié à la page photographer.html
import getData from '../factories/getData.js'
import mediaFactory from '../factories/media.js'
import photographerFactory from '../factories/photographer.js'
import {
	getImage,
	textBlock,
	getContElemCont,
	photoCard,
	createCarousel,
} from '../factories/createDomElems.js'
/* create photographer based in photographer class  */
import Photographer from '../classes/photographerClass.js'

const url =
	'https://lostmart.github.io/Front-End-Fisheye/data/photographers.json'

// DOM slements
const mainCont = document.querySelector('#main')
const bodyClick = document.querySelector('body')

let openList = false

/*
bodyClick.addEventListener('click', () => {
	if (openList === true) {
		closeList()
	}
})
*/

function closeList(ulList) {
	ulList.classList.remove('open-list')
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
	and three useful methods     */
	const photoModel = mediaFactory(media, usersId)
	console.log(photoModel)
	const photographMedia = document.querySelector('.photograph-media')
	const photoMedia_thumbnails = getContElemCont(
		'div',
		'photograph-media__thumbnails'
	)
	const photographMediaThumbTitle = getContElemCont(
		'div',
		'photograph-media__thumbTitle'
	)
	const span = textBlock('span', 'Tirer par')
	const ul = document.createElement('ul')
	const list_one = document.createElement('li')
	const list_img = getImage('open indicator', './assets/icons/chev-down.svg')

	list_one.textContent = 'Popularité'
	list_one.appendChild(list_img)
	const list_two = textBlock('li', 'Date')
	const list_three = textBlock('li', 'Titre')

	list_one.addEventListener('click', (e) => {
		if (!openList) {
			e.stopPropagation()
			ul.classList.add('open-list')
			list_one.style.borderBottomColor = 'white'
			list_two.style.borderBottomColor = 'white'
			openList = true
		} else {
			closeList(ul)
			list_one.style.borderBottomColor = 'transparent'
		}
	})

	list_two.addEventListener('click', (e) => {
		e.stopPropagation()
		closeList(ul)
		list_one.style.borderBottomColor = 'transparent'
		photoModel.arrangeByDates()
		console.log('hello !:!!')
	})

	list_three.addEventListener('click', (e) => {
		e.stopPropagation()
		closeList(ul)
		list_one.style.borderBottomColor = 'transparent'
		photoModel.arrangeByTitles()
	})

	ul.appendChild(list_one)
	ul.appendChild(list_two)
	ul.appendChild(list_three)

	photographMediaThumbTitle.appendChild(span)
	photographMediaThumbTitle.appendChild(ul)

	const photoMediaScroller = getContElemCont(
		'div',
		'photograph-media__scroller'
	)

	photoModel.modelPhotosArray.forEach((photo, indx) => {
		const link = photoCard(photo, indx)
		photoMediaScroller.appendChild(link)
		// console.log(link)
	})

	photoMedia_thumbnails.appendChild(photographMediaThumbTitle)
	photoMedia_thumbnails.appendChild(photoMediaScroller)
	photographMedia.appendChild(photoMedia_thumbnails)

	mainCont.appendChild(createCarousel(photoModel.modelPhotosArray))
}

init()
