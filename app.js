const input = document.querySelector('#user-input');
const output = document.querySelector('#response');
const avatar = document.querySelector('#avatar'); 
const repoWrapper = document.querySelector('.repo-wrapper');
const repoSection = document.querySelector('#repo-section');

const github = new Github();

input.addEventListener('keyup', () => {
  const user = input.value;
  if(user !== '') {
    github.getUser(user).then(data => displayData(data))
                      .catch(err => console.log(err));
  }
})

function manipulateData(userData) {
  console.log('manipulate data')
  github.getFollowers(userData.fowllowers).then(resp => console.log(resp))
                                             .catch(err => console.log(err))
}

function displayData(userData) {
  document.querySelector('#user-info').innerHTML = `
  <div id="profile">
      <figure><img id="avatar" src="" alt=""></figure>  
      <div>
        <h3 id='name'>${userData.name}</h3>
        <p id='location'>${userData.location}</p>        
      </div>
      <a id='btn-profile' class="label label-profile label-green">View Profile</a>
    </div>
    <div id="git-info">
      <p class="label label-ligther">Public Repos: ${userData.public_repos}</p>
      <p class="label label-darker">Public Gists: ${userData.public_gists}</p>
      <p class="label label-ligther">Following: ${userData.following}</p>
      <p class="label label-darker">Followers: ${userData.followers}</p>
  </div>
    `;
  document.querySelector('#avatar').setAttribute('src', userData.avatar_url);
  document.querySelector('#btn-profile').setAttribute('href', userData.html_url);
  getLatestRepos(userData.repos_url);
}

const getLatestRepos = (repo_url) => {
  github.fetchLatestRepos(repo_url).then(resp => displayRepositories(resp))
                                   .catch(err => console.log(err))
}

const displayRepositories = (repositories) => {
  let output = '';
  // if(repositories.length <= 5) {
  console.log('Repositorios',repositories)
  repositories.slice(-5).forEach(repository => {
      output += `
      <div class="repo">
        <div class="repo-name">${repository.name}</div>
        <div class="repo-info">
          <p class="label label-ligther">Stars: ${repository.stargazers_count}</p>
          <p class="label label-darker">Watchers: ${repository.watchers}</p>
          <p class="label label-green">Forks: ${repository.forks}</p>
        </div>
      </div>`
    });    

  repoWrapper.innerHTML = output;
}