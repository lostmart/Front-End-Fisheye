//Mettre le code JavaScript lié à la page photographer.html
import getData from "../factories/getData.js"
import mediaFactory from "../factories/media.js"
import photographerFactory from "../factories/photographer.js"
import {
	getImage,
	textBlock,
	getContElemCont,
	photoCard,
} from "../factories/createDomElems.js"
/* create photographer based in photographer class  */
import Photographer from "../classes/photographerClass.js"

const url =
	"https://lostmart.github.io/Front-End-Fisheye/data/photographers.json"

// DOM slements
const mainCont = document.querySelector("#main")
const bodyClick = document.querySelector("body")

let openList = false
let opencarousel = false
let carousel
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

bodyClick.addEventListener("click", () => {
	if (openList === true) {
		closeList()
	}
})

function closeList() {
	listUl.classList.remove("open-list")
	toggleBtn.childNodes[1].classList.remove("open-item")
	toggleBtn.style.borderBottomColor = "transparent"
	listUl.childNodes[3].style.borderBottomColor = "transparent"
	openList = false
}

/* data manipulation */
const urlParams = new URLSearchParams(window.location.search)
const usersId = urlParams.get("id")

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
	const photographMedia = document.querySelector(".photograph-media")
	const photoMedia_thumbnails = getContElemCont(
		"div",
		"photograph-media__thumbnails"
	)
	const photographMediaThumbTitle = getContElemCont(
		"div",
		"photograph-media__thumbTitle"
	)
	const span = textBlock("span", "Tirer par")
	const ul = document.createElement("ul")
	const list_one = document.createElement("li")
	const list_img = getImage("open indicator", "./assets/icons/chev-down.svg")

	list_one.textContent = "Popularité"
	list_one.appendChild(list_img)

	const list_two = textBlock("li", "Date")
	const list_three = textBlock("li", "Titre")

	ul.appendChild(list_one)
	ul.appendChild(list_two)
	ul.appendChild(list_three)

	photographMediaThumbTitle.appendChild(span)
	photographMediaThumbTitle.appendChild(ul)

	const photoMediaScroller = getContElemCont(
		"div",
		"photograph-media__scroller"
	)

	photoModel.modelPhotosArray.forEach((photo, indx) => {
		const link = photoCard(photo, indx)
		photoMediaScroller.appendChild(link)
		// console.log(typeof link);
	})

	photoMedia_thumbnails.appendChild(photographMediaThumbTitle)
	photoMedia_thumbnails.appendChild(photoMediaScroller)
	photographMedia.appendChild(photoMedia_thumbnails)

	createCarousel()
	carousel = document.querySelector(".full_screen_media")
	console.log(carousel)
	carousel.style.display = "flex"

	const toggleBtn = document.querySelectorAll("li")[0]
	const listUl = document.querySelector("ul")

	toggleBtn.addEventListener("click", (e) => {
		if (!openList) {
			e.stopPropagation()
			listUl.classList.add("open-list")
			toggleBtn.childNodes[1].classList.add("open-item")
			toggleBtn.style.borderBottomColor = "white"
			listUl.childNodes[3].style.borderBottomColor = "white"
			openList = true
		} else {
			closeList()
		}
	})

	// populateMediaScroll(photoModel.modelPhotosArray)
	//const newdata = new MediaData(media[0])
	//console.log(newdata)
}

function populateMediaScroll(selectedPic) {
	/* check this is not a video */

	photographMedia__imgCont.appendChild(img)
	link.appendChild(photographMedia__imgCont)

	link.appendChild(photoMedia__text)
	photographHeader__content.appendChild(link)
	photographMedia.appendChild(photographHeader__content)

	console.log(photographHeader__content)
}

function createCarousel() {
	const full_screen_media = getContElemCont("div", "full_screen_media")
	const full_screen_media__carousel = getContElemCont(
		"div",
		"full_screen_media__carousel"
	)
	const full_screen_media__carouselInner = getContElemCont(
		"div",
		"full_screen_media__carousel-inner"
	)
	const carouselItem = getContElemCont("div", "carousel-item")
	const carouselImg = getImage(
		"teto",
		"./assets/images/Mimi/Animals_Rainbow.jpg"
	)
	const closeBtn = getContElemCont("button", "full_screen_media__btn")
	closeBtn.classList.add("full_screen_media__btn-close")
	closeBtn.setAttribute("aria-label", "close")
	const closeBtnImg = getImage("close carousel", "./assets/icons/close-red.svg")

	const leftLink = getContElemCont("a", "full_screen_media__btn")
	leftLink.classList.add("full_screen_media__btn-left")
	leftLink.setAttribute("aria-label", "previous image")

	const rightLink = getContElemCont("a", "full_screen_media__btn")
	rightLink.setAttribute("aria-label", "next image")

	closeBtn.appendChild(closeBtnImg)
	carouselItem.appendChild(carouselImg)
	full_screen_media__carouselInner.appendChild(carouselItem)
	full_screen_media__carousel.appendChild(full_screen_media__carouselInner)
	full_screen_media__carousel.appendChild(closeBtn)
	full_screen_media__carousel.appendChild(leftLink)
	full_screen_media__carousel.appendChild(rightLink)
	full_screen_media.appendChild(full_screen_media__carousel)
	console.log(full_screen_media__carousel)
	return full_screen_media
}

init()
