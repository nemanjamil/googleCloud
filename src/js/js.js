


$(document).ready(function () {

    var $duallist = 'select[name="duallistbox_demo1[]"]';

    var demo1 = $($duallist).bootstrapDualListbox();

    $("#demoform").submit(function (e) {

        e.preventDefault();
        serialData = $($duallist).val();
        hashSaltvalue = $("#inputhashsalt").val();

        if (serialData.length==0) {
            $("#popuptext").html("You must have one exam selected");
            $('.modal').modal('show');
            return;
        }

        if (!hashSaltvalue) {
            $("#popuptext").html("");
            $("#popuptext").html("You must enter HASH_SALT");
            $('.modal').modal('show');
            return;
        }

        
        $url = "http://examserver/api/1.0/sentdata";
        $.ajax({
            url: $url,
            type: "POST",
            //dataType: "JSON",
            data: { data: serialData, hash_salt: hashSaltvalue },
            success: function (result) {
                //console.log(result);
                jsonexample = '{"menu":{"id": "file","value": [1,2,3],"popup":{"menuitem":[{"value":["one","two"],"onclick":"CreateNewDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}}}';
                $(".jsonview").text(vkbeautify.json(result));
            },
            error: function () {
                alert("Error oops.");
            }
        });


    });

    var lastState = $($duallist).val();
  $("#selectList").on("change", function () {
        /*var sel = $('#selectList').val(); // option:selected kada se dodao samo prvi prikaze
        console.log("sel : " + sel);

        var selee = $('#selectList:selected').length;
        console.log(selee);

        val = $('#selectList option:selected').val();
        console.log('val : '+val);

        console.log($(this).val());
        var newState = $(this).val();
        console.log(lastState);                        // selected before
        console.log(newState);                         // selected now
        console.log($(lastState).not(newState).get()); // added elements
        console.log($(newState).not(lastState).get()); // removed elements*/

    });


    var $loading = $('#loading');
    function xhr_get(url) {
        return $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                $loading.html("Loading....");
            }
        })
            .always(function () {
                $loading.html("");
            })
            .fail(function () {
                $loading.html("error please fix");
            });
    }


    xml = '<?xml version="1.0" encoding="UTF-8"?><note><to>Tove</to><from>Jani</from>' +
        '<heading>Reminder</heading>' +
        '<body>Don\'t forget me this weekend!</body></note>';
    $(".showxml").text(vkbeautify.xml(xml, 5));  // text, html, append



    var $url = "http://examserver.beodigital.tech/api/1.0/all";
    xhr_get($url).done(function (data) {
        console.log(data);
        $($duallist).empty();
        $.each(data, function (i, item) {
            value = item["sqms_exam_version_id"]+'|'+item["sqms_language_id"]+'|'+item["sqms_syllabus_id"]
            $($duallist).append($('<option lang="'+item["sqms_language_id"]+'" value="' + value + '">'+item["sqms_exam_version_id"]+ ' ' + item["sqms_exam_version_name"] + ' </option>'));
        });
        $($duallist).bootstrapDualListbox('refresh', true);
    });

    var $url = "http://examserver/api/1.0/hashsalt";
    xhr_get($url).done(function (data) {
        $("#inputhashsalt").val(data);
    });


});

