{% macro auditLoggingSearchByResource() %}

  {% set filterName = 'inFieldResource' %}

  <div class="form-group">

    <select class="form-control select2" data-filter="{{ filterName }}" multiple style="width:100%"
            data-placeholder="Filter by resource">

      {% set filterData = filters.inField | find({filterName: filterName}) %}

      {% for resource in filtersData.resources %}
        <option value="{{ resource }}"
                {% if filterData and filterData.fieldValue.indexOf(resource) > -1 %}selected{% endif %}>
          {{ resource }}
        </option>
      {% endfor %}
    </select>
  </div>
{% endmacro %}
