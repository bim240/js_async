// Using XMLHttpRequest and Promise write your own implementation of browesrs fetch method.
// 1. It takes two parameter 'url' and type of request (GET | POST)
// 2. Returns a promise
// 3. Resolve the promise when data is fetched (onload)
// 4. Reject the promise when error occured (onerror)

// function fetchData(url, task = "GET") {
//   var xhr = new XMLHttpRequest();
//   xhr.open(task, url);
//   xhr.addEventListener("load", () => {
//     var userInfo = JSON.parse(xhr.response);
//     var promise = new Promise((resolve, reject) => {
//       resolve(userInfo);
//       reject(new Error("error"));
//     });
//     xhr.send();
//     return promise;
//   });
// }

function fetchData(url, task = "GET") {
  var promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(task, url);
    xhr.addEventListener("load", () => {
      var userInfo = JSON.parse(xhr.response);
      resolve(userInfo);
      reject(new Error("error"));
    });
    xhr.send();
  });
  return promise;
}
