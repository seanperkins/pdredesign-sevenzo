json.analyses @analyses do |analysis|
  json.partial! 'v1/analyses/analysis', analysis: analysis
end
