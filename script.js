var arrResults = [];
var html = '';

// Create structure for the data through a constructor
function Result(title, extract, pageid) {
    this.title = title;
    this.extract = extract;
    this.pageid = pageid;
}



function search() {
    // put together the API link

    var title = $('#title').val();
    var api = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var apiLink = api + title;

    // Use Ajax to handle things, normal getJSON will not pass authentication
    $.ajax({
            url: apiLink,
            dataType: 'jsonp',
            type: 'POST',
            headers: {
                'Api-User-Agent': 'Example/1.0'
            },
            success: function (data) {

                // First we clear the children from our class to make sure no previous results are showing.
                $('.results').empty();

                // Then we also clear the array with the results before providing new information.
                arrResults.length = 0;
                var resArr = data.query.search;

                for (var result in resArr) {
                    arrResults.push(new Result(resArr[result].title, resArr[result].extract, resArr[result].pageid));
                    html = '<div class="oneResult"><a href="https://en.wikipedia.org/wiki/' + resArr[result].title + '"target="_blank""><h4>' + resArr[result].title + '</h4><p>' + resArr[result].extract + '</p></div>';

                    // Displays the elements to the page
                    $('.results').append(html);
                }
            }
        })

    // This will handle when to display results based on the search bar.
    if ($('#search').val().length > 0) {
        $('.results').css('display', 'none');

    } else if ($('#search').val().length < 1) {
        // display everything again
        $('.results').css('display', 'block');
    }

    // This make things tick with each key stroke
    $('#search').unbind('keyup');
    $('#search').keyup(function () {
        search();
    })
}

$('#search').keyup(function () {
    search();
});
