$(document).on("mouseenter","#them-khach-hang-moi", function() {
    $('.check-required').blur(function() {
        var value = $(this).val().trim();
        $(this).siblings(".exclamation").remove();
        if(value.length === 0) {
            $(this).addClass("border-red");
            var html = '<div class="exclamation"></div>';
            $(this).parents(".input-item").append(html);
            $(this).css("width", "134px");
        } else {
            $(this).removeClass("border-red");
            $(this).siblings(".exclamation").remove();
            $(this).css("width", "160px");
        }
    });
    $(".input-data").focus(function() {
        $(this).addClass("border-blue");
    });
    $(".input-data").focus(function() {
        $(this).removeClass("border-blue");
    });
    $("#checkEmail").focus(function() {
        $(this).removeClass("border-red");
    })
    $("#btnSave").click(function() {
        $(".check-required").trigger("blur");
        var email = $("#checkEmail").val().trim();
        if(!validateEmail(email)) {
            alert("Sai định dạng email.");
            $("#checkEmail").addClass("border-red");
        }
    });
    $("#btnSaveAdd").click(function() {
        $(".check-required").trigger("blur");
        var email = $("#checkEmail").val().trim();
        if(!validateEmail(email)) {
            alert("Sai định dạng email.");
            $("#checkEmail").addClass("border-red");
        }
    });
    $("#btnCancel").click(function() {
        $(".input-data").each(function (index, element) {
            $(this).val("");
        });
        $(".check-required").each(function (index, element) {
            $(this).removeClass("border-red");
            $(this).siblings(".exclamation").remove();
            $(this).css("width", "160px");
        });
        $("#checkEmail").removeClass("border-red");
    });
    function validateEmail(sEmail) {
        var filter = /^([\w-\.]{1,30})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return filter.test(sEmail);
    }
    $(".form-input-data").draggable({
        revert: false,
        revertDuration: 10,
        iframeFix: true,
        cancel: ".form-input-textbox, .button-bottom"
    });
    $("#them-khach-hang-moi .img-icon").click(function() {
        $("#them-khach-hang-moi").html("");
        $("#lam-mo-nen").removeClass("background-fadein");
    })
});
