$(function(){

  //自動更新
  var reloadMessages = function (){
    if (window.location.href.match(/\/group\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("messasge-id");


      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeght}, 'fast');
      })
      .fail(function (){
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
  });   