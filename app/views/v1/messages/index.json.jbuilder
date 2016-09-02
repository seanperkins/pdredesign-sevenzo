json.messages @messages, :id, :category, :teaser, :sent_at do |message|
  json.id message.id
  json.category message.category
  json.teaser sanitize(message.teaser, tags: [])
  json.sent_at message.sent_at
end
