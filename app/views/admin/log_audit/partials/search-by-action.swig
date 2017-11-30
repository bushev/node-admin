{% macro auditLoggingSearchByAction() %}

  {% set filterName = 'inFieldAction' %}

  <div class="form-group">

    <select class="form-control select2" data-filter="{{ filterName }}" multiple style="width:100%"
            data-placeholder="Filter by action">

      {% set filterData = filters.inField | find({filterName: filterName}) %}

      {% for action in filtersData.actions %}
        <option value="{{ action }}"
                {% if filterData and filterData.fieldValue.indexOf(action) > -1 %}selected{% endif %}>
          {{ action }}
        </option>
      {% endfor %}
    </select>
  </div>
{% endmacro %}
