module InviteToolMessageHelper
  def default_assessment_message
    'The goal of this assessment is to understand how our district\'s current professional development system is operating and focus collective energy for improvement. To participate along with your colleagues, first click the "Begin Assessment Now" button below. You will be prompted to set a personal password for your PDredesign account. Once you do so, you will be able to answer the questions and submit your responses.'
  end

  def default_inventory_message
    "The goal of the PDredesign Data & Tech Inventory is to get the big picture of data and technology systems that support professional learning in your district.

    To participate along with your colleagues, you must first register with PDredesign. Once registered, you'll be able to contribute to and review your district's inventory of products. Please contact #{current_user.name} with any questions at #{current_user.email}."
  end

  def default_analysis_message
    "The goal of the Data & Tech Analysis is to get the big picture of data and technology systems that support professional learning in your district. The Analysis consists of an in-person discussion of how well current data systems, technology infrastructure, and product purchases are aligned to professional development goals.

    To participate along with your colleagues, you must first register with PDredesign. Once registered, you'll have ongoing access to the Analysis and results. Please contact #{current_user.name} with any questions at #{current_user.email}."
  end
end
