'use strict';

/**
 *  Encapsulates configuration of the price, products, and productDetails APIs.
 */
angular.module('ds.recommendations')
    .factory('RecommendationsREST', ['SiteConfigSvc', 'Restangular', 'GlobalData', function(siteConfig, Restangular, GlobalData){

        function applyLanguageHeader(RestangularConfigurer) {
            RestangularConfigurer.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {

                return {
                    element: element,
                    params: params,
                    headers: _.extend(headers, {'accept-language': GlobalData.getAcceptLanguages()}),
                    httpConfig: httpConfig
                };
            });
      }


        return {
            /** Endpoint for Recommendations API.*/
            Recommendations: Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(siteConfig.apis.recommendations.baseUrl);
                    applyLanguageHeader(RestangularConfigurer);
            })
        };
      }]);
