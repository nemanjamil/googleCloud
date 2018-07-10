var demo1 = $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox();
$("#demoform").submit(function() {
    alert($('[name="duallistbox_demo1[]"]').val());
    return false;
});




$(document).ready(function(){

    xml = '<?xml version="1.0" encoding="UTF-8"?><note><to>Tove</to><from>Jani</from>' +
        '<heading>Reminder</heading>' +
        '<body>Don\'t forget me this weekend!</body></note>';
    $(".showxml").text(vkbeautify.xml(xml,5));  // text, html, append


    jsonexample = '{"menu":{"id": "file","value": [1,2,3],"popup":{"menuitem":[{"value":["one","two"],"onclick":"CreateNewDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}}}';

    $(".jsonview").text(vkbeautify.json(jsonexample,5));
    //var url = "http://careers.stackoverflow.com/jobs/feed?searchTerm=python&location=02144&range=30";
    /*var url = "http://masinealati.rs/parametri.php?action=ping";
    $.ajax({
        url: url,
        dataType:"text",
        error:function(){$('.info').append($('<p>error! '+url+'</p>'));},
        success: function(data) {
            //xml_neat = formatXml(data);
            $('.formatted').text("aaa");
        }
    });*/
});

