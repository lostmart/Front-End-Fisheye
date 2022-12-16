// create an image
// first param: name(alt text) - second: image source(url)
export function getImage(name, picture) {
	const img = document.createElement('img')
	img.setAttribute('src', picture)
	img.setAttribute('alt', name)
	return img
}

// creates a block of text with the element passed as string and its content
export function textBlock(type, content) {
	const h2 = document.createElement(type)
	h2.textContent = content
	return h2
}

// creates a container element with a class in it
export function getContElemCont(elemTyp, className) {
	const elem = document.createElement(elemTyp)
	elem.classList.add(className)
	return elem
}
