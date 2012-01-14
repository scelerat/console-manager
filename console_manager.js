/**
 * Module /  function to manage console output in a browser-based JS app
 * 
 * Example : 
 * (function(){
 *   // a config step in your app
 *   var cm = ConsoleManager(),
 *       enabled = [ 'photos', 'comments', 'blogs' ],
 *       disabled = [ 'music', 'movies' ];
 *   for (var i = 0; i < enabled_zones.length; i++ ) { cm.enable( enabled[i] )};
 *   for (var i = 0; i < disabled_zones.length; i++ ) { cm.enable( disabled[i] )};
 * })();
 * 
 * (function(){
 *   // A module definition in your app
 *   var console = ConsoleManager().console('photos');
 *   console.log("You should see this in console output");
 * })();
 * 
 * (function(){
 *   // A module definition in your app
 *   var console = ConsoleManager().console('movies');
 *   console.log("You should NOT see this in console output");
 * })();
 *
 */
(function(){
var original_console = console,
    null_console = {},
    consoles = {},
    singleton = null,
    funcnames = [ 'debug', 'error', 'info',  'log',
                  'warn', 'dir', 'dirxml', 'trace',
                  'assert', 'count', 'markTimeline', 'profile',
                  'profileEnd', 'time', 'timeEnd', 'timeStamp',
                  'group', 'groupCollapsed', 'groupEnd'];
// Init all the function calls to noops
for (var i = 0; i < funcnames.length; i++ ) { 
  null_console[ funcnames[ i ] ] = function(){};
}
ConsoleManager = function () {
  if (singleton) { return singleton; }
  else {
    singleton = {
      disable: function(zone) { 
        return this.console( zone, null_console );
      },
      enable : function(zone) {
        if (original_console && (typeof original_console === 'object')) {
          return this.console( zone, original_console)
        }
        else { return this.console(zone); }
      },
      console : function( zone, console_obj ) {
        if (!zone) { 
          if (console_obj) { console = console_obj; }
          return console; 
        }
        else if (typeof zone === 'string') {
          if (console_obj) { 
            consoles[ zone ] = console_obj; 
          }
          return (consoles[ zone ] || console);
        }
      },
      zones : function() { return Object.keys(consoles); }
      
    };
    if (!original_console) { singleton.disable(); }
    return singleton;
  }
}
})();
