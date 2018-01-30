function getResults() {
	// string from search query input
	var searchQuery = $("#search").val().trim(); 

	// YYYYMMDD from query input
	var beginDate = $("#start").val().trim();

	// YYYYMMDD from query input
	var endDate = $("#end").val().trim();

	// number from search query input
	var numberOfRecords = $("#numRecords").val().trim();

	var parameters = {
		"api-key": "9fa240ad4161445491b14eed92d7c864"
	};

	if(searchQuery !== "")
		parameters.q = searchQuery;

	if(beginDate !== "")
		parameters.begin_date = beginDate;

	if(endDate !== "")
		parameters.end_date = endDate;

	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	queryURL += '?' + $.param(parameters);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(articles) {
		for (var i = 0; i < numberOfRecords; i++) {
			var newArticle = $("<div>");
			newArticle.attr("onclick", "window.open('" + articles.response.docs[i].web_url + "', 'mywindow')");
			newArticle.append("<h2 class='articlenumber'>" + (i + 1) + "</h2>");
			newArticle.append("<h3 class='articletitle'>" + articles.response.docs[i].headline.main + "</h3>");
			newArticle.append("<p class='articleauthor'>" + "By " + articles.response.docs[i].byline.original + "</p>");
			$("#topArticles").append(newArticle);
		}

	}); 

};

$("#searchButton").on("click", function() {
	event.preventDefault();
	$("#topArticles").empty();	
	getResults();
});

$("#clearButton").on("click", function() {
	event.preventDefault();
	$("#topArticles").empty();
})