class addAudioCtrl{
   
    constructor($scope, Audios, $compile, $element) {
        this.Audios = Audios;
        this.$scope = $scope;
        this.$compile = $compile;
        this.$element = $element;
    }



    addAudio() {
        var audioFile =  this.$element.find('input[type="file"]');
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/api/upload/', true);
        var formData = new FormData();
        formData.append("file", audioFile[0].files[0]);
        console.log('Audio upload');
        console.log(audioFile[0].files[0].name);
        xhr.send(formData);
        this.Audios.add({title: this.audio.title, artist:this.audio.artist,link:audioFile[0].files[0].name})
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