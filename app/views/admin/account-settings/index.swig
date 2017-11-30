{% extends 'app/views/admin/layout.swig' %}

{% block title %}Account settings{% endblock %}

{% block pageheader %}
  {{ pageheader({title: 'Account settings - Edit', showSaveButton: true}) }}
{% endblock %}

{% block pagecontent %}
  <h3>Account settings</h3>

  <form name="itemForm" action="/admin/account-settings" method="POST">

    <div class="row">
      <div class="col-sm-3 col-md-3 col-lg-2">
        <h5 class="sm-title">Detail Tabs</h5>
        <ul class="nav nav-pills nav-stacked nav-msg">
          <li role="presentation" class="active">
            <a href="#tab-basic" aria-controls="tab-basic" role="tab" data-toggle="tab">Basic info</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-9 col-md-9 col-lg-10">
        <div class="tab-content">
          {% include 'tabs/basic-tab.swig' %}
        </div>
      </div>
    </div>
  </form>
{% endblock %}