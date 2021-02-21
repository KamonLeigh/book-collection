/* eslint-disable no-underscore-dangle */
const mbxGeoboxing = require('@mapbox/mapbox-sdk/services/geocoding');
const Store = require('../db/models/store');

const geoboxingService = mbxGeoboxing({ accessToken: process.env.MAP_TOKEN });

module.exports.stores = async (req, res) => {
  const author = req.user._id;
  const stores = await Store.find({ author });

  return res.render('stores/', { title: 'Store list', stores });
};

module.exports.showStores = async (req, res) => {
  res.render('stores/new', { title: 'New Store' });
};

module.exports.createStore = async (req, res) => {
  const geoData = await geoboxingService.forwardGeocode({
    query: req.body.store.location,
    limit: 1,
  }).send();

  const store = new Store(req.body.store);
  store.geometry = geoData.body.features[0].geometry;
  store.author = req.user._id;
  await store.save();

  req.flash('msg-success', 'You have successfully added to your book store collection :-)');
  return res.redirect('/stores');
};

module.exports.getStore = async (req, res) => {
  const { id } = req.params;

  const store = await Store.findById(id).exec();

  if (!store) {
    req.flash('error', 'unable to carry out request');
    return res.redirect('/stores');
  }

  return res.render('stores/store', { title: 'Store', store });
};

module.exports.editStorePage = async (req, res) => {
  const { id } = req.params;

  const store = await Store.findById(id);

  if (!store) {
    req.flash('error', 'unable to carry out request');
    return res.redirect('/stores');
  }

  return res.render('stores/edit', { title: 'edit store', store });
};

module.exports.editStore = async (req, res) => {
  const { id } = req.params;
  const editedStore = req.body.store;

  const geoData = await geoboxingService.forwardGeocode({
    query: editedStore.location,
    limit: 1,
  }).send();

  editedStore.geometry = geoData.body.features[0].geometry;

  const store = await Store.findByIdAndUpdate(id, { ...editedStore });
  await store.save();

  req.flash('msg-success', 'You have successfully updated your book store');
  return res.redirect(`/stores/${id}`);
};
