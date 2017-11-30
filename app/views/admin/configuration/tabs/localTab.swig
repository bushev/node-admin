<div class="tab-pane" id="tab-local">

  <h4>Local Auth settings</h4>

  <div class="form-group">
    <label class="col-sm-3 control-label">Local Auth enabled</label>

    <div class="col-sm-9">
      <input type="checkbox" name="localEnabled" class="form-control"
             {% if item.authentication.local.enabled %}checked{% endif %}/>
    </div>
  </div>

</div>
