{% extends 'app/views/admin/layout.swig' %}

{% block pageheader %}
  {{ pageheader({title: 'SEO - vide data', showEditButton: true, showCloseButton: true}) }}
{% endblock %}

{% block pagecontent %}
  {% include '../partials/table-row.swig' %}
  <div class="row">
    <div class="col-sm-12">
      <h1>
        #{{ item.id }} {{ item.title }}
      </h1>
      <div class="row">
        <div class="col-md-9">
          <table class="table table-striped">
            <tbody>
            {{ tableRow(item, 'title') }}
            {{ tableRow(item, 'published') }}
            {{ tableRow(item, 'content1') }}
            {{ tableRow(item, 'content2') }}
            {{ tableRow(item, 'content3') }}
            {{ tableRow(item, 'content4') }}
            </tbody>
          </table>
        </div>
        {% if item.imageUrl %}
          <div class="col-md-3">
            <img src="{{ item.imageUrl }}">
          </div>
        {% endif %}
      </div>
    </div>
  </div>
  <hr>
  <div class="row">
    <div class="col-sm-12">
      <pre>{{ item | json(2) }}</pre>
    </div>
  </div>
{% endblock %}