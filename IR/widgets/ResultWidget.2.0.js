(function ($) {

AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
start: 0,

  beforeRequest: function () {
    $(this.target).html($('<img>').attr('src', 'images/ajax-loader.gif'));
  },
  
  facetLinks: function (facet_field, facet_values) {
    var links = [];
    if (facet_values) {
      for (var i = 0, l = facet_values.length; i < l; i++) {
        if (facet_values[i] !== undefined) {
          links = links.concat([
            facet_field + ':',
            $('<a href="#"></a>')
            .text(facet_values[i])
            .click(this.facetHandler(facet_field, facet_values[i]))
          ]);
        }
        else {
          links.push('no items found in current selection');
        }
      }
    }
    return links;
  },
facetHandler: function (facet_field, facet_value) {
    var self = this;
    return function () {
      self.manager.store.remove('fq');
      self.manager.store.addByValue('fq', facet_field + ':' + AjaxSolr.Parameter.escapeValue(facet_value));
      self.doRequest(0);
      return false;
    };
  },
  afterRequest: function () {
window.alert('Hello from reesult widget');
    $(this.target).empty();
    for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
	//window.alert('Hello from reesult widget 2');      
	var doc = this.manager.response.response.docs[i];
      $(this.target).append(this.template(doc));
      var items = [];
	items = items.concat(this.facetLinks('tweet_lang', doc.lang));
	items = items.concat(this.facetLinks('tweet_hashtags', doc.tweet_hashtags));
  items = items.concat(this.facetLinks('location',doc.location)) ;

	

var $links = $('#links_' + doc.id);
$links.empty();
for (var j = 0, m = items.length; j < m; j++) {
  $links.append($('<li></li>').append(items[j]));
}
    }
  },

  template: function (doc) {
//window.alert('Hello from reesult widget 3'); 
    var snippet = '';
    if (doc.text_en.length > 300) {
      snippet +=  ' ' + doc.text_en.substring(0, 300);
      snippet += '<span style="display:none;">' + doc.text_en.substring(300);
      snippet += '</span> <a href="#" class="more">more</a>';
    }
    else {
      snippet +='German' + doc.text_de +'English' +doc.text_en +'Russian'+ doc.text_ru ;
    }
     var alert = doc.tweet_urls;
     var alert2 = alert;
    
    //var $llink = doc.tweet_urls;
    var output = '<div><h2>' + ' ' + '</h2>';
    output += '<p id="links_' + ' ' + '" class="links"></p>';
    output += '<p><a href="http://www.bing.com">' + snippet + '</a></p></div>';
    
    //var outputurl = document.write('<a href="' + alert '">more</a>');
    // document.getElementById("alert").href=alert ;
return output;
  },
init: function () {
    $(document).on('click', 'a.more', function () {
      var $this = $(this),
          span = $this.parent().find('span');

      if (span.is(':visible')) {
        span.hide();
        $this.text('more');
      }
      else {
        span.show();
        $this.text('less');
      }

      return false;
    });
  }
});

})(jQuery);
