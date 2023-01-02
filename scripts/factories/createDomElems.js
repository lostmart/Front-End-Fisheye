let showCarousel = false
let carousel = null
let mediaIndx = 0
let noOfElements = null

// create an image
// first arg: name(alt text) - second: image source(url)
export function getImage(name, picture) {
	const img = document.createElement('img')
	img.setAttribute('src', picture)
	img.setAttribute('alt', name)
	return img
}

// creates a block of text with the element passed as string and its content
export function textBlock(type, content) {
	const textBlock = document.createElement(type)
	textBlock.textContent = content
	return textBlock
}

// creates a container element with a class in it
export function getContElemCont(elemTyp, className) {
	const elem = document.createElement(elemTyp)
	elem.classList.add(className)
	return elem
}

// creates a card container
export function photoCard(selectedPic, indx) {
	const { image } = selectedPic

	const photographHeader__content = getContElemCont(
		'article',
		'photograph-media__card'
	)

	const photographMedia__imgCont = getContElemCont(
		'div',
		'photograph-media__imgCont'
	)

	createMediaUrl(selectedPic, image, indx, photographMedia__imgCont, false)
	// link.appendChild()

	const photoMedia__text = getContElemCont('div', 'photo-media__text')
	photoMedia__text.appendChild(textBlock('h2', selectedPic.title))
	const div = document.createElement('div')
	div.appendChild(textBlock('span', selectedPic.likes))
	photoMedia__text.appendChild(div)

	div.appendChild(getImage('likes', './assets/icons/heart-red.svg'))
	photoMedia__text.appendChild(div)

	photographHeader__content.appendChild(photographMedia__imgCont)
	photographHeader__content.appendChild(photoMedia__text)

	// link.appendChild(photographHeader__content)

	console.log(photographHeader__content)
	return photographHeader__content
}

// creates carousel

export function createCarousel(elements) {
	noOfElements = elements.length
	const full_screen_media = getContElemCont('div', 'full_screen_media')
	const full_screen_media__carousel = getContElemCont(
		'div',
		'full_screen_media__carousel'
	)
	const full_screen_media__carouselInner = getContElemCont(
		'div',
		'full_screen_media__carousel-inner'
	)
	// console.log(noOfElements)
	elements.forEach((pic, i) => {
		const { image, title } = pic
		const carouselItem = getContElemCont('div', 'carousel-item')
		const carouselItemReady = createMediaUrl(
			pic,
			image,
			i,
			carouselItem,
			true,
			title
		)

		// console.log(carouselItemReady)
		full_screen_media__carouselInner.appendChild(carouselItemReady)
	})

	const closeBtn = getContElemCont('button', 'full_screen_media__btn')
	closeBtn.classList.add('full_screen_media__btn-close')
	closeBtn.setAttribute('aria-label', 'close')
	closeBtn.setAttribute('tabindex', '1')
	const closeBtnImg = getImage('close carousel', './assets/icons/close-red.svg')
	closeBtn.addEventListener('click', () => toggleCarousel())

	const leftLink = getContElemCont('a', 'full_screen_media__btn')
	const leftArrow = getImage('previous arrow', './assets/icons/arrow-red.svg')
	leftLink.classList.add('full_screen_media__btn-left')
	leftLink.setAttribute('aria-label', 'previous image')
	leftLink.setAttribute('tabindex', '2')
	leftLink.appendChild(leftArrow)
	leftLink.addEventListener('click', () => {
		changeActImg('left')
	})
	leftLink.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			changeActImg('left')
		}
	})

	const rightLink = getContElemCont('a', 'full_screen_media__btn')
	const rightArrow = getImage('next arrow', './assets/icons/arrow-red.svg')
	rightLink.setAttribute('aria-label', 'next image')
	rightLink.setAttribute('tabindex', '3')
	rightLink.appendChild(rightArrow)
	rightLink.addEventListener('click', () => {
		changeActImg('right')
	})
	rightLink.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			changeActImg('right')
		}
	})
	full_screen_media__carouselInner.appendChild(leftLink)
	full_screen_media__carouselInner.appendChild(rightLink)

	closeBtn.appendChild(closeBtnImg)
	full_screen_media__carousel.appendChild(full_screen_media__carouselInner)
	full_screen_media__carousel.appendChild(closeBtn)
	full_screen_media.appendChild(full_screen_media__carousel)
	carousel = full_screen_media

	return full_screen_media
}

export function toggleCarousel() {
	if (!showCarousel) {
		setActiveItem()
		carousel.style.display = 'flex'
		showCarousel = true
	} else {
		carousel.style.display = 'none'
		showCarousel = false
		clearActiveItem()
	}
}

function setActiveItem() {
	const selectedItem = document.querySelectorAll('.carousel-item')[mediaIndx]
	console.log(selectedItem)
	selectedItem.style.display = 'flex'
}

function clearActiveItem() {
	const selectedItem = document.querySelectorAll('.carousel-item')[mediaIndx]
	selectedItem.style.display = 'none'
}

// creates a media holder an image or video
function createMediaUrl(
	selectedPic,
	image,
	indx,
	element,
	carouselCard,
	title
) {
	if (image) {
		const imgUrl = `assets/${selectedPic.folderName()}${selectedPic.image}`
		const img = getImage(selectedPic.title, imgUrl)
		img.dataset.indxNo = indx
		const carouselImgCont = getContElemCont(
			'div',
			'carousel-item__imgContainer'
		)
		const link = document.createElement('a')
		link.setAttribute('href', 'javascript:void(0)')

		link.addEventListener('click', (e) => {
			mediaIndx = e.target.getAttribute('data-indx-no')
			toggleCarousel()
		})

		link.appendChild(img)
		carouselImgCont.appendChild(link)
		const parag = document.createElement('p')
		parag.textContent = title

		element.appendChild(carouselImgCont)
		element.appendChild(parag)
		// console.log(element)

		return element
	} else {
		if (carouselCard) {
			const videoUrl = `assets/${selectedPic.folderName()}${selectedPic.video}`
			const video = document.createElement('video')
			video.setAttribute('width', '1080')
			video.setAttribute('height', '607')
			video.setAttribute('controls', true)
			const source = document.createElement('source')
			source.setAttribute('type', 'video/mp4')
			source.src = videoUrl
			video.appendChild(source)
			element.appendChild(video)
		} else {
			const imgUrl = selectedPic.getThumbnail()
			const img = getImage(selectedPic.title, imgUrl)
			const link = document.createElement('a')
			link.setAttribute('href', 'javascript:void(0)')

			link.addEventListener('click', (e) => {
				mediaIndx = e.target.getAttribute('data-indx-no')
				toggleCarousel()
			})

			img.dataset.indxNo = indx
			const carouselImgCont = getContElemCont(
				'div',
				'carousel-item__imgContainer'
			)
			link.appendChild(img)
			carouselImgCont.appendChild(link)
			const parag = document.createElement('p')
			parag.textContent = title

			element.appendChild(carouselImgCont)
			element.appendChild(parag)
		}

		return element
	}
}

export function changeActImg(direction) {
	if (direction === 'right' && showCarousel) {
		if (mediaIndx == noOfElements - 1) {
			clearActiveItem()
			mediaIndx = 0
			setActiveItem()
		} else {
			clearActiveItem()
			mediaIndx++
			setActiveItem()
		}
	}
	if (direction === 'left' && showCarousel) {
		if (mediaIndx == 0) {
			console.log('desde cero !!')
			clearActiveItem()
			mediaIndx = noOfElements - 1
			setActiveItem()
		} else {
			clearActiveItem()
			mediaIndx--
			setActiveItem()
		}
	}
}
