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

	getThumbnail() {
		let thumbnail = null
		switch (this.video) {
			case 'Animals_Wild_Horses_in_the_mountains.mp4':
				thumbnail = 'Mimi/animals_video_thumb.jpg'
				break
		}
		switch (this.video) {
			case 'Sport_Tricks_in_the_air.mp4':
				thumbnail = 'Ellie-Rose/trick_video_thumb.jpg'
				break
		}
		switch (this.video) {
			case 'Architecture_coverr_circle_empty_highway_in_buenos_aires_587740985637.mp4':
				thumbnail = 'Marcel/Architecture_video_thumb.jpg'
				break
		}
		switch (this.video) {
			case 'Travel_Rock_Mountains.mp4':
				thumbnail = 'Nabeel/Travel_Rock_video_thumb.jpg'
				break
		}
		switch (this.video) {
			case 'Animals_Puppiness.mp4':
				thumbnail = 'Rhode/Animals_video_thumb.jpg'
				break
		}
		switch (this.video) {
			case 'Art_Wooden_Horse_Sculpture.mp4':
				thumbnail = 'Tracy/Art_Wooden_video_thumb.jpg'
				break
		}

		return `assets/images/${thumbnail}`
	}
}
