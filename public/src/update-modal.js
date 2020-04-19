const updateBountyButton = document.getElementById('updateBounty')
const modal = document.getElementById('modal')
const cancelButton = document.getElementById('cancelButton')

// document.addEventListener( "click", someListener );

// function someListener(event){
//     var element = event.target;
//     if(element.classList.contains("updateBountyButton")){
//         modal.classList.add("is-active")
//     }
// }

updateBountyButton.addEventListener('click', (e) =>{
    modal.classList.add("is-active")
})

cancelButton.addEventListener('click', (e) =>{
    e.preventDefault()
    modal.classList.remove('is-active')
})