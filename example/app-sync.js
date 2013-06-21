var DataSource = require('jugglingdb').DataSource;

var ds = new DataSource(require('../'), {
    host: '127.0.0.1',
    database: 'XE',
    username: 'strongloop',
    password: 'password',
    debug: true
});

var results = ds.adapter.querySync('SELECT * from PRODUCT');
console.log(results);

results = ds.discoverModelDefinitionsSync({views: true, limit: 20});
console.log(results);

results = ds.discoverModelPropertiesSync('PRODUCT');
console.log(results);

results = ds.discoverModelPropertiesSync('INVENTORY_VIEW', {owner: 'STRONGLOOP'});
console.log(results);

results = ds.discoverPrimaryKeysSync('INVENTORY');
console.log(results);

results = ds.discoverForeignKeysSync('INVENTORY');
console.log(results);

results = ds.discoverForeignKeysSync('INVENTORY');
console.log(results);

results = ds.discoverExportedForeignKeysSync('PRODUCT');
console.log(results);


var models = ds.discoverAndBuildModelsSync('INVENTORY', {owner: 'STRONGLOOP', visited: {}, associations: true});

function show(err, models) {
    if (err) {
        console.error(err);
    } else {
        models.forEach(function(m) {
            console.dir(m);
        });
    }
}

for (var m in models) {
    models[m].all(show);
}