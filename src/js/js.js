var demo1 = $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox();
$("#demoform").submit(function() {
    alert($('[name="duallistbox_demo1[]"]').val());
    return false;
});