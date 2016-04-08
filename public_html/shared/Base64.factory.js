myApp.factory("Base64Factory", [function Base64Factory(){
    return function(evt) {
        var files = evt.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();

            reader.onload = function(readerEvt) {
                var binaryString = readerEvt.target.result;
                document.getElementById("base64textarea").value = btoa(binaryString);
            };

            reader.readAsBinaryString(file);
        }
    };
}])