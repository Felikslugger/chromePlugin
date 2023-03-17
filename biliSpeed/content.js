// ==UserScript==
// @name         bilibili
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       author
// @match        https://*.bilibili.com/*
// @icon         https://www.felikschen.xyz/Personal/static/friends/Zmiemie/favicon.ico
// @grant        none
// @grant        GM_log
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==
(function () {
    'use strict';


    //打开页面时，获取localStorage中的播放速度
    var playbackRate = localStorage.getItem("playbackRate");
    var radio1 = localStorage.getItem("radio1");
    var radio2 = localStorage.getItem("radio2");


    //如果localStorage中有播放速度，则设置为当前播放速度
    if (playbackRate || document.querySelector('video').playbackRate != playbackRate) {
        console.log(radio1, radio2)
        var videoElements1 = document.getElementsByTagName("video");
        for (var j = 0; j < videoElements1.length; j++) {
            videoElements1[j].playbackRate = playbackRate;
        }
    }
    // 定义不同的播放速度
    var playbackRates = [1, 1.25, 1.5, 1.75, 2, 3, 4, 5];
    var currentSpeed = 1;
    var timer = null;

    // 获取所有的视频元素
    var videoElements = document.getElementsByTagName("video");

    // 控制按钮div
    var controlContainer = document.createElement("div");
    controlContainer.style.position = "absolute";
    controlContainer.style.width = "26px";
    controlContainer.style.left = "0px";
    controlContainer.style.top = "170px";
    controlContainer.style.zIndex = "999";
    controlContainer.style.padding = "10px 0";
    controlContainer.style.background = "#000";
    controlContainer.style.borderRadius = "5px";
    controlContainer.style.display = "flex";
    controlContainer.style.flexDirection = "column";

    // 遍历播放速度数组，并为每个速度创建一个按钮
    for (var i = 0; i < playbackRates.length; i++) {
        // 创建按钮元素
        var buttonElement = document.createElement("button");
        buttonElement.innerText = playbackRates[i];
        buttonElement.style.fontSize = "12px !important"
        buttonElement.style.margin = "5px auto";
        buttonElement.style.width = "100%";
        buttonElement.style.height = "25px";
        buttonElement.style.borderRadius = "5px";
        buttonElement.setAttribute("data-playbackRate", playbackRates[i]);

        // 按钮点击事件
        buttonElement.addEventListener("click", function () {
            //只改变当前button的颜色
            var buttons = document.getElementsByTagName("button");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.background = "#fff";
                buttons[i].style.color = "#000";
            }
            this.style.background = "#f00";
            this.style.color = "#fff";

            var newPlaybackRate = parseFloat(this.getAttribute("data-playbackRate"));
            localStorage.setItem('playbackRate', newPlaybackRate);
            for (var j = 0; j < videoElements.length; j++) {
                videoElements[j].playbackRate = newPlaybackRate;
                videoElements[j].play();
            }
        });
        // 添加到父容器
        controlContainer.appendChild(buttonElement);
    }
    // 添加到页面
    document.body.appendChild(controlContainer);
    //document.querySelector('.left-container').appendChild(controlContainer);

    //获取controlContainer的高度
    var divHeight = controlContainer.offsetHeight;
    //用于弹出菜单
    var span = document.createElement("span");
    span.innerText = ">";
    span.fontSize = "12px";
    span.style.display = 'none';
    span.style.color = "#fff";
    span.style.position = "absolute";
    span.style.right = "5px";
    span.style.height = divHeight + "px";
    span.style.lineHeight = divHeight + "px";
    controlContainer.appendChild(span);

    //加两个单选框，一个是长按，一个是短按
    var radio1 = document.createElement("input");
    radio1.type = "radio";
    radio1.name = "radio";
    radio1.value = "1";
    radio1.checked = true;
    radio1.style.margin = "auto";
    radio1.style.display = "block";
    radio1.style.width = "12px";
    radio1.style.height = "12px";
    radio1.style.cursor = "pointer";
    controlContainer.appendChild(radio1);
    var label1 = document.createElement("label");
    label1.innerText = "长按模式";
    label1.style.color = "#fff";
    label1.style.fontSize = "12px";
    label1.style.transform = "scale(0.8)";
    label1.style.cursor = "pointer";
    controlContainer.appendChild(label1);
    //关闭
    var radio2 = document.createElement("input");
    radio2.type = "radio";
    radio2.name = "radio";
    radio2.value = "2";
    radio2.checked = false;
    radio2.style.margin = "auto";
    radio2.style.display = "block";
    radio2.style.width = "12px";
    radio2.style.height = "12px";
    radio2.style.cursor = "pointer";
    controlContainer.appendChild(radio2);
    var label2 = document.createElement("label");
    label2.innerText = "智能模式";
    label2.style.color = "#fff";
    label2.style.fontSize = "12px";
    label2.style.transform = "scale(0.8)";
    label2.style.cursor = "pointer";
    controlContainer.appendChild(label2);

    //新增两个个div用于包裹radio
    var div1 = document.createElement("div");
    div1.style.display = "flex";
    div1.style.alignItems = "center";
    div1.style.flexDirection = "column";
    div1.style.textAlign = "center";
    div1.style.margin = "5px 0";
    div1.appendChild(radio1);
    div1.appendChild(label1);
    controlContainer.appendChild(div1);
    var div2 = document.createElement("div");
    div2.style.display = "flex";
    div2.style.alignItems = "center";
    div2.style.flexDirection = "column";
    div2.style.textAlign = "center";
    div2.style.margin = "5px 0";
    div2.appendChild(radio2);
    div2.appendChild(label2);
    controlContainer.appendChild(div2);

    //页面刷新
    window.onbeforeunload = function () {
        if (localStorage.getItem('radio1') == true) {
            document.getElementsByName("radio")[0].checked = true;
        }
        if (localStorage.getItem('radio2') == true) {
            document.getElementsByName("radio")[1].checked = true;
        }
    }


    //监听radio的点击事件
    radio1.addEventListener("click", function () {
        if (radio1.checked) {
            videoElements[0].playbackRate = 1;

            var buttons = document.getElementsByTagName("button");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.background = "#fff";
                buttons[i].style.color = "#000";
            }
            buttons[2].style.background = "#f00";
            buttons[2].style.color = "#fff";

            localStorage.setItem('radio1', true);
            localStorage.setItem('radio2', false);
        }
    })
    radio2.addEventListener("click", function () {
        if (radio2.checked) {
            localStorage.setItem('radio1', false);
            localStorage.setItem('radio2', true);
        }
    })


    // 监听键盘事件————长按
    var count = 0;
    document.addEventListener("keydown", function (event) {
        console.log('智能模式');
        //按下count++,用于判断长按和短按
        count++;
        localStorage.setItem('count', count);
        console.log('count', count)
        // =======================================================
        if (radio2.checked) {
            if (event.keyCode >= 48 && event.keyCode <= 57) {
                var speed = event.keyCode - 48;
                currentSpeed = speed;
                //存
                localStorage.setItem('playbackRate', speed);
                for (var i = 0; i < videoElements.length; i++) {
                    videoElements[i].playbackRate = speed;
                    videoElements[i].play();
                }
                //对应的button变色
                var buttons = document.querySelectorAll("button");
                console.log('buttons', buttons);
                for (var i = 0; i < buttons.length; i++) {
                    if (buttons[i].innerHTML == currentSpeed) {
                        buttons[i].style.background = "#f00";
                        buttons[i].style.color = "#fff";
                    } else {
                        buttons[i].style.background = "#fff";
                        buttons[i].style.color = "#000";
                    }
                }
                // 开始计时器，定时检查是否松开键盘
                timer = setInterval(function () {
                    // 判断是否松开键盘
                    if (!event.repeat) {
                        // 停止计时器
                        clearInterval(timer);
                    }
                }, 500);
            }
        } else if (radio1.checked) { //长按
            if (event.keyCode >= 48 && event.keyCode <= 57) {
                var speed = event.keyCode - 48;
                //如果playbackRates中有这个速度，改变样式
                currentSpeed = speed;
                //存
                localStorage.setItem('playbackRate', speed);
                for (var i = 0; i < videoElements.length; i++) {
                    videoElements[i].playbackRate = speed;
                    videoElements[i].play();
                }
                //对应的button变色
                var buttons = document.querySelectorAll("button");
                console.log('buttons', buttons);
                for (var i = 0; i < buttons.length; i++) {
                    if (buttons[i].innerHTML == currentSpeed) {
                        buttons[i].style.background = "#f00";
                        buttons[i].style.color = "#fff";
                    } else {
                        buttons[i].style.background = "#fff";
                        buttons[i].style.color = "#000";
                    }
                }
                // 开始计时器，定时检查是否松开键盘
                timer = setInterval(function () {
                    // 判断是否松开键盘
                    if (!event.repeat) {
                        // 停止计时器
                        clearInterval(timer);
                    }
                }, 500);
            }
        }
    });
    // 键盘
    document.addEventListener("keyup", function (event) {
        if (radio2.checked) {
            //count=1,短按-->松开设置倍速；count>1,长按-->松开暂停
            if (count == 1) {
                videoElements[0].playbackRate = currentSpeed;
            } else {
                videoElements[0].pause()
                count = 0
            }
            //松开重置count
            count = 0
            console.log('count', count)
        } else if (radio1.checked) {
            videoElements[0].playbackRate = 1.0;
            console.log('长按模式', videoElements[0].playbackRate);
            localStorage.setItem('playbackRate', 1);

            var buttons = document.querySelectorAll("button");
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].innerHTML == 1) {
                    buttons[i].style.background = "#f00";
                    buttons[i].style.color = "#fff";
                } else {
                    buttons[i].style.background = "#fff";
                    buttons[i].style.color = "#000";
                }
            }
        }
    });




    //拖动
    //拖动控制按钮
    var drag = false;
    var x, y;
    controlContainer.addEventListener('mousedown', function (e) {
        e.preventDefault();
        drag = true;
        x = e.clientX - controlContainer.offsetLeft;
        y = e.clientY - controlContainer.offsetTop;
    });
    document.addEventListener('mousemove', function (e) {
        if (drag) {
            controlContainer.style.left = e.clientX - x + 'px';
            controlContainer.style.top = e.clientY - y + 'px';
            getRight();
        }
    });
    document.addEventListener('mouseup', function (e) {
        drag = false;
    });


    function getRight() {
        //判断controlContainer是否超出左边界
        if (controlContainer.offsetLeft < -50) {
            span.style.display = 'block';
            console.log('超出左边界', controlContainer.offsetLeft);
        } else {
            span.style.display = 'none';
        }
    }

    //设置hover事件
    controlContainer.addEventListener('mouseover', function () {
        controlContainer.style.cursor = 'pointer';
    });

    //点击恢复
    span.addEventListener('click', function () {
        var timer = setInterval(function () {
            controlContainer.style.left = controlContainer.offsetLeft + 4 + 'px';
            if (controlContainer.offsetLeft >= 25) {
                clearInterval(timer);
                span.style.display = 'none';
            }
        }, 1);
    });

    //监视video的src变化
    var videoSrc = document.getElementsByTagName('video')[0].src;
    console.log('videoSrc', videoSrc);
    localStorage.setItem('videoSrc', videoSrc);
    var videoSrc1 = localStorage.getItem('videoSrc');
    setInterval(function () {
        var videoSrc2 = document.getElementsByTagName('video')[0].src;
        if (videoSrc2 != videoSrc1) {
            console.log('videoSrc2', videoSrc2);
            console.log('videoSrc1', videoSrc1);
            localStorage.setItem('videoSrc', videoSrc2);
            videoSrc1 = videoSrc2;
            var radio1 = localStorage.getItem("radio1");
            var radio2 = localStorage.getItem("radio2");
            if (radio1 == 'true') {
                // document.getElementsByName("radio")[0].checked = true;
                document.getElementsByTagName('video')[0].playbackRate = 1.0;
            }
            if (radio2 == 'true') {
                // document.getElementsByName("radio")[1].checked = true;
                document.getElementsByTagName('video')[0].playbackRate = localStorage.getItem('playbackRate');
                console.log('换视频了：速度：', localStorage.getItem('playbackRate'));
            }
        }
    }, 1000);

})();
