angular-facebook
================

Facebook sdk for angularjs

Usage example

```js
angular.module('MyModule', ['facebook']).config(function ($facebookProvider) {
  
  $facebookProvider.init({
    appId : '',
    channelUrl : '',
    status : true,
    cookie : true,
    xfbml : true
    /*...*/
  });
  
  $facebookProvider.Event.subscribe('auth.authResponseChange', function () {
    /*...*/
  });
  
  $facebookProvider.api('/me', function (response) {
    /*...*/
  });
  
  console.log($facebookProvider.getAuthResponse());
  
  /*...*/
});
```
