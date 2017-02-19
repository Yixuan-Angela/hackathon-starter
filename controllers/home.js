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



	var AllPosts = [];
	var numPosts = 0;

	if (req.body)
	{
		//means a search has occured -> load results below search form

		/*

		.form-group
      label(class='col-sm-2 control-label', for='city') City
      .col-sm-8
        input.form-control(type='text', name='city', id='city', autofocus=true)
    .form-group
      label(class='col-sm-2 control-label', for='zip') Zip Code
      .col-sm-8
        input.form-control(type='text', name='zip', id='zip')
    .form-group
      label(class='col-sm-2 control-label', for='price') Price Cap
      .col-sm-8
        input.form-control(type='text', name='price', id='price')
    .form-group
      label(class='col-sm-2 control-label', for='people') Person Cap
      .col-sm-8
        input.form-control(type='text', name='people', id='people')
    .form-group
      .col-sm-offset-2.col-sm-8
        button.btn.btn-primary(type='submit')
          | Search

     */

	    console.log(req.body.price);

		Postings.find({}, function(err, postingList) {
			console.log("In Find");
			console.log(req.body);
			
			
			if (postingList.length > 0)
			{
				postingList.forEach(function(currentEntry)
				{

					//console.log(currentEntry);

					if (currentEntry.price < req.body.price)
					{
						console.log(currentEntry);
						AllPosts[numPosts] = currentEntry;
						numPosts = numPosts + 1;

					}

				});

				
			} 

			if (AllPosts)
			{
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
