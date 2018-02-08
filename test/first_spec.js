var assert = require("assert");
var MembershipApplication = require("../membership_application");
var moment = require("moment");

describe("Apply for mission", function(){
    var validApp;
    
    before(function(){
           validApp = new MembershipApplication({
           name : "Dani A hegyrol Jott",
           email : "dani@ahegyrol.com",
           age: "30",
           height : "170",
           weight : "80",
           })
           });
         
    describe("Using valid name, email, age, height, weight", function(){
        it("is valid", function(){
            assert(validApp.isValid(), "Not valid");
        });
        it("reports valid email", function()
          {
            assert(validApp.emailIsValid(), "Not valid");
        });
        
        it("reports valid name", function()
           {
            assert(validApp.nameIsValid(), "Not valid")
        });
        it("reports valid height", function(){
            assert(validApp.heightIsValid(), "Not valid")
        });
        it("reports valid weight", function()
          {
            assert(validApp.weightIsValid(), "Not valid")
        });
        it("reports valid age", function()
          {
            assert(validApp.nameIsValid(), "Not valid")
        });
    });
    
    describe("Application invalid if...", function(){
        it("is past the validUntil date", function(){
            var app = new MembershipApplication({validUntil : Date.parse("10/10/2001")});
            assert(app.isExpired(), "Not valid");
        });
        it("email is 4 character or less", function(){
            var app = new MembershipApplication({email : "dd"});
            assert(!app.emailIsValid(), "Not valid");
        });
        it("email has no @", function(){
            var app = new MembershipApplication({email : "ddasdas:sdfsdf.com"});
            assert(!app.emailIsValid(), "Not valid");
        });
        it("email is ommitted", function(){
            var app = new MembershipApplication();
            assert(!app.emailIsValid(), "Not valid");
           });
        it("Name has more than 6 characters", function(){
            var app = new MembershipApplication({name : "dds"});
            assert(!app.nameIsValid(), "Not valid");
        });
        it("name is ommitted", function(){
            var app = new MembershipApplication();
            assert(!app.nameIsValid(), "Not valid");
           });
    });
});