// $(function(){
//   function buildMESSAGE(message) {
//     var messages = $('tbody').append('<tr class="messages" data-id=' + message.id + '><td>' + message.text + '</td><td><a href="/messages/' + message.id + '">Show</a></td><td><a href="/messages/' + message.id +'/edit">Edit</a></td><td><a data-confirm="Are you sure?" rel="nofollow" data-method="delete" href="/messages/' + message.id + '">Destroy</a></td>');
//   }

//   $(function(){
//     setInterval(update, 5000);
//   });

//     function update(){
//       if($('.messages')[0]{
//         var message_id = $('.messages:last').data('id');
//       } else {
//         var message_id = 0
//       }
//       $.ajax({
//         url:  "api/messages",
//         type: 'GET',
//         data: { //railsに引き渡すデータは
//           message: { id: message_id } //このような形(paramsの形をしています)で、'id'には'message_id'を入れる
//         },
//         dataType: 'json',
//       })
//       .always(function(data){
//         $.each(data, function(i, data){
//           buildMESSAGE(data);
//         });
//       });
//     }
// });




$(function(){

  function buildPost(message){
    // console.log(message)
    if (message.image != null) {
      var html = `<div class="message" data-message-id="${message.id}">
      <div class="message__upper-info">
        <div class="message__upper-info__talker">
            ${message.user_name}
        </div>
        <div class="message__upper-info__date">
            ${message.data}
        </div>  
      </div>  
      <div class="message__text">
        <p class="lower-message__content">
          ${message.content}
        </p>
        <img class="lower-message__image" src="${message.image}" />
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
                        ${message.data}
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

  //自動更新
  var reloadMessages = function (){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      // console.log($('.message:last'))
      console.log(last_message_id);

      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function (message) {
        // console.log("aaa")
        // console.log(data);
        var insertHTML = '';
        message.forEach(function (message) {
          insertHTML = buildPost(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeght}, 'fast');
      })
      .fail(function (){
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});   