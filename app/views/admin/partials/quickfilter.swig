{% macro quick_filter(options) %}

  {#active#}
  <li class="">
    <a href="{{ baseUrl }}{{ options.search }}">
      {#<span class="badge pull-right">2</span>#}
      <i class="glyphicon glyphicon-star"></i> {{ options.name }}
    </a>
  </li>

{% endmacro %}