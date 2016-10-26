class HomeCtrl{
    constructor($scope, User, Auth, Home,$state){

        this.localStorage = localStorage;
        this.Home = Home;
        this.$state = $state;
        User.me().then(
            function (res) {
                $scope.user = res;
                Auth.setUser(res);
                if ($scope.user.avatarUrl == undefined) {
                    $scope.user.avatarUrl = 'images/avatar.jpg'
                }
            },
            function (x) {
                $scope.errMessage = "Something wrong";
                console.log(x);
            });
    };
}
export default HomeCtrl;