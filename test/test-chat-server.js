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
var chatUser2 = {'name': 'Emil'};

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

  // Test 2 - Two users
  it ('should broadcast new user to all users', function(done){
    var client1 = io.connect(socketURL, options);

    client1.on('connect', function(data){
      client1.emit('connection name', chatUser1);

      var client2 = io.connect(socketURL, options);

      client2.on('connect', function(data){
        client2.emit('connection name', chatUser2);
      });

      client2.on('new user', function(usersName){
        usersName.should.equal(chatUser2.name + " has joined.");
        client2.disconnect();
      });
    });

    var numUsers = 0;
    client1.on('new user', function(usersName) {
      numUsers += 1;
      if(numUsers === 2){
        usersName.should.equal(chatUser2.name + ' has joined.');
        client1.disconnect();
        done();
      }
    });
  });
});
