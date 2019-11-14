json.array! @messages do |message|
  json.content     message.content
  json.image       message.image.url
  json.data        message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name   message.user.name
  json.id          message.id
end

# if @new_message.present? # @new_messageに中身があれば
#   json.array! @new_message # 配列かつjson形式で@new_messageを返す
# end