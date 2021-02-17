const Store = require('../db/models/store');
const mbxGeoboxing = require('@mapbox/mapbox-sdk/services/geocoding');
const geoboxingService = mbxGeoboxing({ accessToken: process.env.MAP_TOKEN})

module.exports.stores = async (req, res ) => {
    const owner = req.user._id;
    const stores = await Store.find({ owner});

    res.render('stores/', {title: 'Store list'})
}

module.exports.createStores = async (req, res) => {
    res.render('stores/new', { title: 'New Store'});
}