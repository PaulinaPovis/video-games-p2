const URL = require('url').URL

class Router {
    _routes = []
    _baseUrl = 'http://[::1]:' + (process.env.PORT || 5000)

    constructor() {

    }

    use(url, callback) {
        const _url = new URL(url, this._baseUrl).pathname
        let basePath = _url.replace(/^\/+|\/+$/g, '')
        callback.routes.forEach((route) => {
            let method = route.method
            let controller = route.controller
            let path = '/' + basePath
            let params = []
            route.path.split('/').forEach((p, i) => {
                if (p) {
                    let key = p.split(':')[1]
                    if (key) {
                        params[i + 1] = key
                        path += '/([0-9a-z]+)'
                    }
                    else {
                        path += '/' + p
                    }
                }

            })
            path = new RegExp(path + '$')
            this._routes.push({ path, method, controller, params })
        })
        // console.log(this._routes)
    }

    // Función privada
    async route(req, res) {
        //add cors
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


        const url = new URL(req.url, this._baseUrl)
        const method = req.method.toLowerCase()
        const route = await this._routes.find((route) => {
            const methodMatch = route.method === method;
            const pathMatch = url.pathname.match(route.path);
            return pathMatch && methodMatch;
        });
        if (route) {
            req.query = await this.getQuery(url)
            req.params = await this.getParams(url.pathname, route.params)
            req.body = ""
            req.on('data', chuck => req.body += chuck)
            req.on('end', () => route.controller(req, res))
        }
        else {
            this.notFound(res)
        }

    }

    notFound(res) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({}))
    }

    getQuery(uri) {
        // Get all querys from url
        let query = {}
        for (const name of uri.searchParams.keys()) {
            query[name] = uri.searchParams.get(name)
        }
        console.log('Query', JSON.stringify(query))
        return query
    }

    getParams(pathname, params) {
        let objParams = {}
        params.forEach((p, i) => {
            if (p)
                objParams[p] = pathname.split('/')[i]
        })
        console.log('Params', JSON.stringify(objParams))
        return objParams
    }

    getBodyForm(req) { }

}
const router = new Router()
module.exports = { router }