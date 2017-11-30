<div class="tab-pane active" id="tab-basic">

  <h4>Basic info</h4>

  <div class="form-group">
    <label class="col-sm-4 control-label">Asset Name</label>

    <div class="col-sm-4">
      <input type="text" class="form-control" name="name" placeholder="Enter Asset Name"
             value="{{ item.name }}" required autofocus>
    </div>
  </div>

  <div class="form-group">
    <label class="col-sm-4 control-label">File</label>

    <div class="col-sm-4">
      <input type="file" class="form-control" name="file" required>
    </div>
  </div>

</div>
