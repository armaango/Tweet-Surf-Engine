// (function ($) {

// AjaxSolr.TextWidget = AjaxSolr.AbstractTextWidget.extend({
//   init: function () {
//     var self = this;
//     $(this.target).find('input').bind('keydown', function(e) {
//       if (e.which == 13) {
//         var value = $(this).val();
//         var value1 = ("text_en:"+value)
//         if (value1 && self.set(value1)) {
          
//           self.doRequest();
//         }
//       }
//     });
//   },

//   afterRequest: function () {
//     $(this.target).find('input').val('');
//   }
// });

// })(jQuery);

(function ($) {

AjaxSolr.TextWidget = AjaxSolr.AbstractTextWidget.extend({
  init: function () {
    var self = this;
    $(this.target).find('input').bind('keydown', function(e) {
      if (e.which == 13) {
        var value = $(this).val();
        ; //Shagun ka semicolon
        
        
        //Sending POST request to Yandex API to detect language
        var test=$.ajax({
        type: "POST",
        url: "https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20151213T170816Z.dfe733e0b30f87e1.e21f804e1a4f37940b1bad981bffd24cf7d03dbb",
        data: "&text="+value,
        success: function(data){
          var language=data['lang'];
          //alert(language)
          
          
          if(!(language=="en"||language=="de"||language=="ru"||language=="fr")){
            language="en";
          }
          
          //Build query request
          var value1="text_"+language+":"+value;
         // window.alert(value1);
          //Send modified request to Solr
          if (value1 && self.set(value1)) {
                self.doRequest();
            }
          
        },
        dataType: "json"
      }); 
 
      }
    });
  },
    afterRequest: function () {
    $(this.target).find('input').val('');
  }
});

})(jQuery);
