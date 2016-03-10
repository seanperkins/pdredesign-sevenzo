require 'spec_helper'
require 'faker'

describe V1::InventoriesController do
  render_views

  describe 'GET #index' do
    context 'when not authenticated' do

      before(:each) do
        get :index, format: :json
      end

      it {
        expect(response.status).to eq 401
      }
    end

    context 'when authenticated' do
      context 'when there are no records' do

        let(:user) {
          create(:user)
        }

        before(:each) do
          sign_in user
          get :index, format: :json
        end

        it 'pulls back an empty list' do
          expect(json['inventories'].size).to eq 0
        end
      end

      context 'when there are records' do
        context 'when they belong to the current user' do

          let(:inventory) {
            create(:inventory)
          }

          let(:user) {
            inventory.user
          }

          before(:each) do
            sign_in user
            get :index, format: :json
          end

          it 'returns an array of size 1' do
            expect(json['inventories'].size).to eq 1
          end

          it 'contains the single entry' do
            expect(json['inventories'][0]['id']).to eq inventory.id
          end
        end

        context 'when they do not belong to the current user' do

          let(:user) {
            create(:user)
          }

          let(:other_user) {
            create(:user)
          }

          let!(:inventories) {
            create_list(:inventory, 5, user: other_user)
          }

          before(:each) do
            sign_in user
            get :index, format: :json
          end
          it 'pulls back an empty list' do
            expect(json['inventories'].size).to eq 0
          end
        end
      end
    end
  end

  describe 'POST #create' do
    context 'when not authenticated' do

      let(:district) {
        create(:district)
      }

      before(:each) do
        post :create, inventory: {district: {id: district.id}, name: 'I exist', deadline: 1.week.from_now.to_date.strftime('%m/%d/%y')}, format: :json
      end

      it {
        expect(response.status).to eq 401
      }
    end


    context 'when authenticated' do
      context 'with a title that is too short' do
        let(:user) {
          create(:user, :with_district)
        }

        let(:district) {
          user.districts.first
        }

        before(:each) do
          sign_in user
          post :create, inventory: {district: {id: district.id}, name: '', deadline: 1.week.from_now.to_date.strftime('%m/%d/%y')}, format: :json
        end

        it 'sends back a meaningful error message' do
          expect(json['errors']['name'][0]).to eq 'is too short (minimum is 1 character)'
        end

        it 'rejects the request' do
          expect(response.status).to eq 400
        end
      end

      context 'with a title that is too long' do
        let(:user) {
          create(:user, :with_district)
        }

        let(:district) {
          user.districts.first
        }

        before(:each) do
          sign_in user
          post :create, inventory: {district: {id: district.id}, name: Faker::Lorem.characters(256), deadline: 1.week.from_now.to_date.strftime('%m/%d/%y')}, format: :json
        end

        it 'sends back a meaningful error message' do
          expect(json['errors']['name'][0]).to eq 'is too long (maximum is 255 characters)'
        end

        it 'rejects the request' do
          expect(response.status).to eq 400
        end
      end

      context 'with a valid title' do
        let(:user) {
          create(:user, :with_district)
        }

        let(:district) {
          user.districts.first
        }

        let(:deadline) {
          1.week.from_now.to_date.strftime('%m/%d/%Y')
        }

        before(:each) do
          sign_in user
          post :create, inventory: {district: {id: district.id}, name: Faker::Lorem.characters(32), deadline: deadline}, format: :json
        end

        it { expect(json['id']).to_not be_nil }
        it { expect(Time.parse(json['deadline'])).to eq DateTime.strptime(deadline, '%m/%d/%Y') }
        it { expect(json['district_id']).to eq district.id }
        it { expect(json['user_id']).to eq user.id }
        it { expect(json['name']).to_not be_nil }
        it { expect(json['created_at']).to_not be_nil }
        it { expect(json['updated_at']).to_not be_nil }
        it { expect(json['district_name']).to_not be_nil }

        it 'persists the entity' do
          expect(Inventory.all.size).to eq 1
        end
      end

      context 'with a missing deadline' do
        let(:user) {
          create(:user, :with_district)
        }

        let(:district) {
          user.districts.first
        }

        let(:deadline) {
          ''
        }

        before(:each) do
          sign_in user
          post :create, inventory: {district: {id: district.id}, name: Faker::Lorem.characters(32), deadline: deadline}, format: :json
        end

        it 'rejects the request' do
          expect(response.status).to eq 400
        end

        it 'sends back a meaningful error message' do
          expect(json['errors']['deadline'][0]).to eq "can't be blank"
        end
      end

      context 'with a malformatted deadline string' do
        let(:user) {
          create(:user, :with_district)
        }

        let(:district) {
          user.districts.first
        }

        let(:deadline) {
          'foo this is broken bar'
        }

        before(:each) do
          sign_in user
          post :create, inventory: {district: {id: district.id}, name: Faker::Lorem.characters(32), deadline: deadline}, format: :json
        end

        it 'rejects the request' do
          expect(response.status).to eq 400
        end

        it 'sends back a meaningful error message' do
          expect(json['errors']['deadline'][0]).to eq 'must be in DD/MM/YYYY format'
        end

        it { expect(json['errors']['deadline'].length).to eq 1 }
      end

      context 'with a deadline in the past' do
        let(:user) {
          create(:user, :with_district)
        }

        let(:district) {
          user.districts.first
        }

        let(:deadline) {
          1.week.ago.to_date.strftime('%m/%d/%y')
        }

        before(:each) do
          sign_in user
          post :create, inventory: {district: {id: district.id}, name: Faker::Lorem.characters(32), deadline: deadline}, format: :json
        end

        it 'rejects the request' do
          expect(response.status).to eq 400
        end

        it 'sends back a meaningful error message' do
          expect(json['errors']['deadline'][0]).to eq 'cannot be in the past'
        end
      end
    end
  end
end
