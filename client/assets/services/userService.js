app.service('shareUserService', function() {
    var user = {};

    var putUser = function(newObj) {
        user = newObj;
    }

    var getUser = function(){
        return user;
    }

    return {
        putUser: putUser,
        getUser: getUser
    };
});
