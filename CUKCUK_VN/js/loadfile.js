$(document).ready(function () {

    $("#dictionary").click(function() {
        $("#danh-muc-sub-menu").toggle();
    });
    $.ajax({
        type: "get",
        url: "view/danhmuc.html",
        dataType: "html",
        success: function (response) {
            $("#danh-muc-sub-menu").html(response);
            $("#danh-muc-sub-menu").hide();
        }
    });
    $(document).on("change", "#number-in-page", function() {
        var xxx = $(this).val();
        $(".total-page").text(Math.ceil(numberKH / xxx));
        $(".current-page").attr("max", Math.ceil(numberKH / xxx));
        var currentPage = $(".current-page").val();
        var y = (currentPage - 1) * xxx * 24 + 63;
        $(".cls-gridPanel").scrollTop(y);
        var from_to = currentPage === 15 ? (((currentPage-1) * xxx + 1) + " - " + numberKH) : (((currentPage - 1) * xxx + 1) + " - " + currentPage * xxx);
        $(".from-to-customers").text(from_to);
    })
    $(document).on("change", ".current-page", function() {
        var xxx = $(this).val();
        var cusPerPages = $("#number-in-page").val();
        var y = (xxx - 1) * cusPerPages * 24 + 63;
        $(".cls-gridPanel").scrollTop(y);
        debugger;
        var from_to = xxx === 15 ? (((xxx-1) * cusPerPages + 1) + " - " + numberKH) : (((xxx - 1) * cusPerPages + 1) + " - " + xxx * cusPerPages);
        $(".from-to-customers").text(from_to);
    })
    $(document).on("click", "#child-item-khach-hang", function(){
        $("#danh-muc-sub-menu").hide();
        var html = `
            <img id="img-loading-data" src="./content/icons/loadingData2.gif" alt="Loading ..." height="100" width="100">
        `;
        $("body").append(html);
        $.ajax({
            type: "get",
            url: "view/table.html",
            dataType: "html",
            success: function (response) {
                var r = Math.floor(Math.random() *  200 + 300);
                var speed = Math.floor(Math.random() * 5 + 1);
                sleep(r/speed).then(() => {
                    $("#img-loading-data").remove();
                    $(".content").html(response);
                    $("#tbdCustomerList").append(innerTable);
                    $(".total-customers").text(numberKH);
                    var cusPerPages = $("#number-in-page").val();
                    $(".total-page").text(Math.ceil(numberKH / cusPerPages));
                    $(".current-page").attr("max", Math.ceil(numberKH / cusPerPages));
                    var currentPage = $(".current-page").val();
                    var from_to = currentPage === 15 ? (((currentPage-1) * cusPerPages + 1) + " - " + numberKH) : (((currentPage - 1) * cusPerPages + 1) + " - " + currentPage * cusPerPages);
                    $(".from-to-customers").text(from_to);
                });
            }
        });
    });
    var tinhthanhs = [
        "Cần Thơ", "Đà Nẵng", "Hải Phòng", "Hà Nội", "TP HCM", 
        "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn",
        "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", 
        "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk",
        "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai",
        "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang",
        "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum",
        "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An",
        "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", 
        "Quảng Bình","Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị",
        "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
        "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang",
        "Vĩnh Long", "Vĩnh Phúc", "Yên Bái", "Phú Yên"
    ];
    var innerTable = "";
    var numberKH = Math.floor(Math.random() * 500 + 20);//toi thieu 20 khach hang
    for(var i = 1; i < numberKH; i++) {
        if(i % 2 === 1 ) {
            innerTable += `<tr data-active='${KHCode(i)}'>`;
        } else {
            innerTable += `<tr class='row-highlight' data-active='${KHCode(i)}'>`;
        }
        var mathue = Math.floor(Math.random() * 888888888 + 1111111);
        var sdt = Math.floor(Math.random() * 888888888 + 100000000);
        var tinh = Math.floor(Math.random() * 63);
        innerTable += ` 
                <td>${KHCode(i)}</td>
                <td>Phạm Duy Anh ${i}</td>
                <td>Công ty cổ phần Misa</td>
                <td>${mathue}</td>
                <td>${tinhthanhs[tinh]}</td>
                <td>(+84) ${sdt}</td>
                <td>anhpd.soict.hust@gmail.com</td>
                <td>TV000${i}</td>
                <td>1</td>
                <td>0</td>
                <td></td>
                <td>false</td>
                <td>false</td>
            </tr>
        `;
    }
    // sleep time expects milliseconds
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    function KHCode(i) {
        if(i < 10) return "KH0000" + i;
        if(i < 100) return "KH000" + i;
        if(i < 1000) return "KH00" + i;
        if(i < 10000) return "KH0" + i;
        return "KH" + i;
    }
    // active row
    $(document).on("click", "[data-active^='KH']", function() {
        $(this).addClass("active");
        var this_data_active = $(this).attr("data-active");
        var xxxs = $("[data-active^='KH']");
        $.each(xxxs, function (indexInArray, e) { 
             var temp = $(e).attr("data-active");
             if(temp !== this_data_active) 
                $(e).removeClass("active");
        });
    });
    $(document).on("click", "#btnThem", function() {
        $.ajax({
            type: "get",
            url: "view/themKhachHang.html",
            dataType: "html",
            success: function (response) {
                $("#lam-mo-nen").addClass("background-fadein");
                $("#them-khach-hang-moi").html(response);
            }
        });
    });
});