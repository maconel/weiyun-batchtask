// ==UserScript==
// @name         WeiyunOfflineDownload
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.weiyun.com/disk
// @grant        none
// ==/UserScript==

var url = "";

var addDownloadDiv = function() {
    var onload = setTimeout(function(){
        var panel = document.querySelector("div.mod-nav.clearfix");
        var downloadDiv = document.createElement("div");
        var brotherDiv = document.querySelector("div.mod-action-wrap.mod-action-wrap-create.clearfix");
        downloadDiv.innerHTML = "批量任务";
        downloadDiv.className = "mod-action-wrap";
        downloadDiv.style.width = "100px";
        downloadDiv.style.height = "34px";
        downloadDiv.style.textAlign = "center";
        downloadDiv.style.lineHeight = downloadDiv.style.height;
        panel.appendChild(downloadDiv);
        downloadDiv.onclick = function(){
            clickNewDiv();
        }
    }, 1000);
};

var clickNewDiv = function() {
    var onclicktimer = setTimeout(function(){
        showInput();
    }, 10);
};

var showInput = function() {
    var panel = document.querySelector("div.mod-nav.clearfix");

    var inputPanel = document.createElement("div");
    inputPanel.id = "inputPanel";
    inputPanel.style.width = "500px";
    inputPanel.style.height = "500px";
    inputPanel.style.background = "#FFF";

    var downloadInput = document.createElement("textarea");
    downloadInput.id = "downloadInput";
    downloadInput.style.width = "500px";
    downloadInput.style.height = "400px";
    inputPanel.appendChild(downloadInput);

    var startButton = document.createElement("button");
    startButton.style = "button";
    startButton.innerHTML = "开始";
    startButton.style.width = "80px";
    inputPanel.appendChild(startButton);
    startButton.onclick = function() {
        clickStart();
    }

    panel.appendChild(inputPanel);
};

var readUrls = function() {
    var downloadInput = document.querySelector("#downloadInput");
    return downloadInput.value.split("\n");
}

var clickStart = function() {
    var index = 0;
    var urls = readUrls();
    var inputPanel = document.querySelector("#inputPanel");
    inputPanel.remove();
    if (urls) {
        var walkovertimer = setInterval(function(){
            do {
                url = urls[index];
                index++;
                if (!url || url.length <= 0)
                    continue;
            } while(false);

            if (index >= urls.length) {
                clearInterval(walkovertimer);
                return;
            }

            addTask();
        }, 2000);
    }
};

var addTask = function() {
    var onclicktimer = setTimeout(function(){
        var newDiv = document.querySelector("div.action-item:not(#formFileInputCt)");
        newDiv.click();
        clickDownloadMenuItem();
    }, 10);
}

var clickDownloadMenuItem = function() {
    var onclicktimer = setTimeout(function(){
        var o0 = document.querySelectorAll("div.mod-bubble-menu.with-border");
        var o1 = o0[1];
        var o2 = o1.querySelectorAll("li.menu-item");
        var o3 = o2[o2.length-1];
        var downloadMenuItem = o3;
        var onclicktimer = setTimeout(function(){
            downloadMenuItem.click();
            clickLinkDiv();
        }, 10);
    }, 10);
};

var clickLinkDiv = function() {
    var onclicktimer = setTimeout(function(){
        var o0 = document.querySelectorAll("li.tab-nav-item");
        var o1 = o0[o0.length-1];
        var linkDiv = o1;
        var onclicktimer = setTimeout(function(){
            linkDiv.click();
            inputLink();
            clickNextButton();
        }, 10);
    }, 10);
};

var inputLink = function() {
    var onclicktimer = setTimeout(function(){
        var o0 = document.querySelector("textarea.input-block");
        o0.value = url;
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        document.querySelector("textarea.input-block").dispatchEvent(event);
        //clickNextButton();
    }, 10);
};

var clickNextButton = function() {
    var onclicktimer = setTimeout(function(){
        var o0 = document.querySelector("li.tab-cont-item.online.act");
        var o1 = o0.querySelector("button.btn.btn-active.btn-disable");
        var nextButton = o1;
        //nextButton.className = "btn btn-active";
        var onclicktimer = setTimeout(function(){
            nextButton.click();
        }, 10);
    }, 10);
};

(function() {
    'use strict';

    // Your code here...
    document.addEventListener('DOMContentLoaded', function() {
        addDownloadDiv();
    });
})();
