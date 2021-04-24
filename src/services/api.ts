export async function fetchEpisodes() {
    const spotifyCredentials = "MTM0ODA5ODdhNjhkNDUxN2FlNjhiMmE3ZGZiMTQ1ZDk6NGFjOThkODAzMTNmNGEwZTkzMDZmYzUyYzBiNTM0OWE="
  
  const myHeaders = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": `Basic ${spotifyCredentials}`,
  });
  const initFetch = {
    method: 'POST',
    headers: myHeaders,
    body: "grant_type=client_credentials"
  }

  let api_token = ''

  //Get token
  await fetch('https://accounts.spotify.com/api/token', initFetch)
  .then(async (response: any) => {
    const data = await response.json();
    //window.localStorage.setItem('@SpotifyToken', data.access_token)
    api_token = data.access_token
  })

  //get episodes
  const myShowHeaders = new Headers({
    "Content-type": "application/json",
    "Authorization": `Bearer ${api_token}`,
  });
  const initShowFetch = {
    method: 'GET',
    headers: myShowHeaders,
  }

  const thshow = "https://api.spotify.com/v1/shows/0r62857CrmcShv6xiqdMGn?market=BR"
 
  return fetch(thshow, initShowFetch)
}

export async function fetchEpisodeById(id: any) {
  const spotifyCredentials = "MTM0ODA5ODdhNjhkNDUxN2FlNjhiMmE3ZGZiMTQ1ZDk6NGFjOThkODAzMTNmNGEwZTkzMDZmYzUyYzBiNTM0OWE="
  
  const myHeaders = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": `Basic ${spotifyCredentials}`,
  });
  const initFetch = {
    method: 'POST',
    headers: myHeaders,
    body: "grant_type=client_credentials"
  }

  let api_token = ''

  //Get token
  await fetch('https://accounts.spotify.com/api/token', initFetch)
  .then(async (response: any) => {
    const data = await response.json();
    //window.localStorage.setItem('@SpotifyToken', data.access_token)
    api_token = data.access_token
  })

  //get episodes
  const myShowHeaders = new Headers({
    "Content-type": "application/json",
    "Authorization": `Bearer ${api_token}`,
  });
  const initShowFetch = {
    method: 'GET',
    headers: myShowHeaders,
  }

  const thshow = "https://api.spotify.com/v1/shows/0r62857CrmcShv6xiqdMGn?market=BR"
 
  return fetch(`https://api.spotify.com/v1/episodes/${id}?market=BR`, initShowFetch)
}