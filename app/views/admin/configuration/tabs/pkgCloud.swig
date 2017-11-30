<div class="tab-pane" id="pkgcloud">

  <h4>pkg Cloud settings</h4>

  <div class="form-group">
    <label class="col-sm-3 control-label">Provider</label>

    <div class="col-sm-9">
      <select name="pkgcloudProvider" class="form-control">
        <option value="rackspace" {% if item.pkgcloud.provider === 'rackspace' %}selected{% endif %}>
          Rackspace
        </option>
        <option value="azure" {% if item.pkgcloud.provider === 'azure' %}selected{% endif %}>
          Azure
        </option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">API Key (rackspace)</label>

    <div class="col-sm-9">
      <input type="text" name="pkgcloudApiKey" class="form-control"
             value="{{ item.pkgcloud.apiKey }}"/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Username (rackspace)</label>

    <div class="col-sm-9">
      <input type="text" name="pkgcloudUserName" class="form-control"
             value="{{ item.pkgcloud.userName }}"/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Region (rackspace)</label>

    <div class="col-sm-9">
      <input type="text" name="pkgcloudRegion" class="form-control"
             value="{{ item.pkgcloud.region }}"/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Account name (azure)</label>

    <div class="col-sm-9">
      <input type="text" name="azureAccount" class="form-control"
             value="{{ item.pkgcloud.azureAccount }}"/>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-3 control-label">Access key (azure)</label>

    <div class="col-sm-9">
      <input type="text" name="azureAccessKey" class="form-control"
             value="{{ item.pkgcloud.azureAccessKey }}"/>
    </div>
  </div>
</div>
