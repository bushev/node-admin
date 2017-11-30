{% macro pagination_pages() %}
  {% if pagination %}
    <ul class="pagination">
      {% if pagination.firstPage %}
        <li class='prev'>
          <a href="{{ pagination.basePath }}/page/{{ pagination.firstPage }}">
            First (1)
          </a>
        </li>
      {% endif %}

      {% if pagination.currentPage > 1 %}
        <li class='prev'>
          <a href="{{ pagination.basePath }}/page/{{ pagination.currentPage - 1 }}">
            <i class="fa fa-angle-left"></i>
          </a>
        </li>
      {% endif %}

      {% if pagination.pageRange.length > 0 %}
        {% for page in pagination.pageRange %}
          <li class='{% if page == pagination.currentPage %}active{% endif %}'>
            <a href="{{ pagination.basePath }}/page/{{ page }}">
              {{ page }}
            </a>
          </li>
        {% endfor %}
      {% endif %}

      {% if pagination.currentPage < pagination.totalPages %}
        <li class='prev'>
          <a href="{{ pagination.basePath }}/page/{{ pagination.currentPage + 1 }}">
            <i class="fa fa-angle-right"></i>
          </a>
        </li>
      {% endif %}

      {% if pagination.lastPage %}
        <li class='prev'>
          <a href="{{ pagination.basePath }}/page/{{ pagination.lastPage }}">
            Last ({{ pagination.lastPage }})
          </a>
        </li>
      {% endif %}
    </ul>
  {% endif %}

{% endmacro %}

