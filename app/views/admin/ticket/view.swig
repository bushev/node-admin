{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'View ticket', showEditButton: true, showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-md-9">
      <h3>
        {{ item.subject }}
        <small>{{ item.type }}</small>
      </h3>

      <div>Name: {{ item.name }}</div>
      <div>E-mail: {{ item.email }}</div>

      <br>

      <blockquote>
        {{ item.message }}
      </blockquote>

      <div>Status: {{ item.status }}</div>
      <div>Created: {{ moment(item.createdAt).utcOffset(utcOffset).calendar() }}</div>

      {#<pre>{{ item | json(2) }}</pre>#}
    </div>
    <div class="col-md-3">
      <img class="img-responsive" src="{{ item.screenshotBase64 }}" alt="screenshot">
    </div>
  </div>

{% endblock %}
