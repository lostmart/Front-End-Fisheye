// import Photographer from '../classes/photographerClass.js'
import Photo from "../classes/mediaClass.js"
let selectedPhotos = []

/*  factory fn: accepts an Array:["media"] and a String:"userId"  */
export default function mediaFactory(media, usersId) {
	let modelPhotosArray = []
	// returns the selected array of pics according to the photographerId
	;(function () {
		selectedPhotos = media.filter((photo) => photo.photographerId == usersId)
		// console.log(selectedPhotos)
	})()

	/* creates a photo object based on the photo class    */
	function arrayModel() {
		selectedPhotos.forEach((photo) => {
			const photoModel = new Photo(photo)
			modelPhotosArray.push(photoModel)
		})
	}

	arrangeByPopularity()
	console.log(selectedPhotos)

	/*  modifies modelPhotosArray by popularity   */
	function arrangeByPopularity() {
		modelPhotosArray.sort((a, b) => {
			return b.likes - a.likes
		})
	}

	/*  modifies modelPhotosArray by date   */
	function arrangeByDates() {
		modelPhotosArray.sort(compareDates)
	}

	/*  modifies modelPhotosArray by title   */
	function arrangeByTitles() {
		modelPhotosArray.sort(compareTitles)
	}

	/* helper fn */
	function compareDates(a, b) {
		if (a.date < b.date) {
			return -1
		}
		if (a.date > b.date) {
			return 1
		}
		return 0
	}
	/* helper fn */
	function compareTitles(a, b) {
		if (a.title < b.title) {
			return -1
		}
		if (a.title > b.title) {
			return 1
		}
		return 0
	}

	/* this fn instantiates each photo obj and pushes it to the modelPhotosArray  */
	arrayModel()

	// console.log(modelPhotosArray)

	return {
		modelPhotosArray,
		selectedPhotos,
		arrangeByPopularity,
		arrangeByDates,
		arrangeByTitles,
	}
}
