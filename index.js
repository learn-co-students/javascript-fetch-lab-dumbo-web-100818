const owner = "alexanderchao123";

function getIssues() {
  fetch(`https://api.github.com/repos/${owner}/javascript-fetch-lab/issues`)
  .then(res => res.json())
  .then(showIssues)
}

function showIssues(json) {
  const issues = document.querySelector("#issues");
  let html = '<ul>'
  for (key in json) {
    html += `<li>Title: ${json[key].title}  -   Body: ${json[key].body}</li>`
  }
  html += '</ul>'
  issues.innerHTML = html
}

function createIssue() {
  let title = document.querySelector("#title").value;
  let body = document.querySelector("#body").value;

  const issueData = {
    title: title,
    body: body
  }

  fetch(`https://api.github.com/repos/${owner}/javascript-fetch-lab/issues`, {
    method: "post",
    body: JSON.stringify(issueData),
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(getIssues)
}

function showResults(json) {
  const results = document.querySelector("#results");
  results.innerHTML = `<div>Repo Name: ${json.name}</div>
  <div>Repo Owner: ${json.owner.login}</div>
  <div>Repo Parent: ${json.parent.owner.login}</div>`
  showForkedRepo(json)
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: "post",
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => res.json())
  .then(showResults)
}

function showForkedRepo(json) {
  const results = document.querySelector("#results");
  const link = document.createElement("a");
  link.href = json.html_url;
  link.innerHTML = "Click Here To See Repository"
  results.appendChild(link)
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
  // const token = '5befc5fd7d82c9863165873507b03199ec6dd2a9'
  // return token
}
