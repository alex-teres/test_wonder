class AudiosCtrl{

    constructor($scope, $rootScope,  Audios, User, Auth, $compile){
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.Audios = Audios;
        this.Auth = Auth;
        this.localStorage = localStorage;

        $scope.audios = [];
        if (localStorage.getItem('Authorization') == null) {
            $scope.message = "If you want add some audio files firstly need Sign in/up";
                      Audios.all().then(
                    (res) => {
                        if (res.data.length == 0) {
                            $scope.audiosMessage = ". And seems like this resource doesn't have any music";
                        }
                        else {
                             $scope.audios = res.data;
                        }
                    },
                    (err) => {
                        console.log('error on index.js ' + err);
                    }
                );
        }

        $scope.$on('UserAuth', () => {
            Audios
                .all({owner: Auth.getUser()._id})
                .then(
                    (res) => {
                        if (res.data.length == 0) {
                            $scope.message = "You don't have any audios. Try to add one by pressing green button.";
                        }
                        else {
                            $scope.audios = res.data;
                        }
                    },
                    (err) => {
                        console.log('error on index.js ' + err);
                    }
                );
        });
        
        $scope.$on('audios:add', (event, audio) => {
            $scope.audios.push(audio);
            $scope.message = "";
        });

        $scope.$on('audios:delete', (event, audio) => {

            let audios = $scope.audios;

            for(let i = 0; i < audios.length; i++){

                if (audios[i]._id == audio._id){
                    var j = i;
                }
            }
            $scope.audios.splice(j,1);
            if ($scope.audios.length == 0){
                $scope.message = "You don't have any audios. Try to add one by pressing this button -->";
            }
        });
    }

    deleteAudio(){
        this.Audios.delete(this.audio).then(
            (res) => {
                $('.modal').modal('hide');
                
            },
            (x) => {
                debugger;
            }
    );
    }

    toggleModal(audio){
        this.audio = audio;
        $('.bs-example-modal-sm').modal('show');
    }

}
export default AudiosCtrl;