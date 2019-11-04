$(function(){
  var search_list = $("#user-search-result");

  function appendUser(user)  {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`;
    search_list.append(html);
  }

  function appendNoUser(user){
    var html = `<div class='chat-group-user clearfix'>
                  <p class="chat-group-user__name">${ user }</p>
                </div>`;
    search_list.append(html);
  }
  
  
  var member_list = $("#member_search_result");

  function appendMembers(Name,Id) {
    var html =`<div class='chat-group-user'>
                  <input name="group[user_ids][]" type="hidden" value="${Id}">
                  <p class='chat-group-user__name'>${Name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
               </div>`;
    member_list.append(html);
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
  });
  
  $(function(){
    $(document).off('click')
    $(document).on('click','.user-search-add', function(){
      $(this).parent().remove();
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      appendMembers(name, user_id);
    });

    $(document).on("click", '.user-search-remove', function() {
      $(this).parent().remove();
    });
  });
});