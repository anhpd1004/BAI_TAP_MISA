$(document).ready(function () {
    var dropdownName = "className";
    $(".add-arrow-icon").click(function() {
        $("[dropdownName='" + dropdownName + "']").removeClass("add-arrow-icon-click");
        $('.' + dropdownName).hide();
        dropdownName = $(this).attr("dropdownName");
        var checkShow = $(this).hasClass("add-arrow-icon-click");
        debugger;
        if(checkShow) {
            $(this).removeClass("add-arrow-icon-click");
            $('.' + dropdownName).hide();
        } else {
            $(this).addClass("add-arrow-icon-click");
            $('.' + dropdownName).show();
        }
    });
    //doi mau back-ground item sidebar khi click
    $(".menu-item a").click(function() {
        var this_title = $(this).attr("title");
        if(this_title === "Danh mục")
            return;
        $(this).addClass("active-item");
        var arrs = $(".menu-item a");
        $.each(arrs, function (i, v) { 
            var t = $(v).attr("title");
            if(t !== this_title) {
                $(v).removeClass("active-item");
            }
        });
    });
    //an hien sidebar
    $(".icon-left-logo-header").click(function() {
        var state = $(".sidebar").css("display");
        if(state !== "none") {
            $(".sidebar").hide();
            $(".content").css("left", "0px");
        } else {
            $(".sidebar").show();
            $(".content").css("left", "230px");
        }
    });
    //hien thi filter box .filter-table .filter-in-header-item
    $(document).on("mouseenter", ".filter-table", function() {
        var filterBox = "";
        $("[filterName]").click(function() {
            $("[filterName='" + filterBox + "'").siblings(".filter-box").remove();
            filterBox = $(this).attr("filterName");
            var html = `
                <div class="filter-box">
                    <a class="circle-icon"><span>*</span> : Chứa</a>
                    <a>= : Bằng</a>
                    <a>+ : Bắt đầu bằng</a>
                    <a>- : Kết thúc bằng</a>
                    <a>! : Không chứa</a>
                </div>
            `;
            $(this).parents(".filter-table").append(html);
        });
        $(document).mouseup(function(e) {
            var container = $("[filterName='" + filterBox + "'");
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.siblings(".filter-box").remove();
            }
        });
    });
});