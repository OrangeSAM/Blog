---
title: cheerio 使用说明
---
cheerio
Fast, flexible & lean implementation of core jQuery designed specifically for the server.
专为服务端设计的快速灵活轻巧的jQuery核心实现。


```
const cheerio = require('cheerio')
const $ = cheerio.load('<h2 class="title">Hello world</h2>')

$('h2.title').text('Hello there!')
$('h2').addClass('welcome')

$.html()
//=> <h2 class="title welcome">Hello there!</h2>
```

注意
我们现在正在master分支上开发cheerio的1.0.0版本。上一个已发布版本0.22.0的源代码可以在[这里](https://github.com/cheeriojs/cheerio/tree/aa90399c9c02f12432bfff97b8f1c7d8ece7c307)找到

安装
`npm install cheerio`

特性
相似的语法： cheerio实现了jQuery核心的一个子集。
Features
❤ Familiar syntax: Cheerio implements a subset of core jQuery. Cheerio removes all the DOM inconsistencies and browser cruft from the jQuery library, revealing its truly gorgeous API.

ϟ Blazingly fast: Cheerio works with a very simple, consistent DOM model. As a result parsing, manipulating, and rendering are incredibly efficient.

❁ Incredibly flexible: Cheerio wraps around @FB55's forgiving htmlparser2. Cheerio can parse nearly any HTML or XML document.

Cheerio is not a web browser
Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. It does not interpret the result as a web browser does. Specifically, it does not produce a visual rendering, apply CSS, load external resources, or execute JavaScript. If your use case requires any of this functionality, you should consider projects like PhantomJS or JSDom.

Sponsors
Does your company use Cheerio in production? Please consider sponsoring this project. Your help will allow maintainers to dedicate more time and resources to its development and support.

                             

Backers
Become a backer to show your support for Cheerio and help us maintain and improve this open source project.

                             

API
Table of contents
Selectors
Attributes
Forms
Traversing
Manipulation
Markup example we'll be using:
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
  <li class="pear">Pear</li>
</ul>
This is the HTML markup we will be using in all of the API examples.

Loading
First you need to load in the HTML. This step in jQuery is implicit, since jQuery operates on the one, baked-in DOM. With Cheerio, we need to pass in the HTML document.

This is the preferred method:

const cheerio = require('cheerio');
const $ = cheerio.load('<ul id="fruits">...</ul>');
Optionally, you can also load in the HTML by passing the string as the context:

const $ = require('cheerio');
$('ul', '<ul id="fruits">...</ul>');
Or as the root:

const $ = require('cheerio');
$('li', 'ul', '<ul id="fruits">...</ul>');
You can also pass an extra object to .load() if you need to modify any of the default parsing options:

const $ = cheerio.load('<ul id="fruits">...</ul>', {
    normalizeWhitespace: true,
    xmlMode: true
});
These parsing options are taken directly from htmlparser2, therefore any options that can be used in htmlparser2 are valid in cheerio as well. The default options are:

{
    withDomLvl1: true,
    normalizeWhitespace: false,
    xmlMode: false,
    decodeEntities: true
}
For a full list of options and their effects, see this and htmlparser2's options.

Selectors
Cheerio's selector implementation is nearly identical to jQuery's, so the API is very similar.

$( selector, [context], [root] )
selector searches within the context scope which searches within the root scope. selector and context can be a string expression, DOM Element, array of DOM elements, or cheerio object. root is typically the HTML document string.

This selector method is the starting point for traversing and manipulating the document. Like jQuery, it's the primary method for selecting elements in the document, but unlike jQuery it's built on top of the CSSSelect library, which implements most of the Sizzle selectors.

$('.apple', '#fruits').text()
//=> Apple

$('ul .pear').attr('class')
//=> pear

$('li[class=orange]').html()
//=> Orange
XML Namespaces
You can select with XML Namespaces but due to the CSS specification, the colon (:) needs to be escaped for the selector to be valid.

$('[xml\\:id="main"');
Attributes
Methods for getting and modifying attributes.

.attr( name, value )
Method for getting and setting attributes. Gets the attribute value for only the first element in the matched set. If you set an attribute's value to null, you remove that attribute. You may also pass a map and function like jQuery.

$('ul').attr('id')
//=> fruits

$('.apple').attr('id', 'favorite').html()
//=> <li class="apple" id="favorite">Apple</li>
See http://api.jquery.com/attr/ for more information

.prop( name, value )
Method for getting and setting properties. Gets the property value for only the first element in the matched set.

$('input[type="checkbox"]').prop('checked')
//=> false

$('input[type="checkbox"]').prop('checked', true).val()
//=> ok
See http://api.jquery.com/prop/ for more information

.data( name, value )
Method for getting and setting data attributes. Gets or sets the data attribute value for only the first element in the matched set.

$('<div data-apple-color="red"></div>').data()
//=> { appleColor: 'red' }

$('<div data-apple-color="red"></div>').data('apple-color')
//=> 'red'

const apple = $('.apple').data('kind', 'mac')
apple.data('kind')
//=> 'mac'
See http://api.jquery.com/data/ for more information

.val( [value] )
Method for getting and setting the value of input, select, and textarea. Note: Support for map, and function has not been added yet.

$('input[type="text"]').val()
//=> input_text

$('input[type="text"]').val('test').html()
//=> <input type="text" value="test"/>
.removeAttr( name )
Method for removing attributes by name.

$('.pear').removeAttr('class').html()
//=> <li>Pear</li>
.hasClass( className )
Check to see if any of the matched elements have the given className.

$('.pear').hasClass('pear')
//=> true

$('apple').hasClass('fruit')
//=> false

$('li').hasClass('pear')
//=> true
.addClass( className )
Adds class(es) to all of the matched elements. Also accepts a function like jQuery.

$('.pear').addClass('fruit').html()
//=> <li class="pear fruit">Pear</li>

$('.apple').addClass('fruit red').html()
//=> <li class="apple fruit red">Apple</li>
See http://api.jquery.com/addClass/ for more information.

.removeClass( [className] )
Removes one or more space-separated classes from the selected elements. If no className is defined, all classes will be removed. Also accepts a function like jQuery.

$('.pear').removeClass('pear').html()
//=> <li class="">Pear</li>

$('.apple').addClass('red').removeClass().html()
//=> <li class="">Apple</li>
See http://api.jquery.com/removeClass/ for more information.

.toggleClass( className, [switch] )
Add or remove class(es) from the matched elements, depending on either the class's presence or the value of the switch argument. Also accepts a function like jQuery.

$('.apple.green').toggleClass('fruit green red').html()
//=> <li class="apple fruit red">Apple</li>

$('.apple.green').toggleClass('fruit green red', true).html()
//=> <li class="apple green fruit red">Apple</li>
See http://api.jquery.com/toggleClass/ for more information.

.is( selector )
.is( element )
.is( selection )
.is( function(index) )
Checks the current list of elements and returns true if any of the elements match the selector. If using an element or Cheerio selection, returns true if any of the elements match. If using a predicate function, the function is executed in the context of the selected element, so this refers to the current element.

Forms
.serialize()
Encodes a set of form elements as a URL query string.

$('<form><input name="foo" value="bar" checked /><input name="foo" value="qux" checked /></form>').serialize()
//=> foo=bar&foo=qux
.serializeArray()
Encode a set of form elements as an array of names and values.

$('<form><input name="foo" value="bar" /></form>').serializeArray()
//=> [ { name: 'foo', value: 'bar' } ]
Traversing
.find(selector)
.find(selection)
.find(node)
Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.

$('#fruits').find('li').length
//=> 3
$('#fruits').find($('.apple')).length
//=> 1
.parent([selector])
Get the parent of each element in the current set of matched elements, optionally filtered by a selector.

$('.pear').parent().attr('id')
//=> fruits
.parents([selector])
Get a set of parents filtered by selector of each element in the current set of match elements.

$('.orange').parents().length
// => 2
$('.orange').parents('#fruits').length
// => 1
.parentsUntil([selector][,filter])
Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or cheerio object.

$('.orange').parentsUntil('#food').length
// => 1
.closest(selector)
For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.

$('.orange').closest()
// => []
$('.orange').closest('.apple')
// => []
$('.orange').closest('li')
// => [<li class="orange">Orange</li>]
$('.orange').closest('#fruits')
// => [<ul id="fruits"> ... </ul>]
.next([selector])
Gets the next sibling of the first selected element, optionally filtered by a selector.

$('.apple').next().hasClass('orange')
//=> true
.nextAll([selector])
Gets all the following siblings of the first selected element, optionally filtered by a selector.

$('.apple').nextAll()
//=> [<li class="orange">Orange</li>, <li class="pear">Pear</li>]
$('.apple').nextAll('.orange')
//=> [<li class="orange">Orange</li>]
.nextUntil([selector], [filter])
Gets all the following siblings up to but not including the element matched by the selector, optionally filtered by another selector.

$('.apple').nextUntil('.pear')
//=> [<li class="orange">Orange</li>]
.prev([selector])
Gets the previous sibling of the first selected element optionally filtered by a selector.

$('.orange').prev().hasClass('apple')
//=> true
.prevAll([selector])
Gets all the preceding siblings of the first selected element, optionally filtered by a selector.

$('.pear').prevAll()
//=> [<li class="orange">Orange</li>, <li class="apple">Apple</li>]
$('.pear').prevAll('.orange')
//=> [<li class="orange">Orange</li>]
.prevUntil([selector], [filter])
Gets all the preceding siblings up to but not including the element matched by the selector, optionally filtered by another selector.

$('.pear').prevUntil('.apple')
//=> [<li class="orange">Orange</li>]
.slice( start, [end] )
Gets the elements matching the specified range

$('li').slice(1).eq(0).text()
//=> 'Orange'

$('li').slice(1, 2).length
//=> 1
.siblings([selector])
Gets the first selected element's siblings, excluding itself.

$('.pear').siblings().length
//=> 2

$('.pear').siblings('.orange').length
//=> 1
.children([selector])
Gets the children of the first selected element.

$('#fruits').children().length
//=> 3

$('#fruits').children('.pear').text()
//=> Pear
.contents()
Gets the children of each element in the set of matched elements, including text and comment nodes.

$('#fruits').contents().length
//=> 3
.each( function(index, element) )
Iterates over a cheerio object, executing a function for each matched element. When the callback is fired, the function is fired in the context of the DOM element, so this refers to the current element, which is equivalent to the function parameter element. To break out of the each loop early, return with false.

const fruits = [];

$('li').each(function(i, elem) {
  fruits[i] = $(this).text();
});

fruits.join(', ');
//=> Apple, Orange, Pear
.map( function(index, element) )
Pass each element in the current matched set through a function, producing a new Cheerio object containing the return values. The function can return an individual data item or an array of data items to be inserted into the resulting set. If an array is returned, the elements inside the array are inserted into the set. If the function returns null or undefined, no element will be inserted.

$('li').map(function(i, el) {
  // this === el
  return $(this).text();
}).get().join(' ');
//=> "apple orange pear"
.filter( selector )
.filter( selection )
.filter( element )
.filter( function(index, element) )
Iterates over a cheerio object, reducing the set of selector elements to those that match the selector or pass the function's test. When a Cheerio selection is specified, return only the elements contained in that selection. When an element is specified, return only that element (if it is contained in the original selection). If using the function method, the function is executed in the context of the selected element, so this refers to the current element.

Selector:

$('li').filter('.orange').attr('class');
//=> orange
Function:

$('li').filter(function(i, el) {
  // this === el
  return $(this).attr('class') === 'orange';
}).attr('class')
//=> orange
.not( selector )
.not( selection )
.not( element )
.not( function(index, elem) )
Remove elements from the set of matched elements. Given a jQuery object that represents a set of DOM elements, the .not() method constructs a new jQuery object from a subset of the matching elements. The supplied selector is tested against each element; the elements that don't match the selector will be included in the result. The .not() method can take a function as its argument in the same way that .filter() does. Elements for which the function returns true are excluded from the filtered set; all other elements are included.

Selector:

$('li').not('.apple').length;
//=> 2
Function:

$('li').not(function(i, el) {
  // this === el
  return $(this).attr('class') === 'orange';
}).length;
//=> 2
.has( selector )
.has( element )
Filters the set of matched elements to only those which have the given DOM element as a descendant or which have a descendant that matches the given selector. Equivalent to .filter(':has(selector)').

Selector:

$('ul').has('.pear').attr('id');
//=> fruits
Element:

$('ul').has($('.pear')[0]).attr('id');
//=> fruits
.first()
Will select the first element of a cheerio object

$('#fruits').children().first().text()
//=> Apple
.last()
Will select the last element of a cheerio object

$('#fruits').children().last().text()
//=> Pear
.eq( i )
Reduce the set of matched elements to the one at the specified index. Use .eq(-i) to count backwards from the last selected element.

$('li').eq(0).text()
//=> Apple

$('li').eq(-1).text()
//=> Pear
.get( [i] )
Retrieve the DOM elements matched by the Cheerio object. If an index is specified, retrieve one of the elements matched by the Cheerio object:

$('li').get(0).tagName
//=> li
If no index is specified, retrieve all elements matched by the Cheerio object:

$('li').get().length
//=> 3
.index()
.index( selector )
.index( nodeOrSelection )
Search for a given element from among the matched elements.

$('.pear').index()
//=> 2
$('.orange').index('li')
//=> 1
$('.apple').index($('#fruit, li'))
//=> 1
.end()
End the most recent filtering operation in the current chain and return the set of matched elements to its previous state.

$('li').eq(0).end().length
//=> 3
.add( selector [, context] )
.add( element )
.add( elements )
.add( html )
.add( selection )
Add elements to the set of matched elements.

$('.apple').add('.orange').length
//=> 2
.addBack( [filter] )
Add the previous set of elements on the stack to the current set, optionally filtered by a selector.

$('li').eq(0).addBack('.orange').length
//=> 2
Manipulation
Methods for modifying the DOM structure.

.append( content, [content, ...] )
Inserts content as the last child of each of the selected elements.

$('ul').append('<li class="plum">Plum</li>')
$.html()
//=>  <ul id="fruits">
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//      <li class="plum">Plum</li>
//    </ul>
.appendTo( target )
Insert every element in the set of matched elements to the end of the target.

$('<li class="plum">Plum</li>').appendTo('#fruits')
$.html()
//=>  <ul id="fruits">
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//      <li class="plum">Plum</li>
//    </ul>
.prepend( content, [content, ...] )
Inserts content as the first child of each of the selected elements.

$('ul').prepend('<li class="plum">Plum</li>')
$.html()
//=>  <ul id="fruits">
//      <li class="plum">Plum</li>
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
.prependTo( target )
Insert every element in the set of matched elements to the beginning of the target.

$('<li class="plum">Plum</li>').prependTo('#fruits')
$.html()
//=>  <ul id="fruits">
//      <li class="plum">Plum</li>
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
.after( content, [content, ...] )
Insert content next to each element in the set of matched elements.

$('.apple').after('<li class="plum">Plum</li>')
$.html()
//=>  <ul id="fruits">
//      <li class="apple">Apple</li>
//      <li class="plum">Plum</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
.insertAfter( target )
Insert every element in the set of matched elements after the target.

$('<li class="plum">Plum</li>').insertAfter('.apple')
$.html()
//=>  <ul id="fruits">
//      <li class="apple">Apple</li>
//      <li class="plum">Plum</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
.before( content, [content, ...] )
Insert content previous to each element in the set of matched elements.

$('.apple').before('<li class="plum">Plum</li>')
$.html()
//=>  <ul id="fruits">
//      <li class="plum">Plum</li>
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
.insertBefore( target )
Insert every element in the set of matched elements before the target.

$('<li class="plum">Plum</li>').insertBefore('.apple')
$.html()
//=>  <ul id="fruits">
//      <li class="plum">Plum</li>
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
.remove( [selector] )
Removes the set of matched elements from the DOM and all their children. selector filters the set of matched elements to be removed.

$('.pear').remove()
$.html()
//=>  <ul id="fruits">
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//    </ul>
.replaceWith( content )
Replaces matched elements with content.

const plum = $('<li class="plum">Plum</li>')
$('.pear').replaceWith(plum)
$.html()
//=> <ul id="fruits">
//     <li class="apple">Apple</li>
//     <li class="orange">Orange</li>
//     <li class="plum">Plum</li>
//   </ul>
.empty()
Empties an element, removing all its children.

$('ul').empty()
$.html()
//=>  <ul id="fruits"></ul>
.html( [htmlString] )
Gets an html content string from the first selected element. If htmlString is specified, each selected element's content is replaced by the new content.

$('.orange').html()
//=> Orange

$('#fruits').html('<li class="mango">Mango</li>').html()
//=> <li class="mango">Mango</li>
.text( [textString] )
Get the combined text contents of each element in the set of matched elements, including their descendants. If textString is specified, each selected element's content is replaced by the new text content.

$('.orange').text()
//=> Orange

$('ul').text()
//=>  Apple
//    Orange
//    Pear
.wrap( content )
The .wrap() function can take any string or object that could be passed to the $() factory function to specify a DOM structure. This structure may be nested several levels deep, but should contain only one inmost element. A copy of this structure will be wrapped around each of the elements in the set of matched elements. This method returns the original set of elements for chaining purposes.

const redFruit = $('<div class="red-fruit"></div>')
$('.apple').wrap(redFruit)

//=> <ul id="fruits">
//     <div class="red-fruit">
//      <li class="apple">Apple</li>
//     </div>
//     <li class="orange">Orange</li>
//     <li class="plum">Plum</li>
//   </ul>

const healthy = $('<div class="healthy"></div>')
$('li').wrap(healthy)

//=> <ul id="fruits">
//     <div class="healthy">
//       <li class="apple">Apple</li>
//     </div>
//     <div class="healthy">
//       <li class="orange">Orange</li>
//     </div>
//     <div class="healthy">
//        <li class="plum">Plum</li>
//     </div>
//   </ul>
.css( [propertyName] )
.css( [ propertyNames] )
.css( [propertyName], [value] )
.css( [propertyName], [function] )
.css( [properties] )
Get the value of a style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.

Rendering
When you're ready to render the document, you can use the html utility function:

$.html()
//=>  <ul id="fruits">
//      <li class="apple">Apple</li>
//      <li class="orange">Orange</li>
//      <li class="pear">Pear</li>
//    </ul>
If you want to return the outerHTML you can use $.html(selector):

$.html('.pear')
//=> <li class="pear">Pear</li>
By default, html will leave some tags open. Sometimes you may instead want to render a valid XML document. For example, you might parse the following XML snippet:

const $ = cheerio.load('<media:thumbnail url="http://www.foo.com/keyframe.jpg" width="75" height="50" time="12:05:01.123"/>');
... and later want to render to XML. To do this, you can use the 'xml' utility function:

$.xml()
//=>  <media:thumbnail url="http://www.foo.com/keyframe.jpg" width="75" height="50" time="12:05:01.123"/>
You may also render the text content of a Cheerio object using the text static method:

const $ = cheerio.load('This is <em>content</em>.')
$.text()
//=> This is content.
The method may be called on the Cheerio module itself--be sure to pass a collection of nodes!

const $ = cheerio.load('<div>This is <em>content</em>.</div>')
cheerio.text($('div'))
//=> This is content.
Miscellaneous
DOM element methods that don't fit anywhere else

.toArray()
Retrieve all the DOM elements contained in the jQuery set as an array.

$('li').toArray()
//=> [ {...}, {...}, {...} ]
.clone()
Clone the cheerio object.

const moreFruit = $('#fruits').clone()
Utilities
$.root
Sometimes you need to work with the top-level root element. To query it, you can use $.root().

$.root().append('<ul id="vegetables"></ul>').html();
//=> <ul id="fruits">...</ul><ul id="vegetables"></ul>
$.contains( container, contained )
Checks to see if the contained DOM element is a descendant of the container DOM element.

$.parseHTML( data [, context ] [, keepScripts ] )
Parses a string into an array of DOM nodes. The context argument has no meaning for Cheerio, but it is maintained for API compatibility.

$.load( html[, options ] )
Load in the HTML. (See the previous section titled "Loading" for more information.)

Plugins
Once you have loaded a document, you may extend the prototype or the equivalent fn property with custom plugin methods:

const $ = cheerio.load('<html><body>Hello, <b>world</b>!</body></html>');
$.prototype.logHtml = function() {
  console.log(this.html());
};

$('body').logHtml(); // logs "Hello, <b>world</b>!" to the console
The "DOM Node" object
Cheerio collections are made up of objects that bear some resemblance to browser-based DOM nodes. You can expect them to define the following properties:

tagName
parentNode
previousSibling
nextSibling
nodeValue
firstChild
childNodes
lastChild
Screencasts
http://vimeo.com/31950192

This video tutorial is a follow-up to Nettut's "How to Scrape Web Pages with Node.js and jQuery", using cheerio instead of JSDOM + jQuery. This video shows how easy it is to use cheerio and how much faster cheerio is than JSDOM + jQuery.

Contributors
These are some of the contributors that have made cheerio possible:

project  : cheerio
 repo age : 2 years, 6 months
 active   : 285 days
 commits  : 762
 files    : 36
 authors  :
   293  Matt Mueller            38.5%
   133  Matthew Mueller         17.5%
    92  Mike Pennisi            12.1%
    54  David Chambers          7.1%
    30  kpdecker                3.9%
    19  Felix Böhm             2.5%
    17  fb55                    2.2%
    15  Siddharth Mahendraker   2.0%
    11  Adam Bretz              1.4%
     8  Nazar Leush             1.0%
     7  ironchefpython          0.9%
     6  Jarno Leppänen         0.8%
     5  Ben Sheldon             0.7%
     5  Jos Shepherd            0.7%
     5  Ryan Schmukler          0.7%
     5  Steven Vachon           0.7%
     4  Maciej Adwent           0.5%
     4  Amir Abu Shareb         0.5%
     3  jeremy.dentel@brandingbrand.com 0.4%
     3  Andi Neck               0.4%
     2  steve                   0.3%
     2  alexbardas              0.3%
     2  finspin                 0.3%
     2  Ali Farhadi             0.3%
     2  Chris Khoo              0.3%
     2  Rob Ashton              0.3%
     2  Thomas Heymann          0.3%
     2  Jaro Spisak             0.3%
     2  Dan Dascalescu          0.3%
     2  Torstein Thune          0.3%
     2  Wayne Larsen            0.3%
     1  Timm Preetz             0.1%
     1  Xavi                    0.1%
     1  Alex Shaindlin          0.1%
     1  mattym                  0.1%
     1  Felix Böhm            0.1%
     1  Farid Neshat            0.1%
     1  Dmitry Mazuro           0.1%
     1  Jeremy Hubble           0.1%
     1  nevermind               0.1%
     1  Manuel Alabor           0.1%
     1  Matt Liegey             0.1%
     1  Chris O'Hara            0.1%
     1  Michael Holroyd         0.1%
     1  Michiel De Mey          0.1%
     1  Ben Atkin               0.1%
     1  Rich Trott              0.1%
     1  Rob "Hurricane" Ashton  0.1%
     1  Robin Gloster           0.1%
     1  Simon Boudrias          0.1%
     1  Sindre Sorhus           0.1%
     1  xiaohwan                0.1%
Cheerio in the real world
Are you using cheerio in production? Add it to the wiki!

Testing
To run the test suite, download the repository, then within the cheerio directory, run:

make setup
make test
This will download the development packages and run the test suite.

Special Thanks
This library stands on the shoulders of some incredible developers. A special thanks to:

• @FB55 for node-htmlparser2 & CSSSelect: Felix has a knack for writing speedy parsing engines. He completely re-wrote both @tautologistic's node-htmlparser and @harry's node-soupselect from the ground up, making both of them much faster and more flexible. Cheerio would not be possible without his foundational work

• @jQuery team for jQuery: The core API is the best of its class and despite dealing with all the browser inconsistencies the code base is extremely clean and easy to follow. Much of cheerio's implementation and documentation is from jQuery. Thanks guys.

• @visionmedia: The style, the structure, the open-source"-ness" of this library comes from studying TJ's style and using many of his libraries. This dude consistently pumps out high-quality libraries and has always been more than willing to help or answer questions. You rock TJ.

License
MIT