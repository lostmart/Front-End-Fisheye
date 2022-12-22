export default class Photo {
	constructor({ id, photographerId, title, image, likes, date, price, video }) {
		this.id = id
		this.photographerId = photographerId ?? null
		this.title = title ?? null
		this.image = image ?? null
		this.likes = likes ?? null
		this.date = date ?? null
		this.price = price ?? null
		this.video = video ?? null
	}
	folderName() {
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
