/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    it("has all URLs defined", function() {
      allFeeds.forEach(function(element) {
        expect(element.url.length).not.toBe(0);
      });
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it("has all names defined", function() {
      allFeeds.forEach(function(element) {
        expect(element.name.length).not.toBe(0);
      });
    });
  });

  /* TODO: Write a new test suite named "The menu" */

  describe('The menu', function() {

    // beforeEach( function(done) {
    //   $('.menu-icon-link').on('click', function (){
    //     done();
    //   });
    // });

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    it("is hidden by default", function() {
      expect($('body').hasClass("menu-hidden")).toBe(true);
    });

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

    it("changes when clicked on menu-icon", function() {
      var expectation = $('body').hasClass("menu-hidden");
      // For the amount of times to check if toggling works
      for (var i = 0; i < 2; i++) {
        // Expect the reverse of the current state,
        //i.e. expect true if body isn't hidden and false if hidden
        expectation = Boolean(1 - expectation);
        // Toggle by triggering the click action
        $('.menu-icon-link').trigger("click");
        // Check if the state matches the expected state
        expect($('body').hasClass("menu-hidden")).toBe(expectation);
      }
    });

  });
  /* TODO: Write a new test suite named "Initial Entries" */

  describe('Initial Entries', function() {
    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('has atleast a single entry', function(done) {
      expect($('.feed').find('.entry').length).not.toBe(0);
      done();
    });
  });


  /* TODO: Write a new test suite named "New Feed Selection" */
  describe("New Feed Selection", function() {
    // id here is the feed which we are going to change to
    var id = 0,
      prevEntries;
    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    beforeEach(function(done) {
      // the entries before the switch is stored in prevEntries
      // NOTE: this checks only for the headings of the posts as they
      // don't contain anything in the p tag
      prevEntries = $('.feed').find('.entry h2');
      loadFeed(id, function() {
        done();
      });
    });

    it('changes content', function(done) {
      // get the current entries
      var entries = $('.feed').find('.entry h2');
      var content = 0;
      for (var i = 0; i < entries.length; i++) {
        // Check if previous entry is the same as the current entry
        // adds 1 if it is the same
        content += (entries[i].innerHTML === prevEntries[i].innerHTML);
      }
      // If all the entries are the same, it means that the content hasn't
      // changed. This happens when the for loop adds 1 for every index
      // So we check if content is the same as the length of the for loop
      expect(content).not.toBe(entries.length);
      done();
    });
  });
}());
