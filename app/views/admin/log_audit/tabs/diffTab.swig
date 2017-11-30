<div role="tabpanel" class="tab-pane" id="diff-tab">

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Change info</h3>
    </div>
    <div class="panel-body">
      {% if item.diff.length > 0 %}
      {% set diff = JSON.parse(item.diff) %}
      <pre>{% for d in diff %}<strong>{{ d.name }}</strong>: "{{ d.from }}" -> "{{ d.to }}"<br>{% endfor %}</pre>
      {% endif %}
    </div>
  </div>

</div>