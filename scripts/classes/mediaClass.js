export default class Photographer {
	constructor({ id, photographerId, title, image, likes, date, price }) {
		this.id = id
		this.photographerId = photographerId
		this.title = title
		this.image = image
		this.likes = likes
		this.date = date
		this.price = price
	}
	displayInfo() {
		console.log(`the title is: ${this.title}`)
	}
}
