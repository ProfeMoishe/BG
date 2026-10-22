(function() {
  // Application path.
  var appName = location.pathname.match(/\/([\-\w]+)(\.html)?$/);
  appName = appName ? appName[1].replace('-', '/') : 'index';

  // Only one language.
  var lang = 'es';
  window['BlocklyGamesLanguages'] = [lang];
  window['BlocklyGamesLang'] = lang;

  // Load the language pack.
  var script = document.createElement('script');
  script.src = appName + '/generated/' + lang + '/compressed.js';
  script.type = 'text/javascript';
  script.onload = function() {
    var customScript = document.createElement('script');
    customScript.src = 'common/ipet-custom.js';
    customScript.type = 'text/javascript';
    document.head.appendChild(customScript);
  };
  document.head.appendChild(script);
})();
