{% macro resource_action_buttons(options) %}
  <div class="btn-group">
    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-cog"></i>
    </a>
    <ul class="dropdown-menu pull-right" role="menu">
      {% if options.viewActionUrl %}
        <li>
          <a href="{{ options.viewActionUrl }}">View</a>
        </li>
      {% endif %}

      {% if options.editActionUrl %}
        <li>
          <a href="{{ options.editActionUrl }}">Edit</a>
        </li>
      {% endif %}

      <li class="divider"></li>
      {% if options.deleteActionUrl %}
        <li>
          <a href="javascript:void(0)" title="Delete"
             onclick="if (confirm('Are you sure you want to delete this record?')) {document.location.href = '{{ options.deleteActionUrl }}';}">
            Delete
          </a>
        </li>
      {% endif %}

      {% if options.extraContent and options.extraContent.length > 0 %}
        {% for entry in options.extraContent %}
          {% if entry.type === 'divider' %}
            <li class="divider"></li>
          {% elseif entry.type === 'button' %}
            <li>
              <a href="{{ entry.url }}">{{ entry.title }}</a>
            </li>
          {% else %}
            Error: Unexpected extraContent.type: {{ entry.type }}
          {% endif %}
        {% endfor %}
      {% endif %}

    </ul>
  </div>
{% endmacro %}