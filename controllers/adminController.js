const user = require('../models/userModels');

module.exports.index = async (_, res) => {
    const users = await user.find();
    res.render('index', {search_placeholder: 'Search users, orders, reports', users, sideT: 'dashboard'})
}

module.exports.users = async (_, res) => {
    const users = await user.find();
    res.render('users', {search_placeholder: 'Search users, roles, teams', users, sideT: 'users'});
}

module.exports.adduser = (_, res) => {
    res.render('adduser', {search_placeholder: 'Search users, roles, teams', sideT: 'adduser'})
}

module.exports.edituser = async (req, res) => {
    const user_ = await user.findById(req.params.id);
    res.render('editUser', {search_placeholder: 'Search users, roles, teams', user: user_, sideT: 'edituser'})
}