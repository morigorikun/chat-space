$(function(){

  var search_list = $("#user-search-result");
  
function appendUser(user)  {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
              </div>`;
  search_list.append(html);
}

function appendNoUser(user){
  var html = `<div class='chat-group-user clearfix'>
                <p class="chat-group-user__name">${user}が見つかりません</p>
              </div>`
  search_list.append(html);
}

  $(".chat-group-form__input").on("keyup", function(){
    var input = $(this).val();    //フォームの値を取得して変数に代入する

  
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input },
    })
    .done(function(users) {
      console.log(users)
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
      alert('エラー');
    });
  });
});