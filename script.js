document.getElementById("fetchBtn").addEventListener("click", fetchRepos);

function fetchRepos() {
  const username = document.getElementById("username").value;
  const repoList = document.getElementById("repoList");
  repoList.innerHTML = "";

  if (username) {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((repos) => {
        if (repos.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: repos.message,
          });
        } else {
          repos.forEach((repo) => {
            const repoItem = document.createElement("div");
            repoItem.className = "repo-item card card-body mb-2";
            repoItem.innerHTML = `
              <h5>${repo.name}</h5>
              <p>${repo.description || "No description"}</p>
              <a href="${
                repo.html_url
              }" target="_blank" class="btn btn-danger">View on GitHub</a>
            `;
            repoList.appendChild(repoItem);
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch repositories",
          text: "There was an error fetching the data. Please try again later.",
        });
      });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Input Required",
      text: "Please enter a GitHub username",
    });
  }
}
