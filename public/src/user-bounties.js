const userBounties = document.getElementById('user-bounties')

window.addEventListener('load', () =>{
	fetch('/api/get-user-bounties')
		.then((arr) => {
			return arr.json()
		})
		.then((bountyJSON) => {
			const username = bountyJSON.pop()
			const header = document.createElement('h1')
			header.classList.add('title', 'is-1', 'username')
			const headerBox = document.getElementById('welcome')
			header.innerHTML = `Welcome ${username}`
			headerBox.appendChild(header)
			
			if(bountyJSON[0].bounty_id === undefined){
				return null
			} 
			for(let bounty of bountyJSON){
				let d = new Date(bounty.date_added)
				let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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
              <footer class="card-footer" style="justify-content:space-around;">
                <button class="button updateBounty">Update</button>
                <form action="/api/delete/${bounty.bounty_id}" method="post">
                    <input class="button is-danger" type="submit" value="Delete">
                </form>
              </footer>
            `
				const cardWrapper = document.createElement('div')
				cardWrapper.classList.add('card-wrapper')
				cardWrapper.appendChild(bountyCard)
				userBounties.appendChild(cardWrapper)
			}
			return bountyJSON
		})
		.then((bountyJSON) => {
			const updateBountyButtons = document.getElementsByClassName('updateBounty')
			const modal = document.getElementById('modal')
			const form = document.getElementById('form')
			const name = document.getElementById('name')
			const cost = document.getElementById('cost')
			const info = document.getElementById('info')
        
        
			for(let button = 0; button < bountyJSON.length; button += 1){
				updateBountyButtons[button].addEventListener('click', () =>{
					modal.classList.add('is-active')
					form.setAttribute('action', `/api/update-bounty/${bountyJSON[button].bounty_id}`)
					name.setAttribute('value', bountyJSON[button].name)
					cost.setAttribute('value', bountyJSON[button].cost)
					info.setAttribute('placeholder', bountyJSON[button].info)
				})
			}

        
		})
	fetch
})