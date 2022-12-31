const form = document.querySelector('form')
const modal = document.querySelector('#contact_modal')
const modal__title = document.querySelector('.modal__title')

function displayModal() {
	modal.style.display = 'flex'
}

function closeModal() {
	const modal = document.getElementById('contact_modal')
	modal.style.display = 'none'
}

form.addEventListener('submit', (e) => {
	e.preventDefault()
	if (validateForm()) {
		form.first_name.value = ''
		form.last_name.value = ''
		form.email.value = ''
		form.your_message.value = ''
		form.style.display = 'none'
		modal__title.textContent = 'Votre message a été envoyé avec succès'
		setTimeout(() => {
			closeModal()
			form.style.display = 'flex'
			modal__title.textContent = 'Contactez-moi'
		}, 1500)
		console.log('paso !')
	}
})

function validateForm() {
	let name = form.first_name.value.trim()
	let lastName = form.last_name.value.trim()
	let email = form.email.value.trim()
	let textarea = form.your_message.value.trim()
	console.log(name)
	if (name == '' || lastName == '' || email == '' || textarea == '') {
		alert('Tous les champs doivent être remplis.')
		return false
	} else {
		return true
	}
}
