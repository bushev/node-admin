<form action="{{ actionUrl }}" method="post" class="form-horizontal form-bordered">

  <div class="form-group">
    <div class="tabbable">
      <ul class="nav nav-pills nav-stacked col-md-3">
        <li class="active"><a href="#project-tab" data-toggle="tab">Project Info</a></li>
        <li><a href="#mandrill" data-toggle="tab">Mandrill</a></li>
        <li><a href="#pkgcloud" data-toggle="tab">pkg Cloud</a></li>
        <li><a href="#frontui" data-toggle="tab">Front UI</a></li>
        <li><a href="#tab-local" data-toggle="tab">Local Auth</a></li>
        <li><a href="#tab-ldap" data-toggle="tab">LDAP Auth</a></li>
      </ul>
      <div class="tab-content col-md-9">
        {% include "tabs/projectTab.swig" %}
        {% include "tabs/mandrill.swig" %}
        {% include "tabs/pkgCloud.swig" %}
        {% include "tabs/frontUi.swig" %}
        {% include "tabs/localTab.swig" %}
        {% include "tabs/ldapTab.swig" %}
      </div>
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-offset-3 col-sm-9">
      <button type="submit" class="btn btn-success">Save</button>
    </div>
  </div>
</form>
