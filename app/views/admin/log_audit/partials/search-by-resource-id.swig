{% macro auditLoggingSearchByResourceId() %}

  {% set filterName = 'inFieldResourceId' %}

  <div class="form-group">

    {% set filterData = filters.inField | find({filterName: filterName}) %}

    <input type="text" class="form-control" data-filter="{{ filterName }}" style="width:100%;font-size:11px;"
           {% if filterData %}value="{{ filterData.fieldValue }}"{% endif %}
           placeholder="Filter by resource ID">
  </div>
{% endmacro %}
