const ghUrl = 'https://api.github.com/'
const username = ''
const fork = `${username}/javascript-fetch-lab`

function getIssues() {
  fetch(`${ghUrl}repos/${fork}/issues`).then(r => r.json()).then(data => {
    for (let i = 0; i < data.length; i++) {
      showIssues(data)
    }
  })
}

function showIssues(json) {
  let results = `<li>Title: <a href="${json.url}">${json.title} </a><span> | Body: ${json.body}</span></li>`
  document.querySelector('#issues').innerHTML += showResults
  console.log(json)
}

function createIssue() {
  const title = document.getElementById('title').value
  const body = document.getElementById('body').value
  const sendy = {
    title: title,
    body: body
  }

  fetch(`${ghUrl}repos/${fork}/issues`, {
    method: "post",
    headers: {
      'Authorization': `token ${getToken()}`
    },
    body: JSON.stringify(sendy)
  }).then(r => showIssues())
}

function showResults(json) {
  let results = `<h3>Forked Successfully!</h3><a href="${json.html_url}"> ${json.html_url}</a>`
  document.querySelector('#results').innerHTML += results
  console.log(json)
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'

  //use fetch to fork it!
  fetch(`${ghUrl}repos/${repo}/forks`, {
    method: "post",
    headers: {
      'Authorization': `token ${getToken()}`
    }
  }).then(r => r.json()).then(json => showResults(json))
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}
