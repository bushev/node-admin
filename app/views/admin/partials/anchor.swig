{% macro anchor(options) %}

  {# options.href #}
  {# options.name #}
  {# options.backButtonAllowed - boolean #}
  {# options.backUrlValid - string #}

  {% set href = options.href %}

  {% if options.backButtonAllowed %}

    {% if href.indexOf('?') > -1 %}
      {% set href = href + '&backUrl=' + originalUrl + '&backUrlValid=' + options.backUrlValid %}
    {% else %}
      {% set href = href + '?backUrl=' + originalUrl + '&backUrlValid=' + options.backUrlValid %}
    {% endif %}

  {% endif %}

  <a href="{{ href }}">
    {{ options.name }}
  </a>

{% endmacro %}