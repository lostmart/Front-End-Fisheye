import Photographer from '../classes/photographerClass.js'
import MediaData from '../classes/mediaClass.js'

export default function mediaFactory(name) {
	function sayHello() {
		console.log('hello my name is ' + name.name)
	}
	function photographHeader(newName) {
		name = newName
	}
	return { name, sayHello, photographHeader }
}
