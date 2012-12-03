var ENTER_KEY = 13;

window.todobb = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    new this.Views.applicationView();
  }
};

$(document).ready(function(){
  todobb.init();
});
