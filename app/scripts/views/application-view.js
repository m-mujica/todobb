todobb.Views.applicationView = Backbone.View.extend({

  el: '#todoapp',

  statsTemplate: _.template( $('#stats-template').html() ),

  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete'
  },

  initialize: function() {
    this.input = this.$('#new-todo');
    this.allCheckbox = this.$('#toggle-all')[0];
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    todobb.Collections.Todos.on('add', this.addOne, this);
    todobb.Collections.Todos.on('reset', this.addAll, this);
    todobb.Collections.Todos.on('change:completed', this.filterOne, this);
    todobb.Collections.Todos.on('filter', this.filterAll, this);
    todobb.Collections.Todos.on('all', this.render, this);

    todobb.Collections.Todos.fetch();
  },

  render: function() {
    var completed = todobb.Collections.Todos.completed().length;
    var remaining = todobb.Collections.Todos.remaining().length;

    if ( todobb.Collections.Todos.length ) {
      this.$main.show();
      this.$footer.show();
      this.$footer.html(this.statsTemplate({
        completed: completed,
        remaining: remaining
      }));

    } else {
      this.$main.hide();
      this.$footer.hide();
    }
    this.allCheckbox.checked = !remaining;
  },

  addOne: function( todo ) {
    var view = new todobb.Views.todoView({ model: todo });
    $('#todo-list').append( view.render().el );
  },

  addAll: function() {
    this.$('#todo-list').html('');
    todobb.Collections.Todos.each(this.addOne, this);
  },

  filterOne: function( todo ) {
    todo.trigger('visible');
  },

  filterAll: function() {
    todobb.Collections.Todos.each(this.filterOne, this);
  },

  // Generate the attributes for a new Todo item.
  newAttributes: function() {
    return {
      title: this.input.val().trim(),
      order: todobb.Collections.Todos.nextOrder(),
      completed: false
    };
  },

  createOnEnter: function( e ) {
    if ( e.which !== ENTER_KEY || !this.input.val().trim()  ) {
      return;
    }

    todobb.Collections.Todos.create( this.newAttributes() );
    this.input.val('');
  },

  clearCompleted: function( ) {
    _.each( todobb.Collections.Todos.completed(), function( todo ) {
      todo.destroy();
    });

    return false;
  },

  toggleAllComplete: function() {
    var completed = this.allCheckbox.checked;
    todobb.Collections.Todos.each(function( todo ) {
      todo.save({
        completed: completed
      });
    });
  }

});
