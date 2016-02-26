class ArrayEnumValidator < ActiveModel::EachValidator

  def validate_each(record, attribute, value)
    return false unless options[:enum]
    value.each do |type|
      unless options[:enum].values.include?(type)
        record.errors.add(attribute, "#{type} is not permissible")
      end
    end
  end
end
