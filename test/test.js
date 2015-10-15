/* global require, describe, it, beforeEach */
'use strict';

var mpath = './../lib';


// MODULES //

var chai = require( 'chai' ),
	os = require( 'os' ),
	proxyquire = require( 'proxyquire' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-configdir', function tests() {

	var opts;

	beforeEach( function before() {
		opts = {
			'check-if-windows': false,
			'utils-platform': 'darwin',
			'utils-homedir': homedir
		};
	});

	function homedir() {
		return '/Beep/Boop';
	}

	it( 'should export a function', function test() {
		var configdir = proxyquire( mpath, opts );
		expect( configdir ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a path value which is not a string primitive', function test() {
		var configdir,
			values,
			i;

		values = [
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			{},
			function(){}
		];
		configdir = proxyquire( mpath, opts );

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				configdir( value );
			};
		}
	});

	it( 'should support Mac OS X', function test() {
		var configdir;

		opts[ 'utils-platform' ] = 'darwin';
		configdir = proxyquire( mpath, opts );

		assert.strictEqual( configdir(), '/Beep/Boop/Library/Preferences' );
	});

	it( 'should support Mac OS X and append a path', function test() {
		var configdir;

		opts[ 'utils-platform' ] = 'darwin';
		configdir = proxyquire( mpath, opts );

		assert.strictEqual( configdir( 'appy/config' ), '/Beep/Boop/Library/Preferences/appy/config' );
	});

	it( 'should support Linux (XDG_CONFIG_HOME)', function test() {
		var configdir,
			env;

		env = process.env;
		process.env = {
			'XDG_CONFIG_HOME': '/Beep/bop/.config'
		};
		opts[ 'utils-platform' ] = 'linux';
		configdir = proxyquire( mpath, opts );

		assert.strictEqual( configdir(), '/Beep/bop/.config' );

		process.env = env;
	});

	it( 'should support Linux and append a path (XDG_CONFIG_HOME)', function test() {
		var configdir,
			env;

		env = process.env;
		process.env = {
			'XDG_CONFIG_HOME': '/Beep/bop/.config'
		};
		opts[ 'utils-platform' ] = 'linux';
		configdir = proxyquire( mpath, opts );

		assert.strictEqual( configdir( 'appy/config' ), '/Beep/bop/.config/appy/config' );

		process.env = env;
	});

	it( 'should support Linux and fallback to a `.config` directory in a user\'s home directory', function test() {
		var configdir,
			env;

		env = process.env;
		process.env = {};
		opts[ 'utils-platform' ] = 'linux';
		configdir = proxyquire( mpath, opts );

		assert.strictEqual( configdir(), '/Beep/Boop/.config' );

		process.env = env;
	});

	it( 'should support Linux and fallback to a `.config` directory in a user\'s home directory and append a path', function test() {
		var configdir,
			env;

		env = process.env;
		process.env = {};
		opts[ 'utils-platform' ] = 'linux';
		configdir = proxyquire( mpath, opts );

		assert.strictEqual( configdir( 'appy/config' ), '/Beep/Boop/.config/appy/config' );

		process.env = env;
	});

	it( 'should return `null` if unable to locate a home directory on non-windows platforms', function test() {
		var configdir,
			env;

		env = process.env;
		process.env = {};
		opts[ 'utils-homedir' ] = mock;

		configdir = proxyquire( mpath, opts );

		assert.isNull( configdir() );

		process.env = env;

		function mock() {
			return null;
		}
	});

	it( 'should support Windows (LOCALAPPDATA)', function test() {
		var configdir,
			env;

		env = process.env;
		process.env = {
			'LOCALAPPDATA': 'C:\\Users\\beep\\AppData\\Local'
		};
		opts[ 'check-if-windows' ] = true;
		configdir = proxyquire( mpath, opts );

		assert.strictEqual( configdir(), 'C:\\Users\\beep\\AppData\\Local' );

		process.env = env;
	});

	it( 'should support Windows and append a path (LOCALAPPDATA)', function test() {
		var configdir,
			env;

		env = process.env;
		process.env = {
			'LOCALAPPDATA': 'C:\\Users\\beep\\AppData\\Local'
		};
		opts[ 'check-if-windows' ] = true;
		opts[ 'path' ] = { 'join': join };
		configdir = proxyquire( mpath, opts );

		assert.strictEqual( configdir( 'appy\\config' ), 'C:\\Users\\beep\\AppData\\Local\\appy\\config' );

		process.env = env;

		function join( a, b ) {
			return a + '\\' + b;
		}
	});

	it( 'should support Windows (APPDATA)', function test() {
		var configdir,
			env;

		env = process.env;
		process.env = {
			'APPDATA': 'C:\\Users\\beep\\AppData\\Roaming'
		};
		opts[ 'check-if-windows' ] = true;
		configdir = proxyquire( mpath, opts );

		assert.strictEqual( configdir(), 'C:\\Users\\beep\\AppData\\Roaming' );

		process.env = env;
	});

	it( 'should support Windows and append a path (APPDATA)', function test() {
		var configdir,
			env;

		env = process.env;
		process.env = {
			'LOCALAPPDATA': 'C:\\Users\\beep\\AppData\\Roaming'
		};
		opts[ 'check-if-windows' ] = true;
		opts[ 'path' ] = { 'join': join };
		configdir = proxyquire( mpath, opts );

		assert.strictEqual( configdir( 'appy\\config' ), 'C:\\Users\\beep\\AppData\\Roaming\\appy\\config' );

		process.env = env;

		function join( a, b ) {
			return a + '\\' + b;
		}
	});

	it( 'should return `null` if unable to locate an application data directory on Windows', function test() {
		var configdir,
			env;

		env = process.env;
		process.env = {};
		opts[ 'check-if-windows' ] = true;

		configdir = proxyquire( mpath, opts );

		assert.isNull( configdir() );

		process.env = env;
	});

});
