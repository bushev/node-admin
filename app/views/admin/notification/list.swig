{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Notifications'}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-2">

      {{ search() }}

      <br/>

    </div>

    <div class="col-sm-9 col-md-9 col-lg-10">
      <div class="msg-header">
        <div class="pull-right">
          <h5 class="sm-title text-right">{{ pagination_summary() }}</h5>
          {{ pagination_pages() }}
        </div>

        {{ bulk_actions({check: true, bulkDelete: true}) }}

      </div>

      <div class="list-group media-list msg-list">
        <div class="list-group-item list-group-sorting">
          <div class="">
            Sort by:
            {{ sorting_column({title: 'Timestamp', field: 'createdAt'}) }}
            {{ sorting_column({title: 'Notification Type', field: 'notificationType'}) }}
            {{ sorting_column({title: 'Resource Type', field: 'resourceType'}) }}
          </div>
        </div>

        {% for item in items %}
          {% set viewActionUrl = baseUrl + '/' + item.id %}
          {% set deleteActionUrl = baseUrl + '/' + item.id + '/delete' %}

          {% set originatorName = '-' %}
          {% if row.originator != null %}
            {% set originatorName = row.originator.fullName %}
          {% endif %}
          {% set targetUserName = '-' %}
          {% if row.targetUser != null %}
            {% set targetUserName = row.targetUser.fullName %}
          {% endif %}

          <div class="list-group-item">

            {{ item_select_checkbox() }}

            <div class="list-group-item-body">

              <div class="pull-right media-option">
                <small>{{ moment(item.createdAt).utcOffset(utcOffset).calendar() }}</small>
                {{ resource_action_buttons({deleteActionUrl: deleteActionUrl}) }}
              </div>

              <a href="{{ viewActionUrl }}">
                <h4 class="sender">
                  {{ item.notificationType }} - {{ item.resourceType }}
                </h4>
              </a>

              By: <strong>{{ originatorName }}</strong>
              <br>
              Target User: <strong>{{ targetUserName }}</strong>
              <br>
              <pre>{{ item.message }}</pre>
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