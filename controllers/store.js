const Store = require('../db/models/store');

module.exports.stores = async (req, res ) => {
    const owner = req.user._id;
    const stores = await Store.find({ owner});

    res.render('stores/list', {title: 'Store list'})
}

module.exports.createStores = async (req, res) => {
    res.render('stores/new', { title: 'New Store'});
}