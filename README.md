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
  });
  
  
});
```
