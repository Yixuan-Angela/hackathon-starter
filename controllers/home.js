/**
 * GET /
 * Home page.
 */

const Postings = require('../models/Postings');
const mongoose = require('mongoose');

exports.index = (req, res) => {

	res.render('home', {
	    	title: 'Home',
		});

}

exports.displayResults = (req, res) => {

	req.assert('city', 'City cannot be blank').notEmpty();
  	//req.assert('zip', 'Zip is not valid').notEmpty();

  	const errors = req.validationErrors();

  	if (errors) {
	    req.flash('errors', errors);
    	return res.redirect('/');
  	}

	var AllPosts = [];
	var numPosts = 0;

	if (req.body)
	{
		if (req.body.price == '')
		{
			req.body.price = Number.MAX_SAFE_INTEGER;
			console.log(req.body.price);
		}

		//means a search has occured -> load results below search form

	    console.log(req.body.price);

		Postings.find({}, function(err, postingList) {
			console.log("In Find");
			console.log(req.body);
			
			
			if (postingList.length > 0)
			{
				postingList.forEach(function(currentEntry)
				{

					//console.log(currentEntry);

					if (currentEntry.price < (req.body.price)*1.10)
					{

						console.log(currentEntry);


						
						AllPosts[numPosts] = currentEntry;
						numPosts = numPosts + 1;	


					}

				});

				
			} 

			if (AllPosts)
			{

				AllPosts.sort(function(a,b){

					return a.price - b.price;


				});

				console.log("resultsTable loading)");
				res.render('resultsTable', {
			    	title: 'Home',

			    	postings:AllPosts

				});
			}
			else
			{

				console.log("no entries found");
				AllPosts[numPosts] = {"title":"No Entries Found"};
				res.render('resultsTable', {
			    	title: 'Home',
			    	postings:AllPosts
				});
			}
			
			console.log(AllPosts);
		
		});

	}


	console.log("Done with searching, displaying results now");
	console.log(AllPosts);
	

};
