const input = document.querySelector('#user-input');
const output = document.querySelector('#response');
const avatar = document.querySelector('#avatar'); 
const repoWrapper = document.querySelector('.repo-wrapper');
const repoSection = document.querySelector('#repo-section');

const github = new Github();

// avatar_url
// followers
// following
// name
// html_url - when user profile is clicked
// public_repos OK
// public_gists OK
// location
// company
// blog
// created_at - member since
// repos_url - last 5 repos



input.addEventListener('keyup', () => {
	const user = input.value;
  github.getUser(user).then(data => displayData(data))
                      .catch(err => console.log(err));
  //result.then(r => console.log(r)).catch('deu merda')
})
//avatar.setAttribute('src', data.avatar_url)
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
  // getLatestsRepos(userData.repos_url);
  // console.log(userData.html_url);
  // console.log(userData.followers);
  // console.log(userData.following);
  // console.log(userData.name);
  // console.log(userData.location);
  // console.log(userData.company);
  // console.log(userData.blog);
  // console.log(userData.created_at);
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
//  } else {
  //  repositories.forEach(repository, i => {
  //   output += `
  //   <div class="repo">
  //     <div class="repo-name">${repository.name}</div>
  //     <div class="repo-info">
  //       <p class="label label-ligther">Stars: </p>
  //       <p class="label label-darker">Watchers: </p>
  //       <p class="label label-green">Forks: ${repository.forks}</p>
  //     </div>
  //   </div>`
  // });
 //}
 repoWrapper.innerHTML = output;
}