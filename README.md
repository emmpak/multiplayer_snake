# Multiplayer-snake

[![Stories in Ready]([![Stories in Ready](https://badge.waffle.io/petewilkins/multiplayer-snake.svg?label=ready&title=Ready)](http://waffle.io/petewilkins/multiplayer-snake)

## Collaborators
* [Emil Iliev](https://github.com/emmpak)
* [Pete Wilkins](https://github.com/petewilkins)
* [Sean Blundell](https://github.com/Simba14)
* [Jack Bittner](https://github.com/jackbittiner)

## Problem Statement
> * To learn how to build a web application that enables a real-time interaction between multiple clients

## MVP 1
> * For one client to move one square across a screen and for another client to see this action on his own computer

## Further Builds
> * Multiple players control their own snake.
> * For players to die when they collide with the wall.
> * For a winner to be declared once all other players have died.
> * For each snake to grow as it moves.

## MLP (Minimum Lovable Product)


## Technologies Integrated
* JavaScript - This application was written completely in JavaScript.
* NodeJS - An event-driven I/O server-side JavaScript environment that is ideal for real-time web applications such as ours.
* [Express](https://github.com/expressjs) - Quick and minimilist framework for node. Selected for its robust routing and speed.
* [Sockets](http://socket.io) -
* [P5](https://p5js.org/get-started/) - JavaScript library that provides pre-defined methods for the construction of shapes. This enabled the canvas and blocks of the 'snake' to be drawn more efficiently.
* [MochaJS](https://github.com/mochajs/mocha) - JavaScript test framework for node that enabled us to TDD this application
* [Chai](http://chaijs.com/) - TDD assertion library for node. Chosen as it can easily pair with any javascript testing framework(i.e. Mocha). Allowed the use of matchers such as 'should' and 'expect', which improved the readability of our tests.


## User Stories:
```
1.  As a user,
    So that I can play a game of snake,
    I want to be able to control my own snake.

2.  As a user,
    So that I can play against others,
    I want other people on other computers to control their own snake.

3.  As a user,
    So that I can win/lose a game of snake,
    I want the snake to be declared dead when I collide with a wall.

4.  As a user,
    So that a winner can be determined,
    I want the last surviving snake to be declared the winner.
```
