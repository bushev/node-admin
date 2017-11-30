{% macro back_button() %}

  {% if backUrl %}
    <a href="{{ backUrl }}" class="btn btn-default btn-block">
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
      Back
    </a>
  {% endif %}

{% endmacro %}