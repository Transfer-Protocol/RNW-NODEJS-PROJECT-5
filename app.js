const express = require('express');
const path = require('path');
const fs = require('fs');

const port = 32764;

const user = require('./models/userModels');

const adminRoute = require('./routes/adminRoutes');

const app = express();

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/assets/', express.static(path.join(__dirname, 'assets')));
app.use('/profile/photourl/', express.static(path.join(__dirname, 'profiles/photos')));


app.use('/', adminRoute);

app.post('/add-user', user.userPhoto, async (req, res) => {
    const {firstName, lastName, email, role, team} = req.body;
    const photoURL = req.file.filename;
    await user.create({
        firstName,
        lastName,
        email,
        role,
        team,
        photoURL
    });
    res.redirect('/');
});

app.post('/edit-user/:id', user.userPhoto, async (req, res) => {
    const {firstName, lastName, email, role, team, status} = req.body;
    const preData = await user.findById(req.params.id);
    let imagePath = preData.photoURL;
    if (req.file) {
        const oldPath = path.join(req.file.destination, imagePath);
        console.log(oldPath)
        fs.unlinkSync(oldPath);
        imagePath = req.file.filename;
    }

    await user.findByIdAndUpdate(req.params.id, {firstName, lastName, email, role, team, photoURL: imagePath, status});
    res.redirect('/');
});

app.get('/delete-user/:id', async (req, res) => {
    console.log('Moving pointer to delete...');
    const preData = await user.findById(req.params.id);
    fs.unlinkSync(path.join(__dirname, 'profiles', 'photos', preData.photoURL));
    await user.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(port, (err) => {
    if (err)
        console.log(err);
    else
        console.log('Server is listening on http://localhost:' + port);
})