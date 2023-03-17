//浏览器安装插件时
chrome.runtime.onInstalled.addListener(function () {
    chrome.actions.setBadgeText({ text: 'OFF' });
});

//用户点击插件图标时
chrome.action.onClicked.addListener(async (tab) => {
    const prevStatus = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextStatus = prevStatus === 'ON' ? 'OFF' : 'ON';

    await chrome.action.setBadgeText({ text: nextStatus, tabId: tab.id });
});