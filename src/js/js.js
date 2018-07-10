var demo1 = $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox();
$("#demoform").submit(function() {
    alert($('[name="duallistbox_demo1[]"]').val());
    return false;
});


var data = {
    "data": {
        "x": "1",
        "y": "1",
        "url": "http://url.com"
    },
    "event": "start",
    "show": 1,
    "id": 50
}


document.getElementById("json").innerHTML = JSON.stringify(data, undefined, 2);


function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function(index, node)
    {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ ))
        {
            indent = 0;
        }
        else if (node.match( /^<\/\w/ ))
        {
            if (pad != 0)
            {
                pad -= 1;
            }
        }
        else if (node.match( /^<\w[^>]*[^\/]>.*$/ ))
        {
            indent = 1;
        }
        else
        {
            indent = 0;
        }
        var padding = '';
        for (var i = 0; i < pad; i++)
        {
            padding += '  ';
        }
        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted;
}

$(document).ready(function(){

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

