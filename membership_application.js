var _ = require("underscore")._;
var moment = require("moment");

var MembershipApplication = function(args){
    args || (args = {});
    _.extend(this,args);
    
    this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, "days");
    
    this.isExpired = function()
    {
        return this.validUntil.isBefore(moment());
    };
    
    this.emailIsValid = function()
    {
        return this.email && this.email.length > 3 && this.email.indexOf("@") > -1;    
    };
    
    this.nameIsValid = function()
    {
        return this.name && this.name.length > 6 && this.name.length < 100;
    };
    
    this.heightIsValid = function()
    {
        return this.height && this.height < 200 && this.height > 100;
    };
    
    this.weightIsValid = function()
    {
        return this.weight && this.weight > 50 && this.weight < 95;
    };
    
    this.ageIsValid = function()
    {
        return this.age && this.age > 20 && this.age < 45;
    };
    
    this.validationMessage = function()
    {
        if(this.isValid())
            {
                return "Application is valid";
            } 
        
        else if(!this.emailIsValid())
            {
                return "Email is invalid";
            }
        
        else if(!this.nameIsValid())
            {
                return "Name is invalid";
            }
    };
    
    this.isValid = function()
    {
        return this.emailIsValid() &&
            this.nameIsValid() &&
            this.heightIsValid() &&
            this.weightIsValid() &&
            this.ageIsValid() &&
            !this.isExpired();
    };
    
};


module.exports = MembershipApplication;