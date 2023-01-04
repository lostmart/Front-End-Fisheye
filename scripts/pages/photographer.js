//Mettre le code JavaScript lié à la page photographer.html
import getData from '../factories/getData.js'
import mediaFactory from '../factories/media.js'
import photographerFactory from '../factories/photographer.js'
import { changeActImg, toggleCarousel } from '../factories/createDomElems.js'
import {
	getImage,
	textBlock,
	getContElemCont,
	photoCard,
	createCarousel,
	showCarousel,
} from '../factories/createDomElems.js'
/* create photographer based in photographer class  */
import Photographer from '../classes/photographerClass.js'

const url =
	'https://lostmart.github.io/Front-End-Fisheye/data/photographers.json'

// DOM slements
const mainCont = document.querySelector('#main')
const bodyClick = document.querySelector('body')
let arranged = false

let openList = false

bodyClick.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowRight') {
		console.log('running chnage img')
		changeActImg('right')
	}
	if (e.key === 'ArrowLeft') {
		changeActImg('left')
	}
	if (e.key === 'Escape') {
		if (showCarousel) {
			toggleCarousel()
		}
	}
})

/*
bodyClick.addEventListener('click', () => {
	if (openList === true) {
		closeList()
	}
})
*/

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
	const formTitle = document.querySelector('.modal__title')
	formTitle.textContent += photographerModel.name

	/*  PHOTO ARRAY CONSTRUCT    */
	/*  creates an object with an array of all the needed photos
	and three useful methods     */
	const photoModel = mediaFactory(media, usersId)
	// console.log(photoModel)
	const photographMedia = document.querySelector('.photograph-media')
	// run factory fn to populate gallery
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
	ul.classList.add('photograph-media__thumbTitleUl')
	const list_one = document.createElement('li')
	const list_img = getImage('open indicator', './assets/icons/chev-down.svg')

	list_one.textContent = 'Popularité'
	list_one.appendChild(list_img)
	list_one.setAttribute('tabindex', '0')
	const list_two = textBlock('li', 'Date')
	list_two.setAttribute('tabindex', '0')
	const list_three = textBlock('li', 'Titre')
	list_three.setAttribute('tabindex', '0')

	/*
	list_img.addEventListener('click', (e) => {
		toggleList(e, ul, list_one, list_two)
	})
	*/

	// arrange by popularity on UL ????
	ul.addEventListener('click', () => {
		let photograph_media__scroller = document.querySelector(
			'.photograph-media__scroller'
		)
		photograph_media__scroller.textContent = ''
		document.querySelector('.full_screen_media').remove()
		photoModel.arrangeByPopularity()
		arranged = true

		ul.appendChild(list_one)
		ul.appendChild(list_two)
		ul.appendChild(list_three)

		photoModel.modelPhotosArray.forEach((photo, indx) => {
			const link = photoCard(photo, indx)
			photoMediaScroller.appendChild(link)
			// console.log(link)
		})

		photoMedia_thumbnails.appendChild(photographMediaThumbTitle)
		photoMedia_thumbnails.appendChild(photoMediaScroller)
		photographMedia.appendChild(photoMedia_thumbnails)

		mainCont.appendChild(createCarousel(photoModel.modelPhotosArray))
	})

	list_one.addEventListener('click', (e) => {
		console.log(openList)
		toggleList(e, ul, list_one, list_two, list_three, 'list-one')
	})

	list_one.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			toggleList(e, ul, list_one, list_three, list_two, 'list-one')
		}
	})

	// arrange by date
	list_two.addEventListener('click', (e) => {
		e.stopPropagation()
		closeList(ul)
		list_one.style.borderBottomColor = 'transparent'
		let photograph_media__scroller = document.querySelector(
			'.photograph-media__scroller'
		)
		photograph_media__scroller.textContent = ''
		document.querySelector('.full_screen_media').remove()
		photoModel.arrangeByDates()
		// console.log('by date')
		photoModel.modelPhotosArray.forEach((photo, indx) => {
			const link = photoCard(photo, indx)
			photoMediaScroller.appendChild(link)
			// console.log(link)
		})

		photoMedia_thumbnails.appendChild(photographMediaThumbTitle)
		photoMedia_thumbnails.appendChild(photoMediaScroller)
		photographMedia.appendChild(photoMedia_thumbnails)

		mainCont.appendChild(createCarousel(photoModel.modelPhotosArray))
	})

	// arrange by title
	list_three.addEventListener('click', (e) => {
		e.stopPropagation()
		console.log(openList)
		toggleList(e, ul, list_one, list_two, list_three, 'list-three')
		console.log(openList)

		ul.removeChild(list_one)
		ul.removeChild(list_three)
		ul.removeChild(list_two)

		list_three.appendChild(list_img)
		ul.appendChild(list_three)
		ul.appendChild(list_two)
		ul.appendChild(list_one)

		// method to arrange media array
		photoModel.arrangeByTitles()

		const photograph_media__scroller = document.querySelector(
			'.photograph-media__scroller'
		)
		photograph_media__scroller.textContent = ''
		document.querySelector('.full_screen_media').remove()
		console.log(photoModel.modelPhotosArray)

		photoModel.modelPhotosArray.forEach((photo, indx) => {
			const link = photoCard(photo, indx)
			photoMediaScroller.appendChild(link)
			// console.log(link)
		})

		/*


		

		photoModel.modelPhotosArray.forEach((photo, indx) => {
			const link = photoCard(photo, indx)
			photoMediaScroller.appendChild(link)
			// console.log(link)
		})
		photoMedia_thumbnails.appendChild(photographMediaThumbTitle)
		photoMedia_thumbnails.appendChild(photoMediaScroller)
		photographMedia.appendChild(photoMedia_thumbnails)

		// const newCarousel = createCarousel(photoModel.modelPhotosArray)
		// console.log(newCarousel)

		*/
		mainCont.appendChild(createCarousel(photoModel.modelPhotosArray))
	})

	list_three.addEventListener('keydown', (e) => {
		e.stopPropagation()
		if (e.key === 'Enter') {
			toggleCarousel()

			toggleList(e, ul, list_one, list_two, list_three, 'list-three')
			console.log(openList)

			ul.removeChild(list_one)
			ul.removeChild(list_three)
			ul.removeChild(list_two)

			list_three.appendChild(list_img)
			ul.appendChild(list_three)
			ul.appendChild(list_two)
			ul.appendChild(list_one)

			// method to arrange media array
			photoModel.arrangeByTitles()

			const photograph_media__scroller = document.querySelector(
				'.photograph-media__scroller'
			)
			photograph_media__scroller.textContent = ''
			document.querySelector('.full_screen_media').remove()
			console.log(photoModel.modelPhotosArray)

			photoModel.modelPhotosArray.forEach((photo, indx) => {
				const link = photoCard(photo, indx)
				photoMediaScroller.appendChild(link)
				// console.log(link)
			})
		}
	})

	if (!arranged) {
		ul.appendChild(list_one)
		ul.appendChild(list_two)
		ul.appendChild(list_three)
	}

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

function toggleList(e, ul, list_one, list_two, list_three, active_li) {
	if (active_li === 'list-one') {
		list_one.style.borderBottomColor = 'white'
	}
	if (active_li === 'list-three') {
		list_three.style.borderBottomColor = 'white'
	}
	if (!openList) {
		e.stopPropagation()
		ul.classList.add('open-list')
		list_two.style.borderBottomColor = 'white'
		openList = true
	} else {
		closeList(ul)
		list_one.style.borderBottomColor = 'transparent'
		list_two.style.borderBottomColor = 'transparent'
		list_three.style.borderBottomColor = 'transparent'
	}
}

function closeList(ulList) {
	ulList.classList.remove('open-list')
	openList = false
}

init()
