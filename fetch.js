class Github {
  constructor() {
    this.clientId = 'b091f41c2da1513c6e14';
    this.clientSecret = '72e763a91f3a8c0aa54e79eb773620db8dc4b12b';
  }

  async getUser(user) {
    try {
      const response = await fetch(`https://api.github.com/users/${user}?client_id=${this.clientId}&client_secret=${this.clientSecret}`);
      const data = await response.json();
      return data;
    } catch(err) {
      return err;
    }    
  }

  async fetchLatestRepos(url) {
    const response = await fetch(`${url}?client_id=${this.clientId}&client_secret=${this.clientSecret}`);
    const data = await response.json();
    return data;
  }

}