const express = require("express"),
    session = require("express-session"),
    passport = require("passport"),
    Auth0Strategy = require("passport-auth0"),
    cors = require('cors'),
    bodyParser = require('body-parser')
massive = require('massive')
config = require('./config.js')
moment = require('moment')

const app = express();

app.use(bodyParser.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "ohiostate"
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + "./../public"))


// MASSIVE ===============================
massive(config.database).then(db => {
    app.set('db', db);
});


passport.use(new Auth0Strategy({
    domain: config.domain,
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
}, function (assesToken, refreshToken, extraParams, profile, done) {

    var db = app.get('db')
    //Find user in database
    db.getUserByAuthId(profile.id).then(function (user) {
        user = user[0];
        if (!user) { //if there isn't one, we'll create one!
            console.log('CREATING USER');
            db.createUserByAuth([profile.displayName, profile.id]).then(function (user) {
                console.log('USER CREATED', user);
                return done(null, user[0]); // GOES TO SERIALIZE USER
            })
        } else { //when we find the user, return it
            console.log('FOUND USER', user);
            return done(null, user);
        }
    })
}));

// Auth Endpoints ===============================


app.get('/auth', passport.authenticate('auth0'));


app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/'
}), function (req, res) {

    res.status(200).send(req.user);
})

app.get('/auth/me', function (req, res) {
    console.log(req.user)
    if (!req.user) return res.sendStatus(404);
    res.status(200).send(req.user);
})

app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})


passport.serializeUser((userA, done) => {
    console.log('serializing', userA);
    var userB = userA;

    done(null, userB);
});

passport.deserializeUser((userB, done) => {
    var userC = userB;
    var db = app.get('db')

    done(null, userC)
})

// Post Endpoints ===============================
app.post('/api/add-event', (req, res, next) => {
    const { title, color, description, notes, start_time, end_time} = req.body

    let newStartTime = moment(start_time).format('LLLL')
    let newEndTime = moment(end_time).format('LLLL')
    console.log(newStartTime, newEndTime)

    req.app.get('db').addEvent([title, color, description, notes, newStartTime, newEndTime]).then(response => {
            console.log(response)

            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
});

// app.get('/api/get-events', (req, res, next) => {
//     req.app.get('db').getEvents().then((response) => {
//         res.send(response)
//     })
// })


// app.get('/api/recieve-event', (req, res, next) => {
//     req.app.get('db').receiveEvent().then((response) => {
//         res.send(response)
//     })
//     console.log(response)
// })
app.get('/api/get-grades', (req, res, next) => {
    req.app.get('db').getGrades().then((response) => {
        res.send(response)
    })
})

app.post('/api/update-grades', (req, res, next) => {
    const {name, grade} = req.body
    console.log(req.body)
    req.app.get('db').updateGrades([name, grade]).then(response => {
        console.log("UpdateGrades: ", response)
        res.status(200).send(response)
        })
});





app.listen(3000, function () {
    console.log("Connected on 3000")
})