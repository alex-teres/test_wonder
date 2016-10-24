class addAudioCtrl{
   
    constructor($scope, Audios, $compile, Categories) {
        this.Audios = Audios;
        this.$scope = $scope;
        this.$compile = $compile;

    }



    addAudio() {
        this.Audios.add({title: this.audio.title, text: this.audio.text, tag:this.audio.tags, category:this.audio.category})
            .then(
                (res) => {
                    $('.modal').modal('hide');
                },
                (err) => {
                    console.log(err);
                }
            );


    }

}
export default addAudioCtrl;