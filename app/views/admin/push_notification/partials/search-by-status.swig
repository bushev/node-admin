{% macro searchByPushNotificationStatus() %}

  {% set filterName = 'inFieldStatus' %}

  <div class="form-group">

    <select class="form-control select2" data-filter="{{ filterName }}" multiple style="width:100%"
            data-placeholder="Filter by status">

      {% set statuses = [{value: 'success', name: 'Success'}, {value: 'error', name: 'Error'}] %}

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