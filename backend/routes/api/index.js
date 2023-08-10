const router = require('express').Router();
const sessionRouter = require('./current-session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/current-session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

router.get("/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});

module.exports = router;
