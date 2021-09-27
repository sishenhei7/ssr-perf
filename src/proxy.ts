import http from 'http'
import httpProxy from 'http-proxy'
import { createClient } from 'redis';
import zlib from 'zlib'

const redisClient = createClient()

export interface proxyOptions {
  origin: string,
  port: number,
  cacheList?: string[],
  timeout?: number,
  proxyTimeout?: number
}

export default class Proxy {
  private useCache: boolean
  private cacheList: string[]
  private server: httpProxy

  constructor(option: proxyOptions) {
    this.cacheList = option.cacheList || []
    this.useCache = this.cacheList.length > 0
    this.server = this.createServer(option)

    this.server.listen(option.port)
    this.server.on('listening', this.listeningHandler.bind(this))
    this.server.on('listening', this.errorHandler.bind(this))

    if (this.useCache) {
      this.server.on('proxyReq', this.proxyReqHandler.bind(this))
      this.server.on('proxyRes', this.proxyResHandler.bind(this))
    }
  }

  createServer(option: proxyOptions) {
    return httpProxy.createServer({
      target: option.origin,
      changeOrigin: true,
      timeout: 6000,
      proxyTimeout: 6000,
    })
  }

  listeningHandler() {
    console.log('--- Waiting for requests...')
  }

  errorHandler(err: Error, req: http.IncomingMessage, res: http.ServerResponse) {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });

    console.log('--- proxy error ')
    res.end('Something went wrong. And we are reporting a custom error message.');
  }

  proxyReqHandler(){

  }

  proxyResHandler() {

  }

  getReqKey() {

  }

}
