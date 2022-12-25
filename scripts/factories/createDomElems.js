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

	const link = document.createElement('a')
	link.setAttribute('href', 'javascript:void(0)')

	const photographHeader__content = getContElemCont(
		'article',
		'photograph-media__card'
	)

	const photographMedia__imgCont = getContElemCont(
		'div',
		'photograph-media__imgCont'
	)
	if (image) {
		const imgUrl = `assets/${selectedPic.folderName()}${selectedPic.image}`
		const img = getImage(selectedPic.title, imgUrl)
		img.dataset.indxNo = indx
		photographMedia__imgCont.appendChild(img)
	} else {
		const videoUrl = `assets/${selectedPic.folderName()}${selectedPic.video}`
		const video = document.createElement('video')
		const source = document.createElement('source')
		source.src = videoUrl
		video.appendChild(source)
		photographMedia__imgCont.appendChild(video)
	}

	const photoMedia__text = getContElemCont('div', 'photo-media__text')
	photoMedia__text.appendChild(textBlock('h2', selectedPic.title))
	const div = document.createElement('div')
	div.appendChild(textBlock('span', selectedPic.likes))
	photoMedia__text.appendChild(div)

	div.appendChild(getImage('likes', './assets/icons/heart-red.svg'))
	photoMedia__text.appendChild(div)

	photographHeader__content.appendChild(photographMedia__imgCont)
	photographHeader__content.appendChild(photoMedia__text)

	link.appendChild(photographHeader__content)

	link.addEventListener('click', (e) => {
		const mediaIndx = e.target.getAttribute('data-indx-no')
		console.log(mediaIndx)
	})
	// console.log(link)
	return link
}

// creates carousel
export function createCarousel() {
	const full_screen_media = getContElemCont('div', 'full_screen_media')
	const full_screen_media__carousel = getContElemCont(
		'div',
		'full_screen_media__carousel'
	)
	const full_screen_media__carouselInner = getContElemCont(
		'div',
		'full_screen_media__carousel-inner'
	)
	const carouselItem = getContElemCont('div', 'carousel-item')
	const carouselImg = getImage(
		'teto',
		'http://127.0.0.1:5501/assets/images/Mimi/Animals_Rainbow.jpg'
	)
	const closeBtn = getContElemCont('button', 'full_screen_media__btn')
	closeBtn.classList.add('full_screen_media__btn-close')
	closeBtn.setAttribute('aria-label', 'close')
	const closeBtnImg = getImage('close carousel', './assets/icons/close-red.svg')

	const leftLink = getContElemCont('a', 'full_screen_media__btn')
	leftLink.classList.add('full_screen_media__btn-left')
	leftLink.setAttribute('aria-label', 'previous image')

	const rightLink = getContElemCont('a', 'full_screen_media__btn')
	rightLink.setAttribute('aria-label', 'next image')

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
