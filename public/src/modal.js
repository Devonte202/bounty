const addBountyButton = document.getElementById('addBounty')
const modal = document.getElementById('modal')
const cancelButton = document.getElementById('cancelButton')

addBountyButton.addEventListener('click', () =>{
	modal.classList.add('is-active')
})

cancelButton.addEventListener('click', (e) =>{
	e.preventDefault()
	modal.classList.remove('is-active')
})
