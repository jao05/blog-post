const chai = require("chai");
const chaiHttp = require("chai-http");

// import from 'server.js'
const { app, runServer, closeServer } = require("../server");

// this lets us use *expect* style syntax in our tests
// so we can do things like `expect(1 + 1).to.equal(2);`
// http://chaijs.com/api/bdd/
const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

// Test suite
describe( "Blog Post", function() {

	// Before our tests run, we activate the server. Our `runServer`
  	// function returns a promise, and we return the that promise by
  	// doing `return runServer`. If we didn't return a promise here,
	// there's a possibility of a race condition where our tests start
	// running before our server has started.
	before(function() {
		return runServer();
  	});

	// although we only have one test module at the moment, we'll
  	// close our server at the end of these tests. Otherwise,
  	// if we add another test module that also has a `before` block
  	// that starts our server, it will cause an error because the
  	// server would still be running from the previous tests.
  	after(function() {
    	return closeServer();
  	});

  	// Test strategy: GET
  	// 1. make request to `/blog-posts`
  	// 2.
  	// 3. 
  	it("should list items on GET", function() {
	    // for Mocha tests, when we're dealing with asynchronous operations,
	    // we must either return a Promise object or else call a `done` callback
	    // at the end of the test. The `chai.request(server).get...` call is asynchronous
	    // and returns a Promise, so we just return it.
    	return chai
	      .request(app)
	      .get("/blog-posts")
	      .then(function(res) {
	        expect(res).to.have.status(200);
	        expect(res).to.be.json;
	        expect(res.body).to.be.a("array");

	        // because we create two items on app load
	        expect(res.body.length).to.be.at.least(1);
	        
	        // each item should be an object with key/value pairs
	        // for `id`, `name` and `checked`.
	        const expectedKeys = ["title", "content", "author"];
	        res.body.forEach(function(item) {
	          expect(item).to.be.a("object");
	          expect(item).to.include.keys(expectedKeys);
	        });
	      });
  	});

  	// Test strategy: POST
  	// Test strategy: PUT
  	// Test strategy: DELETE
});