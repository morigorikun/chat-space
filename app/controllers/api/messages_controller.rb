class Api::MessagesController < ApplicationController
  def index
    @group =  Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    @messages = @group.messages.includes(:user).where("id >  #{last_message_id}")
    # binding.pry
  end

  # def index
  #   @messages = Message.all
  #   # ここから追記
  #   respond_to do |format| 
  #     format.html # html形式でアクセスがあった場合は特に何もなし(@messages = Message.allして終わり）
  #     format.json { @new_message = Message.where('id > ?', params[:message][:id]) } # json形式でアクセスがあった場合は、params[:message][:id]よりも大きいidがないかMessageから検索して、@new_messageに代入する
  #   end
  # end
end

