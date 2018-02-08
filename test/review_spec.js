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

       var review = new ReviewProcess();
       var spyAppReceived = sinon.spy();
       var spyMissionSelected = sinon.spy();
       var spyRoleAvailable = sinon.spy();
       var spyRoleCompatible = sinon.spy();

        before(function(done)
        {
           review.on("application-received", spyAppReceived);
           review.on("mission-selected", spyMissionSelected);
           review.on("role-available", spyRoleAvailable);
           review.on("role-compatible", spyRoleCompatible);

           review.processApplication(validApp, function(err, result)
           {
             decision = result;
             done();
           });   
        });
        
        it('returns success', function(){
            assert(decision.success, decision.message);
        });

        it('app is received', function(){
            assert(spyAppReceived.called);
        });

        it('mission is selected', function(){
            assert(spyMissionSelected.called);
        });

        it('role is available', function(){
            assert(spyRoleAvailable.called);
        });

        it('role is comaptible', function(){
            assert(spyRoleCompatible.called);
        });
    });
});