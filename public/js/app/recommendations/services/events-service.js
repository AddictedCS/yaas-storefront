

'use strict';

angular.module('ds.recommendations')
       .factory('RecommendMeSvc', ['$rootScope', '$state', 'CookieSvc', 'RecommendationsREST', 'GlobalData',
         function($rootScope, $state, CookieSvc, RecommendationsREST, GlobalData) {
           return {
              triggerViewEvent: function (productId) {
                   var deviceId = CookieSvc.getRecsDeviceId();
                   var data = {
                     'productId' : productId,
                     'userId': deviceId
                   };
                   RecommendationsREST.Recommendations.one('events/view').customPOST(data).then(function(eventResponse) {
                           CookieSvc.setRecsDeviceIdCookie(eventResponse.userId);
                        }, function(response) {
                            console.log('Error with status code, do something!', response.status);
                   });
              },

              triggerPurchaseEvent: function(cart) {
                var deviceId = CookieSvc.getRecsDeviceId();
                var products = [];
                for (var i = 0; i < cart.items.length; i++) {
                    var item = cart.items[i];
                    products.push(item.product.id);
                }

                var data = {
                  'userId': deviceId,
                  'externalUserId': (GlobalData.customerAccount) ? GlobalData.customerAccount.id : deviceId,
                  'products': products
                };

                RecommendationsREST.Recommendations.one('events/purchase').customPOST(data).then(function(eventResponse) {
                         CookieSvc.setRecsDeviceIdCookie(eventResponse.userId);
                     }, function(response) {
                         console.log('Error with status code, do something!', response.status);
                     });
                }
            };
        }]);
