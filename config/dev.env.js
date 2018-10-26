'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  tbtHost:{
    url:'"/luoye_admin/"',
    host:'"http://192.168.0.139:80/luoye_admin"'
  }
})
