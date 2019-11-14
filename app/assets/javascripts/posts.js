$(function(){


  function buildPost(message){
    if (message.image.url != null) {
      var html = `<div class="message" data-message-id="${message.id}">
      <div class="message__upper-info">
        <div class="message__upper-info__talker">
            ${message.user_name}
        </div>
        <div class="message__upper-info__date">
            ${message.created_at}
        </div>  
      </div>  
      <div class="message__text">
        <p class="lower-message__content">
          ${message.content}
        </p>
        <img class="lower-message__image" src="${message.image.url}" />
      </div>
    </div>`
    return html;
    } else {
    }
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                        ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                        ${message.created_at}
                    </div>  
                  </div>  
                  <div class="message__text">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                  </div>
                </div>`
    return html;
  }
    
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType:  false 
    })
    .done(function(message){
      console.log(message);
      var html = buildPost(message);
      $('.messages').append(html)
      $('form')[0].reset();
      $(".submit-btn").removeAttr("disabled")
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      return false;
    })
    .fail(function(){
      alert('エラー')
    })
  })
  //   $(function(){

  //   //自動更新
  //   var reloadMessages = function (){
  //     if (window.location.href.match(/\/groups\/\d+\/messages/)){
  //       var last_message_id = $('.message:last').data("messasge-id");


  //       $.ajax({
  //         url: "api/messages",
  //         type: 'get',
  //         dataType: 'json',
  //         data: {last_id: last_message_id}
  //       })
  //       .done(function (messages) {
  //         var insertHTML = '';
  //         messages.forEach(function (message) {
  //           insertHTML = buildHTML(message);
  //           $('.messages').append(insertHTML);
  //         })
  //         $('.messages').animate({scrollTop: $('.messages')[0].scrollHeght}, 'fast');
  //       })
  //       .fail(function (){
  //         alert('自動更新に失敗しました');
  //       });
  //     };
  //     setInterval(reloadMessages, 7000);
  //   }
  // });   
});
