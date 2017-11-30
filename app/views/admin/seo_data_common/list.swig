{% extends 'app/views/admin/layout.swig' %}

{% block title %}SEO - data{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'SEO - data'}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-md-3">

      <p>
        <a href="{{ createActionUrl }}" class="btn btn-success btn-block btn-create-msg">Add</a>
      </p>

      <div class="search-filters">
        {{ search() }}

        <br>

        {{ search_buttons() }}
      </div>
      <br/>

    </div>

    <div class="col-md-9">
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
            {{ sorting_column({title: 'Added', field: 'createdAt'}) }}
            {{ sorting_column({title: 'Modified', field: 'updateAt'}) }}
            {{ sorting_column({title: 'Sub-domain', field: 'subDomain'}) }}
            {{ sorting_column({title: 'URL', field: 'url'}) }}
          </div>
        </div>

        {% for item in items %}
          {% set deleteActionUrl = baseUrl + '/' + item.id + '/delete' %}
          {% set editActionUrl = baseUrl + '/' + item.id + '/edit' %}
          {% set viewActionUrl = baseUrl + '/' + item.id %}

          <div class="list-group-item">

            {{ item_select_checkbox() }}

            <div class="list-group-item-body">
              <div class="pull-right media-option clearfix">

                <div class="text-right">

                  {% if item.published %}
                    <div class="label label-success">published</div>
                  {% else %}
                    <div class="label label-default">not published</div>
                  {% endif %}

                  {{ resource_action_buttons({viewActionUrl: viewActionUrl, editActionUrl: editActionUrl, deleteActionUrl: deleteActionUrl}) }}
                </div>

                <p class="help-block text-right">
                  {% set url = 'https://' %}
                  {% if item.subDomain %}
                    {% set url = url + item.subDomain + '.' %}
                  {% endif %}
                  {% set url = url + 'todo.com' + item.url %}
                  <a href="{{ url }}" target="_blank">
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                    on site
                  </a>
                </p>

              </div>

              <h4 class="sender">
                <a href="{{ viewActionUrl }}">
                  {% if item.title %}
                    {{ item.title }} -
                  {% endif %}
                  {{ item.url }}
                </a>
              </h4>

              <p>
                {% if item.subDomain %}
                  Sub-domain: {{ item.subDomain }}
                {% endif %}
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
