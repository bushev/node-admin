<div class="tab-pane active" id="tab-basic">

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Basic info</h3>
    </div>
    <div class="panel-body">

      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <label class="control-label" for="name">Status</label>
            <select name="status" id="name" required class="form-control">
              <option value="open" {% if item.status === 'open' %}selected{% endif %}>Open</option>
              <option value="solved" {% if item.status === 'solved' %}selected{% endif %}>Solved</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
