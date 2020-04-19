const cancelButton = document.getElementById('cancelButton')
const modal = document.getElementById('modal')

cancelButton.addEventListener('click', (e) =>{
    e.preventDefault()
    modal.classList.remove('is-active')
})