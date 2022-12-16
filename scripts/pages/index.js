import getData from '../factories/getData.js'
import photographerFactory from '../factories/photographer.js'
import Photographer from '../classes/photographerClass.js'

const url =
	'https://lostmart.github.io/Front-End-Fisheye/data/photographers.json'

async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section')

	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(
			new Photographer(photographer)
		)
		const userCardDOM = photographerModel.getUserCardDOM()
		photographersSection.appendChild(userCardDOM)
	})
}

async function init() {
	/* new instance of getData() return the data from the server */
	const newfetch = new getData(url)
	const newBroughtData = await newfetch.brigMeData()

	// Récupère les datas des photographes
	const { photographers } = await newBroughtData
	displayData(photographers)
}

init()
