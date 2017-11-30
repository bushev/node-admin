{% macro search() %}
  <div class="input-group search-box">
    <input type="hidden" id="oldValue" value="{{ filters.search.searchValue }}">
    <input type="hidden" id="basePath" value="{{ filters.search.basePath }}">

    <input type="text" id="searchValue" class="form-control" placeholder="Search..."
           value="{{ filters.search.searchValue }}" data-filter="search">
        <span class="input-group-btn">
            <button type="button" class="btn btn-primary search">
              <i class="fa fa-search"></i>
            </button>
          {% if filters.search.searchValue %}
            <button type="button" class="btn btn-default reset">
              Reset
            </button>
          {% endif %}
        </span>
  </div>
{% endmacro %}
