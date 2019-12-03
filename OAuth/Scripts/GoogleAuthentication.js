/// <reference path="jquery-3.3.1.min.js" />

function getAccessToken() {
    debugger;
    if (location.hash) {
        if (location.hash.split('access_token=')) {
            var accessToken = location.hash.split('access_token=')[1].split('&')[0];
            if (accessToken) {
                isUserRegistered(accessToken);   
            }
        }
    }
}


function isUserRegistered(accessToken) {
    $.ajax({
        url: '/api/Account/UserInfo',
        method: 'Get',
        headers: {
            'content-type': 'application/JSON',
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            debugger;
            if (response.HasRegistered) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('userName', response.Email);
                window.location.href = "Data.html";
            } else {
                signupExternalUser(accessToken, response.LoginProvider);
            }
        }
    });
}


//--------------------------------------------



function signupExternalUser(accessToken, providers) {
    $.ajax({
        url: '/api/Account/RegisterExternal',
        method: 'Post',
        headers: {
            'content-type': 'application/JSON',
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            window.location.href = "/api/Account/ExternalLogin?provider=" + providers +"&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A19576%2FLogin.html&state=GUWcHoliFgNN3dL05-rQMlDPw0nJxMaTetSEvB6zZWs1";

        }
    });
}