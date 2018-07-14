$(document).ready(function () {

    var $serverlink = "http://examserver/storage/";
    var $duallist = 'select[name="duallistbox_demo1[]"]';
    var demo1 = $($duallist).bootstrapDualListbox();

    $("#demoform button").click(function (ev) {
        ev.preventDefault();

        serialData = $($duallist).val();
        hashSaltvalue = $("#inputhashsalt").val();

        if (serialData.length == 0) {
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
            data: {data: serialData, hash_salt: hashSaltvalue,savedata : $(this).attr("value")},
            success: function (result) {
                if (result.status) {
                    $(".jsonview").text(vkbeautify.json(result.json));
                    $(".showxml").text(vkbeautify.xml(result.xml, 5));  // text, html, append

                    if (result.savedata){
                        $("#popuptext").html("");

                        $('#popuptext').append(
                            $('<ul>').append(
                                $('<li>').append(
                                    $('<a>').attr('href',$serverlink+result.savedata+'/'+result.savedata+'.json').attr('target','_blank').append("JSON")
                                ),

                                $('<li>').append(
                                    $('<a>').attr('href',$serverlink+result.savedata+'/'+result.savedata+'.xml').attr('target','_blank').append("XML")
                                ),
                                $('<li>').append(
                                    $('<a>').attr('href',$serverlink+result.savedata+'/'+result.savedata+'.SALT').attr('target','_blank').append("SALT")
                                )
                            ));

                        $('.modal').modal('show');
                        return;
                    }

                } else {
                    $("#popuptext").html("");
                    $("#popuptext").html(result.message);
                    $('.modal').modal('show');
                    return;
                }
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


    var $url = "http://examserver.beodigital.tech/api/1.0/all";
    xhr_get($url).done(function (data) {
        $($duallist).empty();
        $.each(data, function (i, item) {
            value = item["sqms_exam_version_id"] + '|' + item["sqms_language_id"] + '|' + item["sqms_syllabus_id"]
            $($duallist).append($('<option lang="' + item["sqms_language_id"] + '" value="' + value + '">' + item["sqms_exam_version_id"] + ' ' + item["sqms_exam_version_name"] + ' </option>'));
        });
        $($duallist).bootstrapDualListbox('refresh', true);
    });


});

