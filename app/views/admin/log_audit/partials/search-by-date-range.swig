{% macro auditLoggingSearchByDateRange() %}

  {% set filterName = 'customDateRange' %}

  <div class="form-group">

    {% set filterData = filters.customFilters | find({filterName: filterName}) %}

    <input type="text" class="form-control date-range-picker" data-filter="{{ filterName }}" style="width:100%"
           value="{% if filterData %}{{ filterData.filterValue }}{% endif %}"
           placeholder="Filter by date range">
  </div>
{% endmacro %}
