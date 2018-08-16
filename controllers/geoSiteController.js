const GeoSite = require('../models/geoSite');

function geoSiteNew( req, res ){
  const prevPage = req.headers.referer;
  console.log('the prev page is : ', prevPage);
  res.render('geoSites/new', {prevPage});
}


function geoSiteIndex( req, res ){
  GeoSite
    .find()
    .populate('reviews.reviewedBy')
    .then(geoSites => {
      console.log('The review object is', geoSites[0].reviews);
      res.render('geoSites/index', { geoSites });
    });
}

function geoSiteCreate( req, res ){
  req.body.createdBy = req.session.userId;
  GeoSite
    .create( req.body )
    .then( geoSite => {
      const prevPage = req.body.prevPage;
      console.log('Added a new Geo Site: ', geoSite);
      req.flash('success', 'You created a new site');
      res.redirect(prevPage);
    })
    .catch((err) => res.status(500).send(err));
}


// can we add the user model to the rendered page to look up later?
function geoSiteShow( req, res ){
  const geoSiteId = req.params.id;
  GeoSite
    .findById(geoSiteId)
    .populate('createdBy')
    .populate('reviews.reviewedBy')
    .then( geoSite =>  res.render('geoSites/show', { geoSite }) );
}

function geoSiteEdit(req, res){
  const prevPage = req.headers.referer;
  GeoSite
    .findById(req.params.id)
    .then(geoSite => {
      res.render('geoSites/edit', { geoSite, prevPage });
    });
}

function geoSiteUpdate( req, res ){
  req.body.images = req.body.images.split(',');
  req.body.rockTypes = req.body.rockTypes.split(',');
  GeoSite
    .findByIdAndUpdate(req.params.id, req.body)
    .then(geoSite => res.redirect(`/geoSites/${geoSite.id}`))
    .catch(err => console.log(err));
}

function geoSiteDelete( req, res ){
  GeoSite
    .findByIdAndDelete(req.params.id, req.body)
    .then(res.redirect('/geoSites'))
    .catch(err => res.status(404).send(err));
}

module.exports = {
  new: geoSiteNew,
  index: geoSiteIndex,
  create: geoSiteCreate,
  show: geoSiteShow,
  edit: geoSiteEdit,
  update: geoSiteUpdate,
  delete: geoSiteDelete
};
