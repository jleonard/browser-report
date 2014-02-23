(function($){

  var $features;
  var $fileFormats;

  var features = [
    {
      category: 'CSS Features',
      tests: ['@font-face']
    },
    {
      category: 'HTML5 Features',
      tests: ['Application Cache','Canvas','Canvas Text','Drag and Drop','hashchange Event','History Management','Audio','Video','Web Sockets','Web Workers']
    },
    {
      category: 'HTML5 Storage',
      tests:['IndexedDB','localStorage','sessionStorage','Web SQL Database']
    }
  ];

  var fileFormats = [
    {
      type: 'audio',
      formats: ['ogg','mp3','wav','m4a']
    },
    {
      type: 'video',
      formats: ['ogg','webm','h264']
    }
  ];

  $(document).ready(function(e){
    $features = $('#features');
    $fileFormats = $('#fileFormats');

    var len = features.length;
    for(var ii = 0; ii < len; ii++){
      var cur = features[ii];
      var length = cur.tests.length;
      for(var jj = 0; jj < length; jj++){
        var test = cur.tests[jj].toLowerCase().replace(/[^a-z0-9]/gi,'');
        var _class = Modernizr[test] ? 'has' : 'no-has';
        var $el = '<li class='+_class+'>'+test+'</li>';
        $features.append($el);
      }
    }

    len = fileFormats.length;
    for(var ii = 0; ii < len; ii++){
      var cur = fileFormats[ii];
      var type = cur.type;
      var length = cur.formats.length;
      for(var jj = 0; jj < length; jj++){
        var format = cur.formats[jj];
        var _class = Modernizr[type][format] ? 'has' : 'no-has';
        var $el = '<li class='+_class+'>'+format+'</li>';
        $fileFormats.append($el);
      }
    }
  });

})(jQuery);	