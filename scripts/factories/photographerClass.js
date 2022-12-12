export default class Photographer {
	constructor({ name, portrait, city, country, tagline, price, id }) {
		this.name = name ?? null
		this.portrait = portrait ?? null
		this.place = city + ', ' + country ?? null
		this.tagline = tagline ?? null
		this.price = price + '€/jour' ?? null
		this.linkUrl = './photographer.html?id=' + id ?? null
	}
}
