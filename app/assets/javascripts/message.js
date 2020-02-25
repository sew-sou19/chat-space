$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="post-info">
                      <div class="post-name">${message.user_name}</div>
                      <div class="post-time">${message.created_at}</div>
                    </div>
                    <div class="post-message">${message.content}</div>
                    <img class="post-image" src="${message.image}">
                  </div>`
      return html;
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="post-info">
                      <div class="post-name">${message.user_name}</div>
                      <div class="post-time">${message.created_at}</div>
                    </div>
                    <div class="post-message">${message.content}</div>
                  </div>`
      return html;
    }
  }

  $('#new_message').on('submit' ,function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      $('.send-btn').prop('disabled', false);
      if (data.id) {
        var html = buildHTML(data);
        $('.message-list').append(html);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
        $('form')[0].reset();
      } else {
        alert("メッセージを入力してください")
      }
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
});