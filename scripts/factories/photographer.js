import { getImage, textBlock } from '../factories/createDomElems.js'

export default function photographerFactory(newPhotographer) {
	const { name, portrait, place, tagline, price, linkUrl } = newPhotographer
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

	return { name, portrait, place, tagline, price, linkUrl, getUserCardDOM }
}
