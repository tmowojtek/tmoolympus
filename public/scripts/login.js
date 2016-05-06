var main = function () {

    var isLogin = true;

    $("#pegasus").click(function () {
        $(this).fadeOut("slow", function () {
            $(".content").fadeIn("slow");
        });
    });

    $(".login").click(function () {
        if (!isLogin) {
            $(".register-box").fadeToggle("fast", function () {
                $("input[name=register-tag]").val('');
                $("input[name=register-pw]").val('');
                $("input[name=register-mail]").val('');

                $(".login-box").fadeToggle("fast");
            });
            isLogin = true;
        }
    });

    $(".register").click(function () {
        if (isLogin) {
            $(".login-box").fadeToggle("fast", function () {
                $("input[name=login-tag]").val('');
                $("input[name=login-pw]").val('');

                $(".register-box").fadeToggle("fast");
            });
            isLogin = false;
        }
    });
};

$(document).ready(main);