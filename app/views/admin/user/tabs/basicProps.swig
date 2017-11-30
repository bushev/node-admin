<div class="tab-pane active" id="tab-basic">

  <h4>Basic info</h4>

  <div class="row">
    <div class="col-sm-6">
      <div class="input-group mb15">
        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
        <input type="text" class="form-control" name="firstName" placeholder="Enter Firstname"
               value="{{ item.name.first }}" required autofocus>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="input-group mb15">
        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
        <input type="text" class="form-control" name="lastName" placeholder="Enter Lastname"
               value="{{ item.name.last }}" required>
      </div>
    </div>
  </div>

  <br/>

  <div class="row">
    <div class="col-sm-6">
      <div class="input-group mb15">
        <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
        <input type="email" class="form-control" name="email" placeholder="Enter Email Address"
               value="{{ item.email }}" required>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="input-group mb15">
        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
        <input type="password" class="form-control" name="password" autocomplete="off"
               placeholder="Enter Password">
      </div>
    </div>
    <div class="col-sm-3">
      <div class="input-group mb15">
        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
        <input type="password" class="form-control" name="passwordConfirmation" autocomplete="off"
               placeholder="Repeat Password">
      </div>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="col-sm-6">
      <div class="ckbox ckbox-default">
        <input type="checkbox" id="isAdmin" name="isAdmin" {% if item.isAdmin %}checked{% endif %}>
        <label for="isAdmin">Administrator</label>
      </div>
    </div>
  </div>

</div>
