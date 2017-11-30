{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Users'}) }}
{% endblock %}

{% block pagecontent %}

  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-2">
      <p>
        <a href="{{ createActionUrl }}" class="btn btn-success btn-block btn-create-msg">Create New</a>
      </p>

      {{ search() }}

      <ul class="nav nav-pills nav-stacked nav-msg">
        {{ quick_filter({search: '?filter[search]=Robin', name: 'Robin'}) }}
      </ul>

      <br/>

      {#<h5 class="sm-title">Additional Filters</h5>#}
      {#<ul class="nav nav-pills nav-stacked nav-msg">#}
      {#<li>#}
      {#<div class="form-group">#}
      {#<select class="form-control">#}
      {#<option>Select list filter</option>#}
      {#</select>#}
      {#</div>#}
      {#</li>#}
      {#<li>#}
      {#<div class="form-group">#}
      {#<div class="ckbox ckbox-default">#}
      {#<input type="checkbox" value="1" id="checkboxDefault" checked="checked"/>#}
      {#<label for="checkboxDefault">Checkbox Filter</label>#}
      {#</div>#}
      {#</div>#}
      {#</li>#}
      {#</ul>#}

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
            {{ sorting_column({title: 'Created', field: 'createdAt'}) }}
            {{ sorting_column({title: 'Updated', field: 'updatedAt'}) }}
            {{ sorting_column({title: 'Last Name', field: 'last_name'}) }}
          </div>
        </div>

        {% for item in items %}
          {% set editActionUrl = baseUrl + '/' + item.id + '/edit' %}
          {% set viewActionUrl = baseUrl + '/' + item.id %}
          {% set deleteActionUrl = baseUrl + '/' + item.id + '/delete' %}

          <div class="list-group-item">

            {{ item_select_checkbox() }}

            <div class="list-group-item-body">

              <div class="pull-right media-option">
                <small>{{ moment(item.updatedAt).utcOffset(utcOffset).calendar() }}</small>
                {{ resource_action_buttons({editActionUrl: editActionUrl, deleteActionUrl: deleteActionUrl}) }}
              </div>

              <a href="{{ viewActionUrl }}">
                <h4 class="sender">
                  {{ item.fullName }}
                </h4>
              </a>

              <p>
                {% if item.isAdmin %}
                  <span class="label label-success">Admin</span>
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