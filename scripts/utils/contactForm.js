const form = document.querySelector('form')
const modal = document.querySelector('#contact_modal')
const modal__title = document.querySelector('.modal__title')
const body = document.querySelector('body')
const closeBtn = document.querySelector('.modal__btn-close')
let showContactModal = false

let msgDetails = {}

function displayModal() {
	modal.style.display = 'flex'
	showContactModal = true
	form.first_name.focus()
}

function closeModal() {
	const modal = document.getElementById('contact_modal')
	modal.style.display = 'none'
	showContactModal = false
	//const contBtn = document.querySelector('.contact_button')
	// contBtn.focus()
}

body.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		closeModal()
		const contBtn = document.querySelector('.contact_button')
		contBtn.focus()
	}
})

closeBtn.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		closeModal()
	}
})

form.addEventListener('submit', (e) => {
	e.preventDefault()
	if (validateForm()) {
		form.first_name.value = ''
		form.last_name.value = ''
		form.email.value = ''
		form.your_message.value = ''
		form.style.display = 'none'
		modal__title.textContent = 'Votre message a été envoyé avec succès'
		console.log(msgDetails)
		setTimeout(() => {
			form.style.display = 'flex'
			modal__title.textContent = 'Contactez-moi'
			closeModal()
			const contBtn = document.querySelector('.contact_button')
			contBtn.focus()
		}, 1500)
	}
})

function validateForm() {
	let name = form.first_name.value.trim()
	let lastName = form.last_name.value.trim()
	let email = form.email.value.trim()
	let textarea = form.your_message.value.trim()
	if (name == '' || lastName == '' || email == '' || textarea == '') {
		alert('Tous les champs doivent être remplis.')
		return false
	} else {
		msgDetails.name = name
		msgDetails.lastName = lastName
		msgDetails.email = email
		msgDetails.textarea = textarea

		return true
	}
}
