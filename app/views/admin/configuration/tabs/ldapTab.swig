<div class="tab-pane" id="tab-ldap">

  <h4>LDAP Auth settings</h4>

  <div class="form-group">
    <label class="col-sm-3 control-label">LDAP Auth enabled</label>

    <div class="col-sm-9">
      <input type="checkbox" name="ldapEnabled" class="form-control"
             {% if item.authentication.ldap.enabled %}checked{% endif %}/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">LDAP Server URL</label>

    <div class="col-sm-9">
      <input type="text" name="ldapUrl" class="form-control"
             value="{{ item.authentication.ldap.url }}"/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Bind DN</label>

    <div class="col-sm-9">
      <input type="text" name="ldapBindDn" class="form-control"
             value="{{ item.authentication.ldap.bindDn }}"/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Bind Credentials</label>

    <div class="col-sm-9">
      <input type="text" name="ldapBindCredentials" class="form-control"
             value="{{ item.authentication.ldap.bindCredentials }}"/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Search Base</label>

    <div class="col-sm-9">
      <input type="text" name="ldapSearchBase" class="form-control"
             value="{{ item.authentication.ldap.searchBase }}"/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Search Filter</label>

    <div class="col-sm-9">
      <input type="text" name="ldapSearchFilter" class="form-control"
             value="{{ item.authentication.ldap.searchFilter }}"/>
    </div>
  </div>
</div>
