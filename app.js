
const http = require('http');
const  {userData} = require('./src/data/UserData');
const {router} = require('./src/component/Router');
const {routers} = require('./src/route/Routers');
//import { UserData } from "./src/model/UserData";

router.use('/api',routers);

const requestListener = function (req, res) {
  if(req)
    router.route(req,res);
}

const server = http.createServer(requestListener);
server.listen(3000);