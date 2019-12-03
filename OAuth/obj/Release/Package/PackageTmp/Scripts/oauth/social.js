var app = angular.module("socialLogin", []);
app.controller("loginController", function($scope) {

    //Function for facebook Login.
    $scope.facebookLogin = function(){
        window.location.href = "/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A19576%2FTestOAuthApp%3A19576%2FLogin.html&state=GUWcHoliFgNN3dL05-rQMlDPw0nJxMaTetSEvB6zZWs1";

    };

    //Function for google Login.
    $scope.googleLogin = function(){
        window.location.href = "/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A19576%2FLogin.html&state=GUWcHoliFgNN3dL05-rQMlDPw0nJxMaTetSEvB6zZWs1";

    };

    //Function for github Login.
    $scope.githubLogin = function () {

        window.location.href = "/api/Account/ExternalLogin?provider=GitHub&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A19576%2FLogin.html&state=GUWcHoliFgNN3dL05-rQMlDPw0nJxMaTetSEvB6zZWs1";

    };

    //Function to get access token from redirect url.
    $scope.getAccessToken = function () {
        if (location.hash) {
            if (location.hash.split('access_token=')) {
                var accessToken = location.hash.split('access_token=')[1].split('&')[0];
                if (accessToken) {
                    $scope.isUserRegistered(accessToken);   
                }
            }
        }
    };

    //Function to make sure from backend. user is registerd or not.
    $scope.isUserRegistered = function (accessToken){
        $.ajax({
            url: '/api/Account/UserInfo',
            method: 'Get',
            headers: {
                'content-type': 'application/JSON',
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                alert("Login Email is :" + response.Email);
            }
        });
    };

    //this method is called on load of Login.html to check that access token is exist or not in Login Page.

    $scope.getAccessToken();
});