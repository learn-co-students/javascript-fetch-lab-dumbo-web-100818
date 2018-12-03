function getIssues() {
  fetch('https://api.github.com/repos/hmalik88/javascript-fetch-lab/issues', {
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => res.json())
  .then(showIssues)
}

function showIssues(json) {
  let issuesDiv = document.querySelector('#issues');
  json.forEach((issue)=> {
    issuesDiv.innerHTML += `
    Title: ${issue.title}<br>
    Comment: ${issue.body}<br><br>
    `
  });
}

function createIssue() {
  let title = document.querySelector('#title').value
  let body = document.querySelector('#body').value
  let object = {"title": title, "body": body};
  fetch ('https://api.github.com/repos/hmalik88/javascript-fetch-lab/issues', {
    method: /post/,
    headers: {
      Authorization: `token ${getToken()}`
    },
    body: JSON.stringify(object)
  });
  getIssues();
}

function showResults(json) {
  let resultsDiv = document.querySelector('#results');
  resultsDiv.innerHTML = `<a href="${json.html_url}">Repo link</a>`;
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  fetch (`https://api.github.com/repos/${repo}/forks`, {
    method: /post/,
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(showResults);
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}
