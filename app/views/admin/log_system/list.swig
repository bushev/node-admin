{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {% include "../partials/pageheader.swig" with { 'pageTitle': 'System logs'} %}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-2">

      {{ search() }}

      <ul class="nav nav-pills nav-stacked nav-msg">
        {{ quick_filter({search: '?filter[priority]=danger', name: 'Priority: Danger'}) }}
      </ul>

      <br/>

    </div>

    <div class="col-sm-9 col-md-9 col-lg-10">
      <div class="msg-header">
        <div class="pull-right">
          <h5 class="sm-title text-right">{{ pagination_summary() }}</h5>
          {{ pagination_pages() }}
        </div>
      </div>

      <div class="list-group media-list msg-list">
        <div class="list-group-item list-group-sorting">
          <div class="">
            Sort by:
            {{ sorting_column({title: 'Timestamp', field: 'createdAt'}) }}
          </div>
        </div>

        {% for item in items %}
          {% set viewActionUrl = baseUrl + '/' + item.id %}
          {% set deleteActionUrl = baseUrl + '/' + item.id + '/delete' %}

          <div class="list-group-item">

            <div class="list-group-item-body">

              <div class="pull-right media-option">
                <small>{{ moment(item.createdAt).utcOffset(utcOffset).calendar() }}</small>
                {{ resource_action_buttons({deleteActionUrl: deleteActionUrl}) }}
              </div>

              <a href="{{ viewActionUrl }}">

                <h4 class="sender">
                  {{ item.category }}
                </h4>

                <pre>{{ item.message }}</pre>
              </a>

              <p>
                <span class="label label-{{ item.priority }}">{{ item.priority }}</span>
              </p>

            </div>
          </div>
        {% endfor %}

      </div>

      <div class="list-group-footer">
        <div class="pull-right">
          {{ pagination_rows() }}
        </div>
        <div class="pull-left">
          {{ pagination_pages() }}
        </div>
      </div>

    </div>

  </div>

{% endblock %}