// create an image
// first param: name(alt text) - second: image source(url)
export function getImage(name, picture) {
	const img = document.createElement("img")
	img.setAttribute("src", picture)
	img.setAttribute("alt", name)
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
export function photoCard(selectedPic) {
	const { image } = selectedPic

	const link = document.createElement("a")
	link.setAttribute("href", "javascript:void(0)")
	link.setAttribute("onclick", "displayGallery()")

	const photographHeader__content = getContElemCont(
		"article",
		"photograph-media__card"
	)

	const photographMedia__imgCont = getContElemCont(
		"div",
		"photograph-media__imgCont"
	)
	if (image) {
		const imgUrl = `assets/${selectedPic.folderName()}${selectedPic.image}`
		const img = getImage(selectedPic.title, imgUrl)
		photographMedia__imgCont.appendChild(img)
	} else {
		const videoUrl = `assets/${selectedPic.folderName()}${selectedPic.video}`
		const video = document.createElement("video")
		const source = document.createElement("source")
		source.src = videoUrl
		video.appendChild(source)
		photographMedia__imgCont.appendChild(video)
	}

	const photoMedia__text = getContElemCont("div", "photo-media__text")
	photoMedia__text.appendChild(textBlock("h2", selectedPic.title))
	const div = document.createElement("div")
	div.appendChild(textBlock("span", selectedPic.likes))
	photoMedia__text.appendChild(div)

	div.appendChild(getImage("likes", "./assets/icons/heart-red.svg"))
	photoMedia__text.appendChild(div)

	photographHeader__content.appendChild(photographMedia__imgCont)
	photographHeader__content.appendChild(photoMedia__text)

	link.appendChild(photographHeader__content)
	// console.log(link)
	return link
}
