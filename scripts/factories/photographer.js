function photographerFactory(data) {
	const { name, portrait, place, tagline, price, linkUrl } = data

	const picture = `assets/photographers/${portrait}`

	function getUserCardDOM() {
		const article = document.createElement('article')
		const imgCont = document.createElement('div')
		const link = document.createElement('a')
		const list = document.createElement('ul')

		link.setAttribute('href', linkUrl)
		imgCont.classList.add('photographer_section__imgCont')
		imgCont.appendChild(getImage(name, picture))

		link.appendChild(imgCont)
		link.appendChild(textBlock('h2', name))

		article.appendChild(link)
		list.appendChild(textBlock('li', place))
		list.appendChild(textBlock('li', tagline))
		list.appendChild(textBlock('li', price))
		article.appendChild(list)

		return article
	}

	// create an image
	function getImage(name, picture) {
		const img = document.createElement('img')
		img.setAttribute('src', picture)
		img.setAttribute('alt', name)
		return img
	}

	// create block of text
	function textBlock(type, content) {
		const h2 = document.createElement(type)
		h2.textContent = content
		return h2
	}
	return { name, picture, getUserCardDOM }
}

class Photographer {
	constructor({ name, portrait, city, country, tagline, price, id }) {
		this.name = name ?? null
		this.portrait = portrait ?? null
		this.place = city + ', ' + country ?? null
		this.tagline = tagline ?? null
		this.price = price + '€/jour' ?? null
		this.linkUrl = '/photographer.html?id=' + id ?? null
	}
}
