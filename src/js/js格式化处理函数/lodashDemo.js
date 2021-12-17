const _  = require('lodash')

var object = { 'a': [{ 'b': { 'c': 3 } }] };

_.get(object, 'a[1].b.c')