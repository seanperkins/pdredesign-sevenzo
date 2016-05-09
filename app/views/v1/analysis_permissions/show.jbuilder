json.array! @users do |user|
  json.partial! 'user_info', user: user , analysis: @analysis
end
