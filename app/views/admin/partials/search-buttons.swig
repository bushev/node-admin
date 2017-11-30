{% macro search_buttons() %}

  {% if filters.search.searchValue %}
    {% set showResetButton = true %}
  {% else %}
    {% for entry in filters.inField %}
      {% if entry.filterName.indexOf('inField') == 0 and not entry.fieldValue | isEmpty %}
        {% set showResetButton = true %}
      {% endif %}
    {% endfor %}
    {% for entry in filters.customFilters %}
      {% if entry.filterName.indexOf('custom') == 0 and not entry.filterValue | isEmpty %}
        {% set showResetButton = true %}
      {% endif %}
    {% endfor %}
  {% endif %}

  <div class="pull-right">

    {% if showResetButton %}
      <button type="button" class="btn btn-default reset">
        Reset
      </button>
    {% endif %}

    <button type="button" class="btn btn-primary search">
      <i class="fa fa-search"></i> Search
    </button>

  </div>

{% endmacro %}