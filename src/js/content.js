for (var instance in window.CKEDITOR.instances) {
    if (CKEDITOR.instances.hasOwnProperty(instance)) {
        console.log("found instance " + instance);
    }
}