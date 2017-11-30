{% macro item_select_checkbox() %}
  <div class="ckbox ckbox-primary pull-left">
    <input type="checkbox" id="checkbox_{{ item.id }}" data-item-id="{{ item.id }}">
    <label for="checkbox_{{ item.id }}"></label>
  </div>
{% endmacro %}