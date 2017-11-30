{% macro searchByPushNotificationPlatform() %}

  {% set filterName = 'inFieldPlatform' %}

  <div class="form-group">

    <select class="form-control select2" data-filter="{{ filterName }}" multiple style="width:100%"
            data-placeholder="Filter by platform">

      {% set platforms = [{value: 'ios', name: 'iOS'}, {value: 'android', name: 'Android'}] %}

      {% set filterData = filters.inField | find({filterName: filterName}) %}

      {% for platform in platforms %}
        <option value="{{ platform.value }}"
                {% if filterData and filterData.fieldValue.indexOf(platform.value) > -1 %}selected{% endif %}>
          {{ platform.name }}
        </option>
      {% endfor %}
    </select>
  </div>
{% endmacro %}