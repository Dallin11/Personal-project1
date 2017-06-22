const express = require("express"),
    session = require("express-session"),
    passport = require("passport"),
    Auth0Strategy = require("passport-auth0"),
    cors = require('cors'),
    bodyParser = require('body-parser')
    massive = require('massive')
    config = require('./config.js')

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
massive( config.database).then(db => {
    app.set('db', db);
});


passport.use(new Auth0Strategy({
    domain: "dallin.auth0.com",
    clientID: "6wK1I4iwfvXmWA3GcKk7UouQgbCSyYMf",
    clientSecret: "kNN8mrQALdroDrolf30yGyrZtJ2zX5ZI8GzG4cBGScmym-0wpjl8pmYorYsQDvUL",
    callbackURL: "/auth/callback"
}, function (assesToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
}));

// Auth Endpoints ===============================
app.get('/auth', passport.authenticate('auth0'));


app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/'
}), function (req, res) {
    // console.log(req.user)
    res.status(200).send(req.user);
})

app.get('/auth/me', function (req, res) {
    if (!req.user) return res.sendStatus(404);
    res.status(200).send(req.user);
})

app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

// Post Endpoints ===============================
app.post('/api/create-event', (req, res, next) => {
    const {subject, description, notes, time, color
} = req.body

req.app.get('db').createEvent([subject, description, notes, time, color]).then(response => {
        res.send(response[0])
    })
});
app.get('/api/get-event', (req, res, next) => {
    req.app.get('db'). getEvent().then((response) => {
       res.send(response)
    })
})
    
    app.post('/api/post-grades', (req, res, next) => {
         const {name, grade} = req.body
         console.log(req.body)
    req.app.get('db').updateGrades([name, grade]).then(res => {
        console.log(res)
    })
    });

app.get('/api/get-grades', (req, res, next) => {
    req.app.get('db').getGrades().then((response) => {
    res.send(response) 
    })
})

app.listen(3000, function () {
    console.log("Connected on 3000")
})