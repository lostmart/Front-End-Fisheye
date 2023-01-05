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
	

	// arrange by popularity
	list_one.addEventListener('click', (e) => {
		if (!openList) {
			toggleList(e, ul, list_one, list_two, list_three, 'list-one')
		} else {
			closeList(ul)
			let photograph_media__scroller = document.querySelector(
				'.photograph-media__scroller'
			)
			photograph_media__scroller.textContent = ''
			document.querySelector('.full_screen_media').remove()
			photoModel.arrangeByPopularity()
			arranged = true

			list_one.appendChild(list_img)
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
		}
	})

	list_one.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			if (!openList) {
				toggleList(e, ul, list_one, list_two, list_three, 'list-one')
			} else {
				closeList(ul)
				let photograph_media__scroller = document.querySelector(
					'.photograph-media__scroller'
				)
				photograph_media__scroller.textContent = ''
				document.querySelector('.full_screen_media').remove()
				photoModel.arrangeByPopularity()
				arranged = true

				list_one.appendChild(list_img)
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
			}
		}
	})

	list_one.addEventListener('keydown', (e) => {
		if (e.key === 'Tab' && !openList) {
			toggleList(e, ul, list_one, list_two, list_three, 'list-one')
		}
	})

	list_two.addEventListener('keydown', (e) => {
		if (e.key === 'Tab' && !openList) {
			toggleList(e, ul, list_one, list_two, list_three, 'list-one')
		}
	})

	list_three.addEventListener('keydown', (e) => {
		if (e.key === 'Tab' && !openList) {
			toggleList(e, ul, list_one, list_two, list_three, 'list-one')
		}
	})

	// arrange by date
	list_two.addEventListener('click', (e) => {
		e.stopPropagation()
		toggleList(e, ul, list_one, list_two, list_three, 'list-three')

		ul.removeChild(list_one)
		ul.removeChild(list_three)
		ul.removeChild(list_two)

		list_two.appendChild(list_img)
		ul.appendChild(list_two)
		ul.appendChild(list_three)
		ul.appendChild(list_one)

		// method to arrange media array
		photoModel.arrangeByDates()

		const photograph_media__scroller = document.querySelector(
			'.photograph-media__scroller'
		)
		photograph_media__scroller.textContent = ''
		document.querySelector('.full_screen_media').remove()

		photoModel.modelPhotosArray.forEach((photo, indx) => {
			const link = photoCard(photo, indx)
			photoMediaScroller.appendChild(link)
			// console.log(link)
		})
		mainCont.appendChild(createCarousel(photoModel.modelPhotosArray))
	})

	list_two.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			e.stopPropagation()
			toggleList(e, ul, list_one, list_two, list_three, 'list-three')

			ul.removeChild(list_one)
			ul.removeChild(list_three)
			ul.removeChild(list_two)

			list_two.appendChild(list_img)
			ul.appendChild(list_two)
			ul.appendChild(list_three)
			ul.appendChild(list_one)

			// method to arrange media array
			photoModel.arrangeByDates()

			const photograph_media__scroller = document.querySelector(
				'.photograph-media__scroller'
			)
			photograph_media__scroller.textContent = ''
			document.querySelector('.full_screen_media').remove()

			photoModel.modelPhotosArray.forEach((photo, indx) => {
				const link = photoCard(photo, indx)
				photoMediaScroller.appendChild(link)
				// console.log(link)
			})
			mainCont.appendChild(createCarousel(photoModel.modelPhotosArray))
		}
	})

	// arrange by title
	list_three.addEventListener('click', (e) => {
		e.stopPropagation()
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
		mainCont.appendChild(createCarousel(photoModel.modelPhotosArray))
	})

	list_three.addEventListener('keydown', (e) => {
		e.stopPropagation()
		if (e.key === 'Enter') {
			e.stopPropagation()
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
			mainCont.appendChild(createCarousel(photoModel.modelPhotosArray))
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
	}
}

function closeList(ulList) {
	ulList.classList.remove('open-list')
	ulList.firstChild.style.borderBottomColor = 'transparent'
	ulList.children[1].style.borderBottomColor = 'transparent'
	ulList.children[2].style.borderBottomColor = 'transparent'
	openList = false
}

init()
