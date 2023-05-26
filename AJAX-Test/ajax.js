/**
 * @title Execute any WET plugin on AJAXed-in content
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp (Github)
 * @version 1.0.0+2016-10-14
 */
(function( $, document, wb ) {
	"use strict";
	$('#mycontainer').on( "wb-contentupdated", function( event, data ){
		// "data.ajax-type" contains the insersion method [after, append, before, prepend, replace]
		// "data.content" contains the
		var $elm = $(event.currentTarget);
		$elm
			.find( wb.allSelectors )
				.addClass( "wb-init" )
				.filter( ":not(#" + $elm.attr( "id" ) + " .wb-init .wb-init)" )
					.trigger( "timerpoke.wb" );
		/*
		 * Since we are working with events we want to ensure that we are being
		 * passive about our control, so returning true allows for events to always
		 * continue
		 */
		return true;
	});
})( jQuery, document, wb );