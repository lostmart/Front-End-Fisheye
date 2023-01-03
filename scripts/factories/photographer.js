import { getImage, textBlock } from '../factories/createDomElems.js'
import { getContElemCont } from './createDomElems.js'

export default function photographerFactory(newPhotographer) {
	const { name, portrait, place, tagline, price, linkUrl, likes } =
		newPhotographer

	const picture = `assets/photographers/${portrait}`
	// console.log(linkUrl)

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

	function singlePageHeader(photographerModel, mainCont) {
		const picture = `assets/photographers/${photographerModel.portrait}`
		const photographHeader = getContElemCont('section', 'photograph-header')
		const photographHeader__content = getContElemCont(
			'div',
			'photograph-header__content'
		)
		const photographHeader__title = textBlock('h2', photographerModel.name)
		const contactBtn = getContElemCont('button', 'contact_button')
		const photographHeader__location = textBlock('p', photographerModel.place)
		const photographHeader__tag = textBlock('p', photographerModel.tagline)
		const photographHeader__imgCont = getContElemCont(
			'div',
			'photograph-header__imgCont'
		)
		const photographerHeader_img = getImage(photographerModel.name, picture)

		const photographHeader__info = getContElemCont(
			'div',
			'photograph-header__info'
		)
		const photographHeader__likes = getContElemCont(
			'span',
			'photograph-header__likes'
		)
		const heartIcon = getImage('likes', './assets/icons/heart.svg')
		const photographMedia = getContElemCont('section', 'photograph-media')

		// preparation
		contactBtn.textContent = 'Contactez-moi'
		contactBtn.setAttribute('onclick', 'displayModal()')
		photographHeader__location.classList.add('photograph-header__location')
		photographHeader__tag.classList.add('photograph-header__tag')
		photographHeader__info.classList.add('photograph-header__info')

		const spanLikes = document.createElement('span')
		spanLikes.innerHTML = photographerModel.likes
		photographHeader__likes.appendChild(spanLikes)
		photographHeader__likes.appendChild(heartIcon)
		const spanPrice = document.createElement('span')
		spanPrice.textContent = photographerModel.price

		// append
		photographHeader__content.appendChild(photographHeader__title)
		photographHeader__content.appendChild(photographHeader__location)
		photographHeader__content.appendChild(photographHeader__tag)
		photographHeader__imgCont.appendChild(photographerHeader_img)
		photographHeader.appendChild(photographHeader__content)
		photographHeader.appendChild(contactBtn)
		photographHeader.appendChild(photographHeader__imgCont)
		photographHeader__info.appendChild(photographHeader__likes)
		photographHeader__info.appendChild(spanPrice)
		photographHeader.appendChild(photographHeader__info)
		mainCont.appendChild(photographHeader)
		mainCont.appendChild(photographMedia)
	}

	return {
		name,
		portrait,
		place,
		tagline,
		price,
		linkUrl,
		likes,
		getUserCardDOM,
		singlePageHeader,
	}
}
