class ArrayEnumValidator < ActiveModel::EachValidator

  def validate_each(record, attribute, value)
    unless options[:enum]
      record.errors.add(:base, 'Precondition failed: enum option required')
      return
    end
    if value.nil?
      record.errors.add(:base, 'Precondition failed: value is nil')
      return
    end

    if value.uniq.size != value.size
      record.errors.add(attribute, "#{value} is not permissible: contains duplicate entries")
    end

    if options[:allow_wildcard]
      wildcard_used = nil
      value.each do |type|
        unless options[:enum].values.include?(type)
          if wildcard_used.present?
            record.errors.add(attribute, "#{type} is not permissible: wildcard '#{wildcard_used}' already used")
          else
            wildcard_used = type
          end
        end
      end
    else
      value.each do |type|
        unless options[:enum].values.include?(type)
          record.errors.add(attribute, "#{type} is not permissible")
        end
      end
    end
  end
end
