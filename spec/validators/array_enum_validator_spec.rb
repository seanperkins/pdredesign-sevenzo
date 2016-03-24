require "spec_helper"

class Model
  include ActiveModel::Validations
  attr_accessor :options
end

describe ArrayEnumValidator do
  context "definition" do
    before :each do
      Model.clear_validators!
    end

    it "returns error if enum option is absent" do
      class Model
        validates :options, array_enum: {}
      end
      @model = Model.new
      expect(@model).to be_invalid
      expect(@model.errors[:base]).to include("Precondition failed: enum option required")
    end

    it "returns error if value is nil" do
      class Model
        validates :options, array_enum: {enum: {a: "A"}}
      end
      @model = Model.new
      expect(@model).to be_invalid
      expect(@model.errors[:base]).to include("Precondition failed: value is nil")
    end
  end

  context "simple enum" do
    before do
      Model.clear_validators!
      class Model
        validates :options, array_enum: { enum: {a: "A", b: "B"} }
      end
    end

    before :each do
      @model = Model.new
    end

    it "is valid with valid entries" do
      @model.options = ["A"]
      expect(@model).to be_valid

      @model.options = ["B"]
      expect(@model).to be_valid

      @model.options = ["A", "B"]
      expect(@model).to be_valid
    end

    it "is invalid with invalid entries" do
      expect(@model).to be_invalid

      @model.options = ["C"]
      expect(@model).to be_invalid
    end

    it "is invalid with duplicate entries" do
      @model.options = ["A", "A"]
      expect(@model).to be_invalid

      @model.options = ["C", "C"]
      expect(@model).to be_invalid
    end
  end

  context "enum allowing wildcard" do
    before do
      Model.clear_validators!
      class Model
        validates :options, array_enum: { enum: {a: "A", b: "B"}, allow_wildcard: true }
      end
    end

    before :each do
      @model = Model.new
    end

    it "is valid with valid entries" do
      @model.options = ["A"]
      expect(@model).to be_valid

      @model.options = ["B"]
      expect(@model).to be_valid

      @model.options = ["A", "B"]
      expect(@model).to be_valid

      @model.options = ["derp"]
      expect(@model).to be_valid

      @model.options = ["A", "derp"]
      expect(@model).to be_valid

      @model.options = ["B", "derp"]
      expect(@model).to be_valid

      @model.options = ["A", "B", "derp"]
      expect(@model).to be_valid

      @model.options = ["derp", "A", "B"]
      expect(@model).to be_valid
    end

    it "is invalid with invalid entries" do
      @model.options = ["derp", "A", "B", "herp"]
      expect(@model).to be_invalid

      @model.options = ["derp", "herp"]
      expect(@model).to be_invalid
    end

    it "is invalid with duplicate entries" do

      @model.options = ["derp", "derp"]
      expect(@model).to be_invalid

      @model.options = ["A", "A", "derp"]
      expect(@model).to be_invalid
    end

    it "returns error if more than one wildcard used" do
      @model.options = ["derp", "herp"]
      expect(@model).to be_invalid
      expect(@model.errors.messages[:options]).to include("herp is not permissible: wildcard 'derp' already used")
    end
  end
end
