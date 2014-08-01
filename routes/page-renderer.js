module.exports.PageRenderer = function () {
    var title = 'Controlling AR Drone with GPS';
    var copyright = 'Copyright &copy; 2014 <a href="http://infidea.net">infidea.net</a>';
    return {
        index: function (req, res) {
            res.render('index', {
                title: title,
                copyright: copyright
            });
        },
        auto: function (req, res) {
            res.render('auto', {
                title: title,
                copyright: copyright,
                mode: "Auto Mode"
            });
        },
        manual: function (req, res) {
            res.render('manual', {
                title: title,
                copyright: copyright,
                mode: "Manual Mode"
            });
        }
    };
};
