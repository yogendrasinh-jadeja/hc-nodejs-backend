import {serve} from 'bun'
// const serve = require('bun')

serve({
    fetch(request){
        const url = new URL(request.url)
        if(url.pathname === "/"){
            return new Response("Hello Bun",{status:200})
        }
        else if(url.pathname === "/mazza"){
            return new Response("Hello mazza",{status:200})
        }
        else{
            return new Response("404 Not Found",{status:404})
        }
    },
    port: 3000,
    hostname:'127.0.0.1'
})