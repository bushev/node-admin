{% macro tableRow(item, field, label) %}
  {% if not label %}
    {% set label = field | capitalize %}
  {% endif %}
  <tr>
    <th scope="row">{{ label }}</th>
    <td>{{ item[field] | default('-') }}</td>
  </tr>
{% endmacro %}