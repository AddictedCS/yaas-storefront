

'use strict';

angular.module('ds.recommendations')
       .factory('RecommendMeSvc', ['$rootScope', '$state', 'CookieSvc', 'RecommendationsREST', 'GlobalData',
         function($rootScope, $state, CookieSvc, RecommendationsREST, GlobalData) {
           return {
              triggerViewEvent: function (productId) {
                   var deviceId = CookieSvc.getRecsDeviceId();
                   console.log('Trigger view P{' + productId + '}, U{' + deviceId + '}');
                   var data = [{
                     'productId' : productId,
                     'userId': deviceId,
                     'date': new Date().toISOString()
                   }];
                   RecommendationsREST.Recommendations.one('views').customPOST(data).then(function() {
                            console.log('All ok');
                        }, function(response) {
                            console.log('Error with status code', response.status);
                        });
              },

              triggerOrderEvent: function(cart) {
                var deviceId = CookieSvc.getRecsDeviceId();
                //Send ordered cart items to piwik
                var data = [];
                for (var i = 0; i < cart.items.length; i++) {
                    //sku, name, categoryName, unitPrice, amount
                    var item = cart.items[i];
                    data.push({
                      'userId': deviceId,
                      'externalUserId': GlobalData.customerAccount.id,
                      'productId': item.product.id,
                      'orderDate': new Date().toISOString()
                    });
                }

                RecommendationsREST.Recommendations.one('orders').customPOST(data).then(function() {
                         console.log('All ok');
                     }, function(response) {
                         console.log('Error with status code', response.status);
                });
              }
            };
        }]);
