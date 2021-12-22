
var url = "";

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        addLokiDiv();
    });
})();

var alreadyGot = false;

var addLokiDiv = function() {
    var onload = setTimeout(function() {
        console.log("loki-addLokiDiv");//dddddddddddddddd
        var applyButton = document.querySelector("#add_apply");
        var panel = applyButton.parentNode;
        var lokiDiv = document.createElement("div");
        lokiDiv.id = "tiyan-loki";
        lokiDiv.innerHTML = "Loki";
        lokiDiv.className = "king-btn-demo king-btn king-radius king-info king-radius";
        lokiDiv.style.width = "100px";
        lokiDiv.style.height = "30px";
        lokiDiv.style.textAlign = "center";
        lokiDiv.style.verticalAlign = "middle";
        //lokiDiv.style.lineHeight = lokiDiv.style.height;
        panel.appendChild(lokiDiv);
        lokiDiv.onclick = function() {
            clickLokiDiv();
        }
    }, 1000);
};

var clickLokiDiv = function() {
    var countdown = setInterval(function(countdown) {
        timeLoop(countdown);
    }, 100);
};

var timeLoop = function(countdown) {
    var result = check();
    if (result == "开抢") {
        var applyButton = document.querySelector("#add_apply");
        clearInterval(countdown);
        if (!alreadyGot) {
            console.log("loki-timeLoop, check=" + result);
            applyButton.click();
        }
        alreadyGot = true;
    }
    var lokiDiv = document.querySelector("#tiyan-loki");
    lokiDiv.innerHTML = result;
}

var check = function() {
    //开抢时间
    var TARGET_DATE = 1;
    var TARGET_HOUR = 10;
    var TARGET_MINUTE = 0;
    var TARGET_SECOND = 0;
    var MAX_VALID_SECONDS = 10 * 60;    //target后多久内可以抢

    var now = new Date();
    if (now.getDate() != TARGET_DATE) {
        return "为期尚早";
    }

    var targetTime = new Date(now.getFullYear(), now.getMonth(), TARGET_DATE, TARGET_HOUR, TARGET_MINUTE, TARGET_SECOND).getTime();
    var nowTime = now.getTime();
    var diffSeconds = Math.ceil((targetTime - nowTime) / 1000);

    //10min内才会自动抢
    if (diffSeconds <= 0 && diffSeconds > -MAX_VALID_SECONDS) {
        return "开抢";
    }

    //超时10min
    if (diffSeconds <= -MAX_VALID_SECONDS) {
        return "下次吧";
    }

    var diffMinutes = Math.floor(diffSeconds / 60);
    diffSeconds = Math.floor(diffSeconds % 60);
    var diffHour = Math.floor(diffMinutes / 60);
    diffMinutes = Math.floor(diffMinutes % 60);

    var result = "";
    if (diffHour > 0) {
        result += formatPadding0(diffHour, 2) + ":";
    }
    result += formatPadding0(diffMinutes, 2) + ":";
    result += formatPadding0(diffSeconds, 2);
    return result;
}

var formatPadding0 = function(num, length) {
    var len = (num + "").length;
    var diff = length - len;
    if (diff > 0) {
        return Array(diff + 1).join("0") + num;
    }
    return num;
}
