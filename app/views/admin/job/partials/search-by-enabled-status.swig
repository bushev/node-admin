{% macro searchByJobEnabledStatus() %}

  {% set filterName = 'inFieldEnabled' %}

  <div class="form-group">

    <select class="form-control select2" data-filter="{{ filterName }}" multiple style="width:100%"
            data-placeholder="Filter by enabled status">

      {% set statuses = [{value: true, name: 'Enabled'}, {value: false, name: 'Disabled'}] %}

      {% set filterData = filters.inField | find({filterName: filterName}) %}

      {% for status in statuses %}
        <option value="{{ status.value }}"
                {% if filterData and filterData.fieldValue.indexOf(status.value) > -1 %}selected{% endif %}>
          {{ status.name }}
        </option>
      {% endfor %}
    </select>
  </div>
{% endmacro %}