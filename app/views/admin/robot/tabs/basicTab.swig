<div class="tab-pane active" id="tab-basic">

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Basic info</h3>
    </div>
    <div class="panel-body">

      <div class="row">
        <div class="col-sm-9">
          <div class="form-group">
            <label class="control-label" for="name">Name</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ item.name }}" required/>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <label class="control-label" for="enabled">Enabled</label>
            <input type="checkbox" name="enabled" id="enabled" {% if item.enabled %}checked{% endif %}>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="subnet">Subnet</label>
            <input type="text" id="subnet" name="subnet" class="form-control" value="{{ item.subnet }}"/>
          </div>
        </div>
      </div>

      <h5>OR</h5>

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="userAgent">User Agent</label>
            <input type="text" id="userAgent" name="userAgent" class="form-control" value="{{ item.userAgent }}"/>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
