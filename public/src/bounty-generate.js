const bounties = document.getElementById('bounties')

window.addEventListener('load', (e) =>{
    fetch('/api/get-bounties')
    .then((arr) => arr.json())
    .then((res) => console.log(res))
})
