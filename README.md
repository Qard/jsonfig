# JSONFig
JSONFig makes it dead easy to manage a folder full of json config files your app depends on.

## Requirements
* Node.js 0.4+

## Install

    npm install jsonfig

## Usage

    jsonfig.env('production').load(__dirname+'/config', function (conf) {
      console.log(conf.get('redis.host'))
    })

#### jsonfig.env(name)
Sets the environment name to scope to in your json configs, if available.

#### jsonfig.path(path)
Sets the folder to load json configs. NOTE: sub directories aren't supported yet. I'll deal with that later.

#### jsonfig.load([path], callback)
This tells jsonfig to start loading the json files and run the callback when it's complete. The callback takes two arguments (err, conf)

#### conf.get(path)
As a little bonus, the conf object passed into the jsonfig.load() callback includes a handy little helper for searching for values using a dot-path string. For example; conf.get('redis.host')

---

### Copyright (c) 2011 Stephen Belanger
#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.