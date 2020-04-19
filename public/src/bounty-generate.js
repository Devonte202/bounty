const bounties = document.getElementById('bounties')

window.addEventListener('load', (e) =>{
    fetch('/api/get-bounties')
    .then((arr) => arr.json())
    .then((bountyJSON) => {
        for(let bounty of bountyJSON){
            if(bounty.is_claimed === false){
                let d = new Date(bounty.date_added)
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                const bountyCard = document.createElement('div')
                bountyCard.classList.add('card')
                bountyCard.classList.add('bountyCard')
                bountyCard.innerHTML = `
                   <div class="card-image">
                    <figure class="image is-4by3">
                      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                    </figure>
                   </div>
                   <header class="card-header">
                    <p class="card-header-title">
                      ${bounty.name}
                    </p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                      <p class="card-header-title">
                       $${bounty.cost}
                      </p>
                    </a>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      ${bounty.info}
                      <a href="#">#${bounty.category}</a>.
                      <br>
                      <p><strong>${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}</strong></p>
                    </div>
                  </div>
                  <footer class="card-footer">
                    <a href="#" class=" claim card-footer-item">Claim</a>
                  </footer>
                `
                const cardWrapper = document.createElement('div')
                cardWrapper.classList.add('card-wrapper')
                cardWrapper.appendChild(bountyCard)
                bounties.appendChild(cardWrapper)
            }
        }
    })
    .then(() =>{
        const claimButtons = document.getElementsByClassName('claim')
        const modal = document.getElementById('modal')
        
        for(let button of claimButtons){
            button.addEventListener('click', (e) =>{
                modal.classList.add("is-active")
            })
        }
    })
})