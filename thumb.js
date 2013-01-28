/*global require, process, console */

(function ( fs, gm ) {

	'use strict';

	var cwd, source, rasterised, cropped, scaled, converted, queue, rasteriseNextInQueue, crop, cropNextInQueue, targetSize, thumbNextInQueue;

	cwd = process.cwd();

	rasterised = cwd + '/rasterised/';
	converted  = cwd + '/converted/';

	targetSize = process.argv[2] || 100;

	fs.readdir( rasterised, function ( err, dir ) {
		queue = dir;
		cropNextInQueue();
	});

	cropNextInQueue = function () {
		var item, sourceFile, targetFile, img;

		if ( !queue.length ) {
			return;
		}

		item = queue.shift();

		if ( item === '.DS_Store' ) {
			cropNextInQueue();
			return;
		}

		sourceFile = rasterised + item;
		targetFile = converted + item.replace( 'png', 'jpg' );

		console.log( 'cropping %s', sourceFile );

		img = gm( sourceFile ).size( function ( err, size ) {
			var offsetX, offsetY, side;

			if ( size.width > size.height ) {
				offsetX = ( size.width - size.height ) / 2;
				offsetY = 0;
				side = size.height;
			} else {
				offsetY = ( size.height - size.width ) / 2;
				offsetX = 0;
				side = size.width;
			}

			img.crop( side, side, offsetX, offsetY );
			img.scale( targetSize, targetSize );

			img.compress( 'JPEG' ).quality( 100 );

			img.write( converted + item.replace( 'png', 'jpg' ), function ( err, val ) {
				if ( err ) {
					console.log( err );
				}

				cropNextInQueue();
			});
		});
	};

}( require( 'fs' ), require( 'gm' ) ));