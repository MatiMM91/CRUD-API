function index(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM autos', (err, cars) => {
            if (err) {
                res.json(err);
            };
            res.render('cars/index', {cars});
        });
    });
}

function create(req, res) {
    res.render('cars/create');
}


function store(req, res) {
    if (req.body.seguro === 'true') {
        req.body.seguro = JSON.parse('true');     
    }

    if (req.body.seguro === 'false') {
        req.body.seguro = JSON.parse('false');
    }

    const data = req.body;

    console.log(data)
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO autos SET ?', [data], 
            (err, rows) => {
                res.redirect('/cars');
            }
        )
    });
}

function edit(req, res) {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM autos WHERE id = ?', [id], (err, cars) => {
            if (err) {
                res.json(err);
            };

            if (req.body.seguro === 1) {
                req.body.seguro = 'true';     
            }
        
            if (req.body.seguro === 0) {
                req.body.seguro = 'false';
            }

            res.render('cars/edit', {cars});
        });
    });
}

function update(req, res) {

    if (req.body.seguro === 'true') {
        req.body.seguro = JSON.parse('true');     
    }

    if (req.body.seguro === 'false') {
        req.body.seguro = JSON.parse('false');
    }

    const id = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE autos SET ? WHERE id = ?', [data, id], (err, cars) => {
            res.redirect('/cars');
        })
    })
}

function destroy(req, res) {
    const id = req.body.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM autos WHERE id = ?', [id], 
        (err, rows) => {
            res.redirect('/cars')
        })
    })
}

module.exports = {
    index: index,
    create: create,
    store: store,
    edit: edit,
    update: update,
    destroy: destroy,
}