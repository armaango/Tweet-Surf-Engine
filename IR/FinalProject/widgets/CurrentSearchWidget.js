(function ($) {

AjaxSolr.CurrentSearchWidget = AjaxSolr.AbstractWidget.extend({
  start: 0,

  afterRequest: function () {
    var self = this;
    var links = [];

    var q = this.manager.store.get('q').val();
    
    if (q != '*:*') {
    	var start = q.indexOf(':') ;
    	var Querytodisplay = 'Query : ';
    	Querytodisplay = Querytodisplay.concat(q.substring(start+1));
      links.push($('<a href="#"></a>').text('(x) ' + Querytodisplay).click(function () {
        self.manager.store.get('q').val('*:*');
        self.doRequest();
        return false;
      }));
    }

    var fq = this.manager.store.values('fq');
    for (var i = 0, l = fq.length; i < l; i++) {
    	var start = fq[i].indexOf(':');
    	if(fq[i].substring(0,start)=='tweet_lang')
    	{
    		var temp = 'Top Lang : ' ;
    		
    		temp = temp.concat(fq[i].substring(start+1));
    		 links.push($('<a href="#"></a>').text('(x) ' + temp).click(self.removeFacet(fq[i])));
    	}else if(fq[i].substring(0,start)=='tweet_hashtags')
    	{
    		var temp = 'Top Hashtags : ' ;
    		
    		temp = temp.concat(fq[i].substring(start+1));
    		 links.push($('<a href="#"></a>').text('(x) ' + temp).click(self.removeFacet(fq[i])));
    	}else if(fq[i].substring(0,start)=='twitter_handle')
    	{
    		var temp = 'Twitter Handle : ' ;
    		
    		temp = temp.concat(fq[i].substring(start+1));
    		 links.push($('<a href="#"></a>').text('(x) ' + temp).click(self.removeFacet(fq[i])));
    	}else if(fq[i].substring(0,start)=='person')
    	{
    		var temp = 'Person : ' ;
    		
    		temp = temp.concat(fq[i].substring(start+1));
    		 links.push($('<a href="#"></a>').text('(x) ' + temp).click(self.removeFacet(fq[i])));
    	}else if(fq[i].substring(0,start)=='location')
    	{
    		var temp = 'Tweet Location  : ' ;
    		
    		temp = temp.concat(fq[i].substring(start+1));
    		 links.push($('<a href="#"></a>').text('(x) ' + temp).click(self.removeFacet(fq[i])));
    	}
    	else if(fq[i].substring(0,start)=='place')
    	{
    		var temp = 'Place in Tweet  : ' ;
    		
    		temp = temp.concat(fq[i].substring(start+1));
    		 links.push($('<a href="#"></a>').text('(x) ' + temp).click(self.removeFacet(fq[i])));
    	}
    	else
      links.push($('<a href="#"></a>').text('(x) ' + fq[i]).click(self.removeFacet(fq[i])));
    }

    if (links.length > 1) {
      links.unshift($('<a href="#"></a>').text('remove all').click(function () {
        self.manager.store.get('q').val('*:*');
        self.manager.store.remove('fq');
        self.doRequest();
        return false;
      }));
    }

    if (links.length) {
      var $target = $(this.target);
      $target.empty();
      for (var i = 0, l = links.length; i < l; i++) {
        $target.append($('<li></li>').append(links[i]));
      }
    }
    else {
      $(this.target).html('<li>Viewing all documents!</li>');
    }
  },

  removeFacet: function (facet) {
    var self = this;
    return function () {
      if (self.manager.store.removeByValue('fq', facet)) {
        self.doRequest();
      }
      return false;
    };
  }
});

})(jQuery);

