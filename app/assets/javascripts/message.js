$(function(){

  var search_list = $("#user-search-result");
  var member_list = $("#member_search_result");
  
function appendUser(user)  {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
              </div>`;
  search_list.append(html);
}

function appendNoUser(user){
  var html = `<div class='chat-group-user clearfix'>
                <p class="chat-group-user__name">${ user }</p>
              </div>`
  search_list.append(html);
}

function appendMembers(userName,userId) {
  var html =`
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${userId}'>
              <p class='chat-group-user__name'>${userName}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
  member_list.append(html)
}

  $(".chat-group-form__input").on("keyup", function(){
    var input = $(this).val();    //フォームの値を取得して変数に代入する
    console.log(input)
  
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input },
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("該当するユーザーがいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });

    $(document).on('click','.user-search-add', function(){
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      $(this).parent().remove();
      appendMembers(name, user_id);
    });

    $(document).on("click", '.user-search-remove', function() {
      $(this).parent().remove();
    });

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
});