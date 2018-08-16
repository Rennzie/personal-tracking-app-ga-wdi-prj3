const GeoSite = require('../models/geoSite');

function siteReviewNew( req, res ){
  GeoSite
    .findById(req.params.siteId)
    .then(geoSite => res.render('reviews/new', { geoSite }));
}

function siteReviewCreate ( req, res ){
  req.body.reviewedBy = req.session.userId;
  GeoSite
    .findById(req.params.siteId)
    .then(geoSite =>{
      geoSite.reviews.push(req.body);
      console.log('We created a review:', req.body);
      console.log('the rating was a:', req.body);
      return geoSite.save();
    })
    .then(geoSite => res.redirect(`/geoSites/${geoSite.id}`))
    .catch(err => console.log(err));
}

function siteReviewEdit( req, res ){
  GeoSite
    .findById(req.params.siteId)
    .populate('reviews')
    .then(geoSite => {
      res.render('reviews/edit', {geoSite, review: geoSite.reviews.id(req.params.reviewId)});
    });
}

function siteReviewUpdate( req, res ){
  GeoSite
    .findById(req.params.siteId)
    .then(geoSite => {
      geoSite.reviews.id(req.params.reviewId).content = req.body.content;
      geoSite.reviews.id(req.params.reviewId).rating = req.body.rating;
      return geoSite.save();
    })
    .then(geoSite => res.redirect(`/geoSites/${geoSite.id}`));
  console.log('about to update review');
}

function siteReviewDelete( req, res ){
  GeoSite
    .findById(req.params.siteId)
    .then(geoSite => {
      geoSite.reviews = geoSite.reviews.filter(
        review => review.id !== req.params.reviewId
      );
      return geoSite.save();
    })
    .then(geoSite => res.redirect(`/geoSites/${geoSite.id}`));
}

module.exports = {
  new: siteReviewNew,
  create: siteReviewCreate,
  edit: siteReviewEdit,
  update: siteReviewUpdate,
  delete: siteReviewDelete
};
