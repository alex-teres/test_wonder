import 'jquery';
import 'jquery-ui';
import angular from'angular';
import uiRouter from 'angular-ui-router';
import auth from  './components/auth';
import home from './components/home';
import audios from './components/audios';
import user from './components/user';
import '../node_modules/select2/dist/js/select2.full.min';
import '../node_modules/select2/dist/css/select2.min.css';
import '../node_modules/bootstrap/less/bootstrap.less';
import 'bootstrap';
import '../node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css';
import 'croppie';
import '../node_modules/croppie/croppie.css';

angular
    .module('myApp', [
        uiRouter,
        auth,
        home,
        audios,
        user
        ])
    .directive('app', function () {
        return {
            restrict: 'E',
            template: '<ui-view></ui-view>'
        }
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
    })
    .service('userInterceptor', function () {
        var service = this;

        service.request = function (config) {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = localStorage.getItem('Authorization');
            }
            return config;
        };
    })
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('userInterceptor');
}]);