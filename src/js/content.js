var attachedInstances = [];

for (var key in window.CKEDITOR.instances) {
    if (CKEDITOR.instances.hasOwnProperty(key)) {
        attach(CKEDITOR.instances[key]);
    }  
}

CKEDITOR.on("instanceReady", function(e) {
    attach(e.editor);
});

function attach(instance) {
    if (attachedInstances.indexOf(instance) != -1) {
        return;
    }
    attachedInstances.push(instance);

    var container = instance.element.$.parentElement;
    console.log("attaching with parent:");
    console.log(container);

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