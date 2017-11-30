{% macro pagination_rows() %}
  {% if pagination %}
    <select id="pageSizeSelector" basePath="{{ pagination.basePath }}">
      <option value="10" {% if pagination.pageSize == 10 %}selected{% endif %}>10 rows</option>
      <option value="25" {% if pagination.pageSize == 25 %}selected{% endif %}>25 rows</option>
      <option value="50" {% if pagination.pageSize == 50 %}selected{% endif %}>50 rows</option>
      <option value="100" {% if pagination.pageSize == 100 %}selected{% endif %}>100 rows</option>
    </select>
  {% endif %}
{% endmacro %}
