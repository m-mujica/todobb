var Workspace = Backbone.Router.extend({

  routes: {
    '*filter': 'setFilter'
  },

  setFilter: function( param ) {
    console.log(param);
    todobb.TodoFilter = param.trim() || '';
    todobb.Collections.Todos.trigger('filter');
  }

});

todobb.Routers.TodoRouter = new Workspace();
Backbone.history.start();
