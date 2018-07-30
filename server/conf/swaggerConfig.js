/**
 * 没有使用
 * 原因：
 * 1. 不够智能
 * 2. 使用起来不够方便，不能像py那样使用装饰器
*/
const SWAGGERCONFIG = {
  apiVersion: '1.0',
  swaggerVersion: '1.0',
  swaggerURL: '/swagger',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './public/swagger/',
  basePath: 'http://localhost:3000',
  info: {
    title: 'swagger-koa sample app',
    description: 'Swagger + Koa = {swagger-koa}'
  },
  apis: ['./api.js', './api.yml']
}

module.exports = SWAGGERCONFIG
