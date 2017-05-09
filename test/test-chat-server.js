var chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should();


var io = require('socket.io-client'),
    server = require('../index');

var socketURL = 'http://localhost:3000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

var chatUser1 = {'name': 'Sean'};

describe("Chat Server", function() {
  /* Test 1 - A single user */
  it('should broadcast new user once they connect', function(done){
    var client = io.connect(socketURL, options);

    client.on('connect', function(){
      client.emit('connection name', chatUser1);
    });

    client.on('new user', function(usersName) {
      usersName.should.be.a('string');
      usersName.should.equal(chatUser1.name + " has joined.");
      client.disconnect();
      done();
    });
  });
});
