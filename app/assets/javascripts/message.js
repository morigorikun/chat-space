$(function(){
  $(".chat__group_name").on("keyup", function(){
    var input = $(".chat__group_name").val();    //フォームの値を取得して変数に代入する
    console.log(input);
  });
});