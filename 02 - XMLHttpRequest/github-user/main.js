var userName = document.querySelector(".search_button");
var displayUserInfo = document.querySelector(".display_user_info");
var container = document.querySelector(".container");

function getUserInfo(event) {
  // console.log(userName.previousElementSibling.value);
  var xhr = new XMLHttpRequest();
  // console.log(
  //   `https://api.github.com/users/${userName.previousElementSibling.value}`
  // );
  xhr.open(
    "GET",
    `https://api.github.com/users/${userName.previousElementSibling.value}`
  );
  xhr.addEventListener("load", () => {
    // window.location.reload();
    displayUserInfo.style.display = "flex";
    var userInfo = JSON.parse(xhr.response);
    var userImage = document.createElement("img");
    // console.dir(userImage);
    userImage.src = userInfo.avatar_url;
    userImage.classList.add("responsive_image");
    // para
    var fetchedUserId = document.createElement("a");
    fetchedUserId.addEventListener("click", displayUserInfoNextPage);
    // console.dir(fetchedUserId);
    fetchedUserId.classList.add("para");
    // fetchedUserId.href = "www.google.com";
    fetchedUserId.textContent = userInfo.login;
    // check if input empty or not
    if (userName.previousElementSibling.value != "") {
      displayUserInfo.append(userImage, fetchedUserId);
    } else {
      var errorMessage = document.createElement("p");
      errorMessage.classList.add("error_message");
      errorMessage.textContent = "failed to get anything";
      displayUserInfo.append(errorMessage);
    }

    // event on userid
    function displayUserInfoNextPage(event) {
      var xhrRepo = new XMLHttpRequest();
      xhrRepo.open(
        "GET",
        `https://api.github.com/users/${userName.previousElementSibling.value}/repos`
      );
      xhrRepo.addEventListener("load", () => {
        // var userInfo = JSON.parse(xhr.response);
        var repoInfo = JSON.parse(xhrRepo.response);
        // console.log(repoInfo);
        // console.log(userInfo);
        // section for image and repo
        var imgSection = document.createElement("div");
        var repoSection = document.createElement("div");

        // wroking on imgSection
        imgSection.classList.add("img_section");
        var nextPageUserImage = document.createElement("img");
        nextPageUserImage.src = userInfo.avatar_url;
        nextPageUserImage.classList.add("nextPageUserImage_responsive");
        var getUserName = document.createElement("h1");
        getUserName.textContent = `${userInfo.name} (${userInfo.login})`;
        var Followers = document.createElement("h3");
        Followers.textContent = `Followers: ${userInfo.followers}`;
        var Following = document.createElement("h3");
        Following.textContent = `Following: ${userInfo.following}`;
        var Repos = document.createElement("h3");
        Repos.textContent = `Repos: ${userInfo.public_repos}`;
        var Gists = document.createElement("h3");
        Gists.textContent = `Gists: ${userInfo.public_gists}`;
        // append in img section
        imgSection.append(
          nextPageUserImage,
          getUserName,
          Followers,
          Following,
          Repos,
          Gists
        );
        // working on repo section
        repoSection.classList.add("repo_section");
        // console.log(repoInfo);
        for (let i = 0; i < repoInfo.length; i++) {
          console.log("p");
          var diffRepoContainer = document.createElement("div");
          diffRepoContainer.classList.add("diff_repo_container");
          var repolist = document.createElement("h4");
          repolist.classList.add("repo_class");
          repolist.textContent = `${repoInfo[i].name}`;
          diffRepoContainer.append(repolist);
          repoSection.append(diffRepoContainer);
        }

        // appending in body
        container.append(imgSection, repoSection);
      });
      xhrRepo.send();
    }
  });
  xhr.send();
}

userName.addEventListener("click", getUserInfo);
