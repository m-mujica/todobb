todobb.Views.todoView = Backbone.View.extend({

  tagName: 'li',

  template: _.template( $('#item-template').html() ),

  events: {
    'click .toggle': 'toggleCompleted',
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'click .destroy': 'clear',
    'blur .edit': 'close'
  },

  initialize: function() {
    this.model.on( 'change', this.render, this );
    this.model.on( 'destroy', this.remove, this );
    this.model.on( 'visible', this.toggleVisible, this );

  },

  render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );
    this.$el.toggleClass( 'completed', this.model.get('completed') );

    this.toggleVisible();
    this.input = this.$('.edit');
    return this;
  },

  toggleVisible: function() {
    this.$el.toggleClass( 'hidden', this.isHidden() );
  },

  isHidden: function() {
    var isCompleted = this.model.get('completed');
    return (
      (!isCompleted && todobb.TodoFilter === 'completed') ||
      (isCompleted && todobb.TodoFilter === 'active')
    );
  },

  toggleCompleted: function() {
    this.model.toggle();
  },

  edit: function() {
    this.$el.addClass('editing');
    this.input.focus();
  },

  close: function() {
    var value = this.input.val().trim();

    if ( value ) {
      this.model.save({ title: value });
    } else {
      this.clear();
    }

    this.$el.removeClass('editing');
  },

  updateOnEnter: function( e ) {
    if ( e.which == ENTER_KEY ) {
      this.close();
    }
  },

  clear: function() {
    this.model.destroy();
  }

});
