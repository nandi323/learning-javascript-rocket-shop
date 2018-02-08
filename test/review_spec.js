var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../membership_application");
var sinon = require("sinon");

describe("The Review Process", function() 
{
    
    describe("Receiving a valid application", function()
    {
        var decision;
        var validApp = new MembershipApplication({
            name : "Dani A hegyrol Jott",
            email : "dani@ahegyrol.com",
            age: "30",
            height : "170",
            weight : "80"
           });

       var review = new ReviewProcess({application : validApp});
        sinon.spy(review,"ensureAppValid");
        sinon.spy(review,"findNextMission");
        sinon.spy(review,"roleIsAvailable");
        sinon.spy(review,"ensureRoleCompatible");
        before(function(done)
        {
           review.processApplication(function(err, result)
           {
             decision = result;
             done();
           });   
        });
        
        it('returns success', function(){
            assert(decision.success, decision.message);
        });

        it('app is valid', function(){
            assert(review.ensureAppValid.called);
        });

        it('mission is selected', function(){
            assert(review.findNextMission.called);
        });

        it('role is available', function(){
            assert(review.roleIsAvailable.called);
        });

        it('role is comaptible', function(){
            assert(review.ensureRoleCompatible.called);
        });
    });
});