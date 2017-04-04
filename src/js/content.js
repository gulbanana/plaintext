for (var key in window.CKEDITOR.instances) {
    if (CKEDITOR.instances.hasOwnProperty(key)) {
        var instance = CKEDITOR.instances[key];
        var container = instance.element.$.parentElement;

        var plainEditor = document.createElement("textarea");
        plainEditor.style.height = "200px";

        var reentrant = false;
        plainEditor.onkeyup = function() {
            if (!reentrant)
            {
                reentrant = true;
                instance.setData(plainEditor.value);
                reentrant = false;
            }
        }
        instance.on("change", function() {
            if (!reentrant)
            {
                reentrant = true;
                plainEditor.value = instance.getData();
                reentrant = false;
            }
        });

        container.appendChild(plainEditor);
    }  
}