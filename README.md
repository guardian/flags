##Pre-requisites
* [Node](http://nodejs.org/)
* [PhantomJS](http://phantomjs.org/) (`brew install phantomjs`)
* [GraphicsMagick](http://www.graphicsmagick.org/) (`brew install graphicsmagick`)
* [gm](http://aheckmann.github.com/gm/) (`npm install gm`) - already included in this repo


This is fairly quick and dirty - if you want to make this more configurable/reusable then by all means crack on.


##Step one - rasterise
For each SVG file in the `source` folder, create a hi-res PNG in the `rasterised` folder:

    `node rasterise`


##Step two - generate thumbs
For each PNG file in the `rasterised` folder, create a thumbnail JPEG *XXX* by *XXX* pixels large in the `converted` folder:

    `node thumb XXX`