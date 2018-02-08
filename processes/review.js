var async = require("async");
var assert = require("assert");

var ReviewProcess = function(args)
{
    assert(args.application, "Need an application");
    var app = args.application;
    var callback;
    
    this.ensureAppValid = function(next)
    {
        if(app.isValid())
        {
           next(null, true);
        }
        
        else
        {
            next(app.validationMessage(),null);
        };
    };
        
    this.findNextMission = function(next)
    {
        var mission = { 
            commander : null,
            pilot : null,
            MAVPilot : null,
            passangers : []    
            };
        next(null, mission);
    };
    
    this.roleIsAvailable = function(next)
    {
        next(null, true);
    };
    
    this.ensureRoleCompatible = function(next)
    {
        next(null, true);
    };
    
    this.approveApplication = function(next)
    {
        next(null, true);
    };

    this.processApplication = function(next)
    {
        async.series({
            validated : this.ensureAppValid,
            mission : this.findNextMission,
            roleAvailable : this.roleIsAvailable,
            roleCompatible : this.ensureRoleCompatible,
            success : this.approveApplication
        }, function(err, result){
            if(err)
            {
                result.message = err;
                next(null, result);
            }
            else
            {
                result.message = "Enjoy :)";   
                next(null, result);
            }
        });
    };
        
};  

module.exports = ReviewProcess;