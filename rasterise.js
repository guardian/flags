/*global require, process, console */

(function ( fs, child_process ) {

	'use strict';

	var source, rasterised, cropped, scaled, converted, queue, rasteriseNextInQueue, crop, cropNextInQueue, targetSize, thumbNextInQueue;

	source     = 'source';
	rasterised = 'rasterised';

	fs.readdir( source, function ( err, dir ) {
		queue = dir;
		rasteriseNextInQueue();
	});

	rasteriseNextInQueue = function () {
		var item, sourceFile, targetFile, cmd, cp;

		if ( !queue.length ) {
			return;
		}

		item = queue.shift();

		if ( item === '.DS_Store' ) {
			rasteriseNextInQueue();
			return;
		}

		sourceFile = source + '/' + item;
		targetFile = rasterised + '/' + item.replace( 'svg', 'png' );

		console.log( 'Rasterising %s', item );
		cp = child_process.spawn( 'phantomjs', [ 'lib/rasterize.js', sourceFile, targetFile, '1000*1000', '5' ] );
		cp.on( 'exit', rasteriseNextInQueue );
	};

}( require( 'fs' ), require( 'child_process' ) ));