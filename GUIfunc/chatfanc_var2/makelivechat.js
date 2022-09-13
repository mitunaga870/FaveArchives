module.exports = (id) => {
    const chat = $('<iframe>');
    chat.attr('src',"https://www.youtube.com/live_chat?v="+id+"&embed_domain=localhost");
    console.log(chat);
    $('#coment').append(chat);
}