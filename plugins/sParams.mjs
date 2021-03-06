﻿'set strict'

/** sParams Plugin: Handles URL parameters */

export class sParams {

  constructor(options) {

    var self = this

    // Parameter values
    this.params = {}

    // Default options
    if (typeof options !== 'object') {
      options = {}
    }

    // Callbacks for each param when changed
    this.onChange = options.hasOwnProperty('onChange') ? options.onChange : {}

    // Parse when URL hash changes
    window.onhashchange = function() {
      self.parse(true)
    }

    // Parse on init
    this.parse(false)

  }

  init(root) {

    // Reference to root
    this.root = root

    // Reference main params
    this.params = root.params

    // Update URL hash on init
    this.update()

  }

  // Update the URL hash with the parameters
  update() {
    window.location.hash = '#' + this._serialize(this.params)
  }

  // Parse parameters from the URL hash
  parse(runCallbacks) {
    var new_params = this._unserialize( window.location.hash.substr(1) )
    for (var i in new_params) {
      var old_param = this.params[i]

      // Int
      if (new_params[i] % 1 === 0) {
        this.params[i] = parseInt(new_params[i], 10)
      }
      // Float
      else if (new_params[i].includes('.')) {
        this.params[i] = parseFloat(new_params[i])
      }
      // Str
      else {
        this.params[i] = new_params[i]
      }

      if (runCallbacks && i in this.onChange && this.params[i] !== old_param) {
        this.onChange[i](this.params[i], this.root)
      }
    }
  }

  // Change a param to the new value
  set(param_id, new_value) {
    var old_param = this.params[param_id]
    this.params[param_id] = new_value
    if (param_id in this.onChange && this.params[param_id] !== old_param) {
      this.onChange[param_id](this.params[param_id], this.root)
    }
  }

  // Serialize params into a string
  // jquery-param (c) 2015 KNOWLEDGECODE | MIT
  _serialize(a) {
    var s = []
    var add = function (k, v) {
      v = typeof v === 'function' ? v() : v
      v = v === null ? '' : v === undefined ? '' : v
      s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v)
    }
    var buildParams = function (prefix, obj) {
      var i, len, key
      if (prefix) {
        if (Array.isArray(obj)) {
          for (i = 0, len = obj.length; i < len; i++) {
            buildParams(
              prefix + '[' + (typeof obj[i] === 'object' && obj[i] ? i : '') + ']',
              obj[i]
            )
          }
        } else if (String(obj) === '[object Object]') {
          for (key in obj) {
            buildParams(prefix + '[' + key + ']', obj[key])
          }
        } else {
          add(prefix, obj)
        }
      } else if (Array.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          add(obj[i].name, obj[i].value)
        }
      } else {
        for (key in obj) {
          buildParams(key, obj[key])
        }
      }
      return s
    }
    return buildParams('', a).join('&')
  }

  // Unserialize params from a string
  // based on https://stackoverflow.com/a/26849194
  _unserialize(s) {
    if (s.length === 0) return {}
    return s.split('&').reduce(function (params, param) {
      var paramSplit = param.split('=').map(function (value) {
        return decodeURIComponent(value.replace(/\\+/g, ' '))
      })
      params[paramSplit[0]] = paramSplit[1]
      return params
    }, {})
  }

}
