// import Photographer from '../classes/photographerClass.js'
import Photo from '../classes/mediaClass.js'
let selectedPhotos = []
let likesArray = []
let globalLikes = 0

export function addLikes(indx) {
	globalLikes++
	const photograph__likes = document.querySelector('.photograph-header__likes')
	photograph__likes.firstChild.textContent = globalLikes
	const selectedLike = document.querySelectorAll('.photo-media__likes')[indx]
	let addValue = Number(selectedLike.textContent)
	addValue++
	selectedLike.textContent = addValue
}

/*  factory fn: accepts an Array:["media"] and a String:"userId"  */
export default function mediaFactory(media, usersId) {
	let modelPhotosArray = []
	// returns the selected array of pics according to the photographerId
	/*

		khjjh

		*/
	;(function () {
		selectedPhotos = media.filter((photo) => photo.photographerId == usersId)
		// console.log(selectedPhotos)
	})()

	/* creates a photo object based on the photo class    */
	function arrayModel() {
		selectedPhotos.forEach((photo) => {
			const photoModel = new Photo(photo)
			likesArray.push(photoModel.likes)
			// calculateLikes(photoModel.likes)
			likesArray.reduce(calculateLikes)
			globalLikes = likesArray.reduce(calculateLikes)
			modelPhotosArray.push(photoModel)
		})
		const photograph__likes = document.querySelector(
			'.photograph-header__likes'
		)
		photograph__likes.firstChild.textContent = globalLikes

		// console.log(globalLikes)
		// console.log(likesArray)
	}

	function calculateLikes(totalLikes, likeNo) {
		return totalLikes + likeNo
	}

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

	return {
		modelPhotosArray,
		selectedPhotos,
		arrangeByPopularity,
		arrangeByDates,
		arrangeByTitles,
		addLikes,
	}
}
