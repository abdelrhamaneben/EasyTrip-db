
var Log = require('log');
var log = new Log('');
var pg = require('pg');
var toSource = require('tosource');
var array = require('array');
var conString = "postgres://postgres:postgres@172.28.1.101/postgres";
var dba;


setConnexion();
getCategories();
/*closeConnexion();*/


function setConnexion() {
  dba = new pg.Client(conString);
  dba.connect(function(err) {
    if(err) {
      console.error('could not connect to postgres', err);
    }
  });
}

function closeConnexion() {
  if (dba != null) {
    dba.end();
  }
}

function getCategories() {

  var arrout = array();

  dba.query('select * from se.ET_CATEGORY', function(err, rows) {
    if(err) { return console.error('error running query', err); }

    console.log(toSource(rows));

    for (var row in rows) {
      arrout.push(
        array({
            id : rows[row].id_category,
            name : rows[row].name,
            description : rows[row].description
        })
      );
    }
  });

  return arrout;
}

