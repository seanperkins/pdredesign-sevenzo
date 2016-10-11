require 'set'

class RoleValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.empty?
      record.errors.add(attribute, 'At least one role must be specified.')
    else
      if value.size > ToolMember.member_roles.values.size
        record.errors.add(attribute, "You may not add more than #{ToolMember.member_roles.values.size} roles.")
      end

      unless (invalid_roles = (value - ToolMember.member_roles.values)).empty?
        invalid_roles.each do |role|
          record.errors.add(attribute, "Invalid role number: #{role}")
        end
      end

      unless record.new_record?
        if record.roles.count(ToolMember.member_roles[:facilitator]) > 1 || record.roles.count(ToolMember.member_roles[:participant]) > 1
          record.errors.add(attribute, "for #{record.user.email} already exists: #{value}")
        end
      end
    end
  end
end