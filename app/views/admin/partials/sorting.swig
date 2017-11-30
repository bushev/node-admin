{% macro sorting(items) %}
    {% for item in items %}
        {% if filter.sorting.field == item.field %}
        <a class="btn btn-link sorting"
           href="{{ filter.sorting.basePath }}?filter[sortingField]={{ item.field }}&filter[sortingOrder]={% if filter.sorting.order == 'asc' %}desc{% else %}asc{% endif %}">
            {{ item.title }} <i class="fa fa-sort-alpha-{{ filter.sorting.order }}"></i>
        </a>
        {% else %}
        <a class="btn btn-link sorting"
           href="{{ filter.sorting.basePath }}?filter[sortingField]={{ item.field }}&filter[sortingOrder]=asc">
            {{ item.title }}
        </a>
        {% endif %}
    {% endfor %}
{% endmacro %}
