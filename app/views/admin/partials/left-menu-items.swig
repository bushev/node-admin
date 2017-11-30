<ul class="nav nav-pills nav-stacked">
  <li>
    <a href="/" target="_blank"><i class="fa fa-home"></i> <span>Front UI</span></a>
  </li>
  {% if loggedUser %}
    {% if loggedUser.isAdmin %}
      {% for item in navigation %}
        {% set activeParentItem = false %}
        {% set hasItemIdInUrl = originalUrl.search("[0-9a-f]{24}") != -1 %}
        {% if item.url == originalUrl || originalUrl.indexOf(item.url + '/') === 0 and item.url !=== '/admin' and item.subItems.length === 0 %}
          {% set activeParentItem = true %}
        {% else %}
          {% if item.subItems.length > 0 %}
            {% for subItem in item.subItems %}
              {% if subItem.url == originalUrl || originalUrl.indexOf(subItem.url + '?') == 0 || subItem.url + '/create' == originalUrl || originalUrl.indexOf(subItem.url + '/') == 0 and hasItemIdInUrl %}
                {% set activeParentItem = true %}
              {% endif %}
            {% endfor %}
          {% endif %}
        {% endif %}
        <li class="{% if item.subItems.length > 0 %}parent{% endif %} {% if activeParentItem %}active{% endif %}">
          <a href="{{ item.url || '#' }}">
            <i class="fa {{ item.icon }}"></i> <span>{{ item.name }}</span>
          </a>
          {% if item.subItems.length > 0 %}
            <ul class="children">
              {% for subItem in item.subItems %}
                <li
                  class="{% if subItem.url == originalUrl || originalUrl.indexOf(subItem.url + '?') == 0 || subItem.url + '/create' == originalUrl ||originalUrl.indexOf(subItem.url + '/') == 0 and hasItemIdInUrl %}active{% endif %}">
                  <a href="{{ subItem.url }}">
                    <i class="fa {{ subItem.icon }}"></i> <span>{{ subItem.name }}</span>
                  </a>
                </li>
              {% endfor %}
            </ul>
          {% endif %}
        </li>
      {% endfor %}
    {% else %}
      <li>
        <a href="/admin/login"><i class="fa fa-user"></i> <span>Signin</span></a>
      </li>
    {% endif %}
  {% endif %}
</ul>
