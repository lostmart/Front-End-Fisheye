function photographerFactory(data) {
	const { name, portrait } = data

	const picture = `assets/photographers/${portrait}`

	function getUserCardDOM() {
		const article = document.createElement("article")

		article.appendChild(getImage(name, picture))
		article.appendChild(textBlock())

		return article
	}

	// create an image
	function getImage(name, picture) {
		const img = document.createElement("img")
		img.setAttribute("src", picture)
		img.setAttribute("alt", name)
		return img
	}

	// create block of text
	function textBlock() {
		const h2 = document.createElement("h2")
		h2.textContent = name
		return h2
	}
	return { name, picture, getUserCardDOM }
}
