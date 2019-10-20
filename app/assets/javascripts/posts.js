$(function(){


  function buildPost(message){
    var html = `<div class="message__text">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                  <img class="lower-message__image" src="${message.image.url}" alt="" />
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
      var html = buildPost(message);
      $('.messages').append(html)
      $('form')[0].reset();
      $(".submit-btn").removeAttr("disabled")
      $('html').animate({ scrollTop: $('html')[0].scrollHeight});
      return false;
    })
    .fail(function(){
      alert('エラー')
    })
  })
});
