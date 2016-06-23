var Manager;

(function ($) {

  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://urkk37996b77.rupeshsoni.koding.io:8983/solr/VSM/'
    });
    Manager.init();
    Manager.store.addByValue('q', '*:*');
    Manager.doRequest();
  });

})(jQuery);
