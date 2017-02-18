/**
 * GET /postings
 * List all postings.
 */
const Postings = require('../models/Postings');

exports.getPostings = (req, res) => {
  Postings.find((err, docs) => {
    res.render('postings', { postings: docs });
  });
};


exports.addPostings = (req, res, next) => {

	const posting = new Postings({
		"referenceID" : req.body.referenceID,
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

	});

	posting.save((err) => {
     if (err) { return next(err); }
      res.redirect('/');
    });


	res.render('newpost',
	{
		title:"New Post"

	});

};