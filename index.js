require('node-jsx').install();

var gutil = require('gulp-util');
var React = require('react');
var through = require('through2');

var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-react-server-wrap';

function gulpReactServerWrap(opts) {
  opts = opts || {};

  if (!opts.src) {
    throw new PluginError(PLUGIN_NAME, '"src" option required.');
  }

  var stream = through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      // do nothing if no contents
    }

    try {
      var transformedComponent = require(opts.src);
      var wrapWithComponent = React.createFactory(transformedComponent);
      var wrappedContents = wrapWithComponent({contents: String(file.contents)});
      var renderFn = opts.preserveAttributes ? React.renderToString : React.renderToStaticMarkup;
      var renderedWithWrapper = renderFn(wrappedContents);

      file.contents = new Buffer(renderedWithWrapper);
      cb(null, file);
    } catch (err) {
      cb(err);
    }
  });

  return stream;
};

module.exports = gulpReactServerWrap;
