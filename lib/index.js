'use strict';

// MODULES //

var isWindows = require( 'check-if-windows' ),
	isString = require( 'validate.io-string-primitive' ),
	path = require( 'path' ),
	platform = require( 'utils-platform' ),
	homedir = require( 'utils-homedir' );


// CONFIGDIR //

/**
* FUNCTION: configdir( [p] )
*	Returns a directory for user-specific configuration files.
*
* @param {String} [p] - path to append to a base directory
* @returns {String|Null} directory
*/
function configdir( p ) {
	var env = process.env,
		append,
		home,
		dir;

	if ( arguments.length ) {
		if ( !isString( p ) ) {
			throw new TypeError( 'invalid input argument. Must provide a string primitive. Value: `' + p + '`.' );
		}
		append = p;
	} else {
		append = '';
	}
	if ( isWindows ) {
		// http://blogs.msdn.com/b/patricka/archive/2010/03/18/where-should-i-store-my-data-and-configuration-files-if-i-target-multiple-os-versions.aspx
		// https://en.wikipedia.org/wiki/Environment_variable#Windows
		dir = env[ 'LOCALAPPDATA' ] || env[ 'APPDATA' ];
		return ( dir ) ? path.join( dir, append ) : null;
	}
	home = homedir();
	if ( home === null ) {
		return null;
	}
	if ( platform === 'darwin' ) {
		// http://stackoverflow.com/questions/410013/where-do-osx-applications-typically-store-user-configuration-data
		return path.join( home, 'Library', 'Preferences', append );
	}
	// http://www.pathname.com/fhs/
	// http://www.pathname.com/fhs/pub/fhs-2.3.html
	// http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html
	dir = env[ 'XDG_CONFIG_HOME' ] || path.join( home, '.config' );
	return path.join( dir, append );
} // end FUNCTION configdir()


// EXPORTS //

module.exports = configdir;
