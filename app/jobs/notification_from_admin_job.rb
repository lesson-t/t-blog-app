class NotificationFromAdminJob < ApplicationJob
    queue_as :defaul
    
    def perform(msg)
        User.all.each do |user|
            NotificationFromAdminMailer.notify(user, msg).deliver_later
        end
    end
end