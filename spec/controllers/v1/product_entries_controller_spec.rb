require "spec_helper"

describe V1::ProductEntriesController do
  render_views

  let(:inventory) { FactoryGirl.create(:inventory, :with_product_entries) }
  # XXX what type of user?
  let(:user) { FactoryGirl.create(:user) }

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  context "#index" do
    it "requires logged in user" do
      sign_out :user

      get :index, inventory_id: inventory.id
      assert_response :unauthorized
    end

    it "gets an inventory's product entries" do
      sign_in user
      get :index, inventory_id: inventory.id
      product_entries = assigns(:product_entries)

      assert_response :success
      expect(product_entries.count).to eq(inventory.product_entries.count)
    end
  end

  context "#show" do
    it "requires logged in user" do
      sign_out :user

      get :show, inventory_id: inventory.id, id: inventory.product_entries.first.id
      assert_response :unauthorized
    end

    it "gets an inventory's specific product entry" do
      sign_in user
      get :show, inventory_id: inventory.id, id: inventory.product_entries.first.id
      product_entry = assigns(:product_entry)

      assert_response :success
      expect(product_entry.id).to eq(inventory.product_entries.first.id)
    end
  end

  context "#create" do
    it "requires logged in user" do
      sign_out :user

      post :create, inventory_id: inventory.id
      assert_response :unauthorized
    end

    it "doesn't create an incomplete product entry" do
      sign_in user

      post :create, inventory_id: inventory.id
      assert_response 422
      expect(assigns(:product_entry).persisted?).to be(false)
    end

    it "returns json errors when a product entry can't be created" do
      sign_in user

      post :create, inventory_id: inventory.id
      assert_response 422
      expect(json["errors"].values.flatten).to include("can't be blank")
    end

    it "creates a record" do
      sign_in user

      post :create,
           inventory_id: inventory.id,
           general_inventory_question_attributes: {
             data_type: [GeneralInventoryQuestion.product_types.first]
           },
           usage_question_attributes: {
             notes: "notes"
           },
           technical_question_attributes: {
             hosting: TechnicalQuestion.hostings.first
           }

      assert_response 201
    end
  end

  context "#update" do
    let(:product_entry) { inventory.product_entries.first }

    it "requires logged in user" do
      sign_out :user

      put :update, inventory_id: inventory.id, id: product_entry.id
      assert_response :unauthorized
    end

    it "returns json errors when a product entry can't be updated" do
      sign_in user

      put :update,
          inventory_id: inventory.id,
          id: product_entry.id,
          general_inventory_question_attributes: {
            data_type: ["derp"]
          }

      assert_response 422
      expect(json["errors"].values.flatten).to include("derp is not permissible")
    end

    it "updates a record" do
      sign_in user

      put :update,
          inventory_id: inventory.id,
          id: product_entry.id,
          usage_question_attributes: {
            notes: "other notes"
          }

      assert_response 200
      expect(product_entry.reload.usage_question.notes).to eq("other notes")
    end
  end
end
