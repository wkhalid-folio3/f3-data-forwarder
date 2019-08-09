var express = require('express');
var router = express.Router();
const axios = require('axios');

function makeCall(reqBody) {

  const axiosObject = {...{method:"get" , data:null, headers:null, timeout:60000} , ...reqBody};

  if(!axiosObject.url){
    return Promise.resolve({
      status: false,
      message: 'url cannot be undefined'
    });
  }

  return axios(axiosObject).then(
      resp => {
          return Promise.resolve({
            code:resp.status,
            responseHeaders: resp.headers,
            body: resp.data,
          });
      }
  );
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ status: true , message: "Server Alive" });
});

router.post('/forward-request' , function(req , res , next){
  makeCall(req.body).then(
    resp => {
      res.json(resp);
    }
  )
});

module.exports = router;
