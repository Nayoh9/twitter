window.addEventListener("DOMContentLoaded", function (e) {
    bindTweet();
})


function bindTweet() {
    const elements = document.querySelectorAll(".btn-danger");
    const tweetContainer = document.querySelector("#tweet-list-container");

    elements.forEach(e => {
        e.addEventListener("click", function (e) {
            const tweetId = e.target.getAttribute('tweetId');

            axios.delete("/tweets/" + tweetId)
                .then(function (response) {
                    tweetContainer.innerHTML = response.data;
                    // On re bind les elements après le retour de la nouvelle liste
                    bindTweet();
                })
                .catch(function (err) { console.log(err); })
        })
    });
}