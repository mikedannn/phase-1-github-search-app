document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('github-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        getUsers(e.target[0].value)
        form.reset()
        const userList = document.querySelector("#user-list")
        userList.textContent = ""
        const repoList = document.getElementById('repos-list')
        repoList.textContent = ""
    })
})

function getUsers(userName) {
    fetch(`https://api.github.com/search/users?q=${userName}`, {
        method: "GET",
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(response => response.json())
    .then(response => response.items.map(item => displayUser(item)))
}


function displayUser(user) {
    //login and avatar_url
    const userList = document.getElementById('user-list')
    const li = document.createElement('li')
    const image = document.createElement('img')
    image.src = user.avatar_url
    image.alt = user.login 
    image.id = user.login
    image.dataset.login = user.login
    image.addEventListener('click', getRepositories)
    const h3 = document.createElement('h3')
    h3.textContent = user.login
    li.append(image, h3)
    userList.append (li)
}


function getRepositories(event) {
    const repoList = document.getElementById('repos-list')
    repoList.textContent = ""
    fetch(`https://api.github.com/users/${event.target.id}/repos`, {
        method: "GET",
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(response => response.json())
    .then(response => response.map(r => displayRepository(r)))
}

function displayRepository(repo) {
    const repoList = document.getElementById('repos-list')
    const li = document.createElement("li")
    li.textContent = repo.name
    repoList.append(li)
}