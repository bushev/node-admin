{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Assets'}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-2">
      <p>
        <a href="{{ createActionUrl }}" class="btn btn-success btn-block btn-create-msg">Create New</a>
      </p>

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
            {{ sorting_column({title: 'Name', field: 'name'}) }}
            {{ sorting_column({title: 'Created', field: 'createdAt'}) }}
            {{ sorting_column({title: 'Updated', field: 'updatedAt'}) }}
          </div>
        </div>

        {% for item in items %}
          {% set editActionUrl = baseUrl + '/' + item.id + '/edit' %}
          {% set viewActionUrl = baseUrl + '/' + item.id %}
          {% set deleteActionUrl = baseUrl + '/' + item.id + '/delete' %}

          <div class="list-group-item">

            {{ item_select_checkbox() }}

            <div class="list-group-item-body">

              <div class="text-right">
                <div class="pull-right media-option clearfix">
                  {{ resource_action_buttons({editActionUrl: editActionUrl, deleteActionUrl: deleteActionUrl}) }}

                  <p class="help-block text-right">
                    <small>
                      {{ moment(item.createdAt).utcOffset(utcOffset).calendar() }}
                    </small>
                  </p>
                </div>
              </div>

              <a href="{{ viewActionUrl }}">
                <h4 class="sender">
                  {{ item.name }}
                </h4>
              </a>

              {% if item.cdnUrl %}
                <p>
                  <a href="{{ item.cdnUrl }}" target="_blank">
                    {{ item.cdnUrl }}
                  </a>
                </p>
              {% endif %}

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