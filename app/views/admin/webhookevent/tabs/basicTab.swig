<div class="tab-pane active" id="mainProps">

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Basic info</h3>
    </div>
    <div class="panel-body">

      <div class="form-group">
        <label class="col-sm-2 control-label" for="name">Name</label>

        <div class="col-sm-10">
          <input type="text" id="name" name="name" class="form-control" value="{{ item.name }}" required/>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-2 control-label" for="key">Key</label>

        <div class="col-sm-10">
          <input type="text" id="key" name="key" class="form-control" value="{{ item.key }}" required/>
        </div>
      </div>

    </div>
  </div>

</div>
