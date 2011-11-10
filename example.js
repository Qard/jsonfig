var jsonfig = require('./index')

// The env is switchable. Will be 'development' by default.
// You can also use fig.path() to set the path rather
// than supplying it as the first argument of load().
jsonfig.env('production').load(__dirname+'config', function (conf) {
  // Configs are loaded, let's use them.
  console.log(conf.redis.host)

  // You can also use the get() dot-location utility.
  console.log(conf.get('redis.host'))
  console.log(conf.get('redis').host)

  // If an object of the matching name
  // is not found in the json config,
  // the whole object will be used.
  console.log(conf.all_envs)
})