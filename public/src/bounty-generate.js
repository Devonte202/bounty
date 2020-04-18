const bounties = document.getElementById('bounties')

window.addEventListener('load', (e) =>{
    fetch('/api/get-bounties')
    .then((arr) => arr.json())
    .then((bountyJSON) => {
        for(let bounty of bountyJSON){
            const bountyCard = document.createElement('div')
            bountyCard.classList.add('card')
            bountyCard.classList.add('bountyCard')
            bountyCard.innerHTML = `
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
                  <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item">Claim</a>
                <a href="#" class="card-footer-item">Save</a>
                <a href="#" class="card-footer-item">Flag</a>
              </footer>
            `
            const cardWrapper = document.createElement('div')
            cardWrapper.classList.add('card-wrapper')
            cardWrapper.appendChild(bountyCard)
            bounties.appendChild(cardWrapper)
        }
    })
})
