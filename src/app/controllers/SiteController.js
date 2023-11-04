class SiteController {
    // [GET] /
    index(req, res, next) {
        res.send(`<h1>Home Page</h1>`);
        // Course.find({})
        //     .then((courses) => res.json(courses))
        //     .catch(next);
    }

    // [GET] /about
    about(req, res) {
        res.send(`<h1>About Page</h1>`);
    }

    // [GET] /services
    services(req, res) {
        res.send(`<h1>Services Page</h1>`);
    }

    // [GET] /contact
    contact(req, res) {
        res.send(`<h1>Contact Page</h1>`);
    }
}

module.exports = new SiteController();
