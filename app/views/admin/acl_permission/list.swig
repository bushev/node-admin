{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'ACL Permissions Management'}) }}
{% endblock %}

{% block pagecontent %}
  <table class="table table-bordered">
    <thead>
    <tr>
      <th class="col-sm-2"></th>
      <th class="col-sm-2"></th>
      {% for role in roles %}
        <th class="col-sm-1">{{ role.name }}</th>
      {% endfor %}
    </tr>
    </thead>
    <tbody>
    {% for resource in resources %}
      {% for action in resource.actions %}
        <tr>
          {% if loop.first %}
            <td rowspan="{{ resource.actions.length }}"><strong>{{ resource.name }}</strong></td>
          {% endif %}
          <td>
            {{ action }}
          </td>
          {% for role in roles %}
            {% set checked = false %}
            {% set permission_id = undefined %}

            {% for permission in items %}
              {% if permission.aclRole.toString() === role.id and
              permission.aclResource.toString() === resource.id and
              permission.actionName === action %}
              {% set checked = true %}
                {% set permission_id = permission._id.toString() %}
              {% endif %}
            {% endfor %}
            <td>
              <input type="checkbox" class="resource_action_checkbox"
                      {% if checked %} checked data-permission_id="{{ permission_id }}" {% endif %}
                     data-role="{{ role.id }}" data-resource="{{ resource.id }}"
                     data-action="{{ action }}" data-base_url="{{ baseUrl }}"
                     data-create_url="{{ createActionUrl }}">
            </td>
          {% endfor %}
        </tr>
      {% endfor %}
    {% endfor %}
    </tbody>
  </table>
{% endblock %}
