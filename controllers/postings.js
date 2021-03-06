/**
 * GET /postings
 * List all postings.
 */
const Postings = require('../models/Postings');
const mongoose = require('mongoose');



exports.getPostings = (req, res) => {


	console.log(req);

	var AllPosts = [];
	var numPosts = 0;


	Postings.find({}, function(err, postingList) {
		console.log("In Find");
		
		
		if (postingList.length > 0)
		{
			postingList.forEach(function(currentEntry)
			{

				console.log(currentEntry);
				AllPosts[numPosts] = currentEntry;
				numPosts = numPosts + 1;


			});

		}

		console.log("numPost contains elements: ");
		console.log(AllPosts);

		res.render('postings', {

			title: 'Postings',
			postings:AllPosts

		});

		console.log("end find");
		
	});

	

};


exports.addPostings = (req, res) => {

	var PostingSchema = mongoose.model('Postings', PostingSchema)

	console.log(req.body);
	console.log(req.body.title);

	var Thetitle = req.body.title;
	if (Thetitle)
	{
		console.log("defined title");
	}

	var newposting = new Postings({

		//generate id

		"title" :req.body.title,
	  	"email": req.body.email,
	  	"price": req.body.price,
	  	"numPeople": req.body.numPeople,
	  	"postingDate": Date(),

		"adress":
		{
			"address": req.body.address,
		    "city": req.body.city,
		    "zip": req.body.zip,
		    "picture": req.body.picture
		}
	});
	

	// if there is a title then save
	if (req.body.title)
	{
		console.log("saving to db");

		newposting.save(function(err){
			if (err)
			{
				console.log(err);
				//res.redirect('/');
			}
			else
			{
				//res.redirect('/postings');
			}
	  	});
	}



	/*
	new Postings({
		/*
		//"referenceID" : req.body.referenceID,
		"title" :req.body.posttitle,
	  	"userEmail": req.body.userEmail,
	  	"price": req.body.price,
	  	"maxPeople": req.body.maxPeople,
	  	"postingDate": Date(),

		"adress": {
			"streetAddress": req.body.streetAddress,
		    "city": req.body.city,
		    "zip": req.body.zip,
		    "picture": req.body.picture
		}

		

		"title" : "bogusTitle"


	}).save(function(err){
		if (err)
		{
			console.log(err);
			//res.redirect('/');
		}
		else
		{
			//res.redirect('/postings');
		}
    });
	*/

	res.render('newpost',
	{
		title:"New Post"

	});

};