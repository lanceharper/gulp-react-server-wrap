gulp-react-server-wrap
======================

Wraps file contents with specified server rendered React component.

## Usage

### `components/markedContents.jsx`

```jsx
var marked = require('marked');
var React = require('react');

module.exports = React.createClass({

  render: function() {
    var markedContents = marked(this.props.contents);
    return (
      <div dangerouslySetInnerHTML={{__html: markedContents}}/>
    );
  }
});
```

### `src/greeting.md`

```markdown
# Hello
```

### `gulpfile.js`

```js
var gulp = require('gulp');
var rename = require('gulp-rename');
var reactServerWrap = require('./plugins/gulp-react-server-wrap'); //not on npm 

gulp.task('default', function () {
	return gulp.src('src/greeting.md')
		.pipe(reactServerWrap({
      src: '../components/markedContents.jsx',
      preserveAttributes: true
    }))
    .pipe(rename({extname: '.html'}))
	  .pipe(gulp.dest('dist'));
});
```

### `dist/greeting.html`

```html
<div>
  <h1 data-reactid=".b3mash4k5c" data-react-checksum="-49206068">Hello</h1>
</div>
```
