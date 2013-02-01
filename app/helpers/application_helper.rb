module ApplicationHelper
  def twitterized_type(type)
    case type
      when :success then "alert-success"
      when :alert then "warning"
      when :notice then "info"
      when :error then "alert-error"
      when :info then "alert-info"
      else
        type.to_s
    end
  end
end
