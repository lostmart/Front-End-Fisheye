export default class Photo {
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
	folderName() {
		console.log(this.photographerId)
		let folder = ''
		switch (this.photographerId) {
			case 930:
				folder = 'Ellie-Rose'
				break
			case 243:
				folder = 'Mimi'
				break
			case 82:
				folder = 'Tracy'
				break
			case 527:
				folder = 'Nabeel'
				break
			case 925:
				folder = 'Rhode'
				break
			case 195:
				folder = 'Marcel'
				break
			default:
				folder = null
			// code block
		}
		return `images/${folder}/`
	}
}
