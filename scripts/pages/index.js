async function getPhotographers() {
	// Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
	// mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

	/*
	// et bien retourner le tableau photographers seulement une fois récupéré
	return {
		photographers: [...photographers, ...photographers, ...photographers],
	}
    */

	try {
		//const res = await fetch("/data/photographers.json")
		const res = await fetch(
			"http://127.0.0.1:5500/Front-End-Fisheye/data/photographers.json"
		)
		const photographers = await res.json()
		return photographers
	} catch (err) {
		//console.log(err.message, 'tengo mucho miedo')
		alert("couldn't retreive data from server ... ")
		console.log(err.message)
	}
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section")

	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer)
		const userCardDOM = photographerModel.getUserCardDOM()
		photographersSection.appendChild(userCardDOM)
	})
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers()
	displayData(photographers)
	console.log(photographers)
}

init()
