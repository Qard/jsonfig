/**
 * jsonfig - json config, simplified.
 * 
 * TODO: Support subdirectories
 */
// Load dependencies.
var p = require('path')
  , fs = require('fs')
  , DotPath = require('dotpath')

// Copy after() from underscore,
// since we don't need anything else.
function after (t, cb) {
  return function () {
    if (--t < 1) { return cb.apply(this, arguments) }
  }
}

// Add chainable masked property modifier to obj.
function addMProp (o, n, d) {
  var m = d
  o[n] = function (v) {
    if (typeof v === 'undefined') {
      return m
    }
    m = v
    return this
  }
}

// Construct jsonfig object.
var jsonfig = {
  load: function (cb) {
    if (typeof cb === 'string') {
      this.path(cb)
      cb = arguments[1]
    }

    var self = this, path = this.path(), obj = {}, noop = function(){}

    // Get list of all files in the defined path.
    fs.readdir(path, function (err, files) {
      if (err) { return cb(err) }

      // Filter out files not ending in .json
      var files = files.filter(function (f) {
        return p.extname(f) === '.json'
      })

      // This gets called after loading is done.
      var attempt = after(files.length, function () {
        finish(null, obj)
      })

      // Handles completions and errors.
      function finish (err, o) {
        attempt = noop
        if (err) return cb(err)
        cb(null, new DotPath(o))
      }

      // Start loading files.
      files.forEach(function (file) {

        // Get file info.
        fs.stat(path+'/'+file, function (err, stats) {
          // Ensure no errors occured and
          // that the file really is a file.
          if (err || ! stats.isFile()) {
            return finish(err || new Error('Not a file'))
          }

          // Read the contents.
          fs.readFile(path+'/'+file, function (err, data) {
            if (err) {
              return finish(err)
            }

            // Parse and insert env data or whole structure into obj.
            var json = JSON.parse(data)
            obj[p.basename(file, '.json')] = json[self.env().toLowerCase()] || json

            attempt()
          })
        })
      })
    })
  }
}

// Add chainable masked property modifiers.
addMProp(jsonfig, 'env', 'development')
addMProp(jsonfig, 'path', __dirname)

// Export jsonfig.
module.exports = jsonfig