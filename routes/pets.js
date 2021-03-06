var express = require('express');
var config = {database: 'pethotel'};
var pg = require('pg');

var router = express.Router();
var pool = new pg.Pool(config);


router.post('/',function(req,res){
  console.log('req.body::',req.body);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
      'insert into pets(owner_id,name,color,breed, display_flag) values($1,$2,$3,$4, $5) returning *;',
      [req.body.ownerName, req.body.petName,req.body.color,req.body.breed, 1],
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of post

router.put('/:pid',function(req,res){
  console.log('req.body::',req.body);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
       'UPDATE pets SET name=$2, breed=$3, color=$4 WHERE id = $1 RETURNING *',
                    [req.params.pid, req.body.petName, req.body.breed, req.body.color],
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of put

router.delete('/:pid',function(req,res){
  console.log('req.body::',req.body);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

     client.query(
       'UPDATE pets SET display_flag = 0 WHERE id = $1',
                    [req.params.pid],
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('posted info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});//end of post

module.exports = router;
