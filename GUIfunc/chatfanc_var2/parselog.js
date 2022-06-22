const delay = require("../../generalfunc/delay");
const chat = require("../../GUIfunc/chatfanc_var2/chatprayer");
module.exports = async (chat_obj) => {
    let log = [];
    for (let i = 1; i < chat_obj.continuationContents.liveChatContinuation.actions.length; i++) {
        let obj;
        let Item
        try {
            obj = chat_obj.continuationContents.liveChatContinuation.actions[i].replayChatItemAction.actions[0].addChatItemAction.item;
        } catch {
            continue
        }
        if ('liveChatMembershipItemRenderer' in obj) {//メンシ系のもののとき
            let text;
            obj = obj.liveChatMembershipItemRenderer;
            if ('headerPrimaryText' in obj) {
                if ('runs' in obj.headerPrimaryText) {
                    text = await headertotext(obj.headerPrimaryText.runs);
                } else {
                    text = [obj.headerPrimaryText.simpleText];
                }
            }
            let subtext;
            if ('headerSubtext' in obj) {
                if ('runs' in obj.headerSubtext) {
                    subtext = await headertotext(obj.headerSubtext.runs);
                } else {
                    subtext = [obj.headerSubtext.simpleText];
                }
            }
            let usertype = 'nomal';
            let badge = null;
            if ('authorBadges' in obj) {
                usertype = 'member';
                badge = obj.authorBadges[0].liveChatAuthorBadgeRenderer.customThumbnail.thumbnails[1].url;
            }
            Item = {
                type: 'member',
                user: {
                    type: usertype,
                    badge: badge,
                    name: obj.authorName.simpleText,
                    icon: obj.authorPhoto.thumbnails[1].url
                },
                text: text,
                subtext: subtext,
                duration: await DtS(obj.timestampText.simpleText)
            }
        } else if ('liveChatPaidMessageRenderer' in obj) {//スパチャのとき
            let text;
            obj = obj.liveChatPaidMessageRenderer;
            if ('message' in obj) {
                if ('runs' in obj.message) {
                    text = await headertotext(obj.message.runs);
                } else {
                    text = [obj.message.simpleText];
                }
            }
            let usertype = 'nomal';
            let badge = null;
            if ('authorBadges' in obj) {
                usertype = 'member';
                badge = obj.authorBadges[0].liveChatAuthorBadgeRenderer.customThumbnail.thumbnails[1].url;
            }
            Item = {
                type: 'superchat',
                user: {
                    type: usertype,
                    badge: badge,
                    name: obj.authorName.simpleText,
                    icon: obj.authorPhoto.thumbnails[1].url
                },
                text: text,
                purchaseAmount: obj.purchaseAmountText.simpleText,
                duration: await DtS(obj.timestampText.simpleText)
            }
        } else if ('liveChatTextMessageRenderer' in obj) {//通常チャット
            let text;
            obj = obj.liveChatTextMessageRenderer;
            if ('message' in obj) {
                if ('runs' in obj.message) {
                    text = await headertotext(obj.message.runs);
                } else {
                    text = [obj.message.simpleText];
                }
            }
            let usertype = 'nomal';
            let badge = null;
            if ('authorBadges' in obj) {
                try {
                    badge = obj.authorBadges[0].liveChatAuthorBadgeRenderer.customThumbnail.thumbnails[1].url;
                    usertype = 'member';
                } catch (e) {
                    usertype = 'moderator';
                    badge = '🔧';
                }
            }
            let username;
            try {
                username = obj.authorName.simpleText;
            } catch (e) {
                username = "";
            }
            Item = {
                type: 'nomal',
                user: {
                    type: usertype,
                    badge: badge,
                    name: username,
                    icon: obj.authorPhoto.thumbnails[1].url
                },
                text: text,
                duration: await DtS(obj.timestampText.simpleText)
            }
        }
        log.push(Item);
    }
    return log;
}

async function headertotext(src){
    let res = [];
    for(let value of src){
        let text;
        if('text' in value)
            text={
                type:'text',
                src:value.text
            };
        if('emoji' in value) {
            if (value.emoji.isCustomEmoji){
                text={
                    type:'pic',
                    src:value.emoji.image.thumbnails[1].url
                }
            }else {
                text={
                    type:'emoji',
                    src:value.emoji.emojiId
                }
            }
        }
        res.push(text)
    }
    return res;
}

async function DtS(src){
    if(src[0].match('-'))
        return 0;
    let res;
    let temp = src.split(/:/g);
    if(temp.length == 2){
        res = parseInt(temp[0]*60)+parseInt(temp[1]);
    }else {
        res = parseInt(temp[0]*60*60)+parseInt(temp[1]*60)+parseInt(temp[2]);
    }
    return res;
}
