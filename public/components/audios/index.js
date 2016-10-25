import angular from "angular";
import Audios from "./audios.service";
import audiosCtrl from "./audios.controller";
import audiosTpl from "./audios.html";
import addAudioCtrl from "./addAudio.controller";
import addAudioTpl from "./addAudio.html";
import "./audio.styl";


const NAME = 'audios';

function audiosDirective() {
    return {
        restrict: 'E',
        scope: {},
        template: audiosTpl,
        controller: 'audiosCtrl as vm',
        bindToController: true
    };
}

function addAudioDirective() {
    return {
        restrict: 'E',
        scope: {},
        template: addAudioTpl,
        controller: 'addAudioCtrl as vm',
        bindToController: true
    };
}

angular
    .module(NAME, [])
    .directive('audios', audiosDirective)
    .controller('audiosCtrl', ['$scope', '$rootScope', 'Audios', 'User', 'Auth','$compile', audiosCtrl])
    .service('Audios', ['$http', '$q', '$state', '$rootScope', Audios])

    .directive('addAudio', addAudioDirective)
    .controller('addAudioCtrl', ['$scope', 'Audios', '$compile','$element', addAudioCtrl])

    .directive('music', function($sce) {
  return {
    restrict: 'A',
    scope: { code:'=' },
    replace: true,
    template: '<audio ng-src="{{url}}" controls preload></audio>',
    link: function (scope) {
        scope.$watch('code', function (newVal, oldVal) {
           if (newVal !== undefined) {
               scope.url = $sce.trustAsResourceUrl("/api/uploads/music/" + newVal);
           }
        });
    }
  };
})

    .config(function ($stateProvider) {
        $stateProvider
            .state('audios', {
                url: '/audios',
                template: '<audios></audios>'
            })
    });


export default NAME;