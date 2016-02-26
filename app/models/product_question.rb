# == Schema Information
#
# Table name: product_questions
#
#  id               :integer          not null, primary key
#  how_its_assigned :text             not null, is an Array
#  how_its_used     :text             not null, is an Array
#  how_its_accessed :text             not null, is an Array
#  audience         :text             not null, is an Array
#  created_at       :datetime
#  updated_at       :datetime
#

class ProductQuestion < ActiveRecord::Base

  enum product_assignments: {
      teacher_choice: 'Teacher Choice',
      data_driven: 'Data Driven',
      differentiated: 'Differentiated',
      adaptive: 'Adaptive'
  }

  enum product_usage_frequency: {
      anytime: 'Anytime Anywhere',
      blended: 'Blended',
      scheduled: 'Scheduled'
  }

  enum product_accessed_via: {
      content_repository: 'Content Repository',
      video_share: 'Video Share Platform',
      social_network: 'Social Network',
      video_library: 'Video Library',
      webinars: 'Webinars',
      asynchronous_modules: 'Asynchronous Modules',
      online_courses: 'Online Courses'
  }

  enum product_audience: {
      administrators: 'Administrators',
      teachers: 'Teachers',
      home_school: 'Home School',
      parents: 'Parents',
      students: 'Students'
  }
end
