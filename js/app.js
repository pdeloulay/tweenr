App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource("players", function() {
    this.resource("player", { path: "/:player_id" });  
  });
  this.resource("clubs");
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo("players");
  }
});

App.PlayersRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll("Player");
  }
});

App.PlayerRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find("Player", params.player_id);
  }
})

App.PlayersController = Ember.ArrayController.extend({
  sortProperties: ["lastName"]
});


App.Player = DS.Model.extend({
  firstName: DS.attr( 'string' ),
  lastName: DS.attr( 'string' ),
  usta: DS.attr('string'),
});

App.Player.FIXTURES = [
  { id: 1, firstName: 'Patrick', lastName: 'Deloulay', usta: '4.5C' },
  { id: 2, firstName: 'Tom' , lastName: 'Dale', usta: '4.0' },
  { id: 3, firstName: 'Kyle', lastName: 'Warren', usta: '4.5C' },
  { id: 4, firstName: 'John' , lastName: 'Smith', usta: '5.0' }
];

App.Club = DS.Model.extend({
  name: DS.attr( 'string' ),
  geo: DS.attr( 'string' )
});

App.Club.FIXTURES = [
  { id: 1, name: 'Bay Club Santa Clara', geo: '37.376712,-121.985984' },
  { id: 2, name: 'Bay Club Cupertino', geo: '37.32435,-122.01569' },
  { id: 3, name: 'Bay Club Marin', geo: '30.24805,-85.62918' }
];