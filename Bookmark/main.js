//listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark

function saveBookmark(e)
{

	//Get form value

	var siteName =document.getElementById('siteName').value;
	var siteUrl =document.getElementById('siteUrl').value;

	if(!siteName || !siteUrl)
	{
		alert('Please fill in the form');
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex))
    {
    	alert('Please use a valid url');
    	return false;
    }

	var bookmark =
	{
		name: siteName,
		url: siteUrl
	}

	//test if bookmarrks is null

	if(localStorage.getItem('boomarks')===null)
	{

		//init array

		var bookmarks = [];

		//Add to array

		bookmarks.push(bookmark);

		//set to localStorage

		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}
	else
	{
		//Get bookmarks from local storage

		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		// Add bookmark to array

		bookmarks.push(bookmark);

		//reset back to local Storage


		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}
	//re-fetch the bookmark
		fetchBookmarks();

	e.preventDefault();
}

// Delete Function

function deleteBookmark(url)
{
	//get bookmark from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//loop through bookmarks

	for(var i=0;i< bookmarks.length;i++)
	{
		if(bookmarks[i].url == url)
		{
			//remove array
			bookmarks.splice(i, 1);
		}
	}
	//reset back to local Storage


		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

		//re-fetch the bookmark
		fetchBookmarks();

}

//fetch bookmarks

function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="card bg-light p-3">'+
                                  '<h3>'+name+
            '<a class="btn btn-outline-secondary" target="_blank" href="'+url+'">Visit</a>' +
            '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                  '</h3>'+
                                  '</div>';
  }
}

