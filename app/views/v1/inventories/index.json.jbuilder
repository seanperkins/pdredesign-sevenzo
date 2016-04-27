json.array! @inventories do |inventory|
  json.partial! 'v1/inventories/inventory', inventory: inventory
  json.links Link::Inventory.new(inventory, current_user).execute
end
