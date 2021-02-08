// ==UserScript==
// @name                bilibili-live-effective-rate
// @name:zh-CN          bilibili-live-effective-rate
// @name:zh-HK          bilibili-live-effective-rate
// @name:zh-TW          bilibili-live-effective-rate
// @name:en             bilibili-live-effective-rate
// @name:ja             bilibili-live-effective-rate
// @namespace           https://github.com/catscarlet/bilibili-live-effective-rate
// @description         bilibili-live-effective-rate 有效观看时长÷直播时长=直播有效率
// @description:zh-CN   bilibili-live-effective-rate 有效观看时长÷直播时长=直播有效率
// @description:zh-HK   bilibili-live-effective-rate 有效觀看時長÷直播時長=直播有效率
// @description:zh-TW   bilibili-live-effective-rate 有效觀看時長÷直播時長=直播有效率
// @description:en      bilibili-live-effective-rate Effective-watching-time / live-duration = live-effective-rate
// @description:ja      bilibili-live-effective-rate 有効観看時長÷直播時長=直播有効率
// @version             0.0.1
// @author              catscarlet
// @match               *://link.bilibili.com/p/center/index*
// @require             https://code.jquery.com/jquery-latest.js
// @run-at              document-end
// @grant               none
// ==/UserScript==

/*
This project is licensed under **GNU AFFERO GENERAL PUBLIC LICENSE Version 3**
*/

(function() {
    'use strict';

    $(function() {

        console.log('bilibili-live-effective-rate loaded');

        checkUrl(document.location);

        window.onpopstate = function(event) {
            checkUrl(document.location);
        };

        function checkUrl(url) {
            if (url == 'https://link.bilibili.com/p/center/index#/data/overview') {
                findCenterGrid();
            }
        }

        function findCenterGrid() {
            const targetNode = document.getElementsByClassName('main-ctnr p-relative f-right')[0];
            const config = {attributes: false, childList: true, subtree: true};
            const callback = function(mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        addAction();
                    } else if (mutation.type === 'attributes') {
                    }
                }
            };
            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
        };

        function colorRate(effectiveRate) {
            let color;
            if (effectiveRate < 20) {
                color = 'darkgreen';
            } else if (effectiveRate < 80) {
                color = 'green';
            } else if (effectiveRate < 100) {
                color = 'darkgoldenrod';
            } else if (effectiveRate < 120) {
                color = 'orange';
            } else {
                color = 'red';
            }

            return color;
        };

        function addAction() {
            let centerGrid = $('.center-grid');

            if (centerGrid.length == 0) {
                console.log('no centerGrid. Return');
                return;
            }

            if (centerGrid.attr('effectiveRateFlag')) {
                console.log('effectiveRateFlag. Return');
                return;
            }

            let effectiveHead = '<td data-v-045de783="" class="effective-rate-head">有效率</td>';
            let centerGridThead = centerGrid.find('thead');
            let centerGridTbody = centerGrid.find('tbody');
            centerGridThead.find('tr').find('.average-time').after(effectiveHead);

            let centerGridTbodyList = centerGridTbody.find('tr');

            centerGridTbodyList.each(function(i) {
                let centerGridTbodyTr = $(this);
                let durationRaw = centerGridTbodyTr.find('.duration').text();
                let averageTimeRaw = centerGridTbodyTr.find('.average-time').text();

                let durationUnit = durationRaw.slice(-2);
                let duration = 0;

                if (durationUnit == '小时') {
                    duration = parseFloat(durationRaw.substr(0, durationRaw.length - 2)) * 60;
                } else {
                    duration = parseFloat(durationRaw.substr(0, durationRaw.length - 2));
                }
                let averageTimeUnit = averageTimeRaw.slice(-2);
                let averageTime = 0;
                if (averageTimeUnit == '小时') {
                    averageTime = parseFloat(averageTimeRaw.substr(0, averageTimeRaw.length - 2)) * 60;
                } else {
                    averageTime = parseFloat(averageTimeRaw.substr(0, averageTimeRaw.length - 2));
                }


                let effectiveRate = (averageTime / duration * 100).toFixed(2);

                let effectiveRatePercent = effectiveRate + ' %';

                let color = colorRate(effectiveRate);

                let effectiveRateTd = '<td data-v-045de783="" class="effective-rate" style="color: ' + color + '">' + effectiveRatePercent + '</td>';
                centerGridTbodyTr.find('.average-time').after(effectiveRateTd);

            });
            centerGrid.attr('effectiveRateFlag', 1);
        }
    });
})();

/*
This project is licensed under **GNU AFFERO GENERAL PUBLIC LICENSE Version 3**
*/
