const userBounties = document.getElementById('user-bounties')

window.addEventListener('load', (e) =>{
    fetch('/api/get-user-bounties')
    .then((arr) => arr.json())
    .then((bountyJSON) => {
        for(let bounty of bountyJSON){
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
                <button class="button updateBounty card-footer-item">Update</button>
                <form action="/api/delete/${bounty.bounty_id}" method="post">
                    <input class="card-footer-item" type="submit" value="Delete">
                </form>
              </footer>
            `
            const cardWrapper = document.createElement('div')
            cardWrapper.classList.add('card-wrapper')
            cardWrapper.appendChild(bountyCard)
            userBounties.appendChild(cardWrapper)
        }
    })
})