<div class="tab-pane" id="frontui">

    <h4>Front UI</h4>

    <div class="form-group">
        <label class="col-sm-3 control-label">Maintenance</label>
        <div class="col-sm-09">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="maintenance"
                           {% if item.frontui.maintenance %}checked{% endif %} />&nbsp;
                </label>
            </div>
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-3 control-label">Require Login</label>
        <div class="col-sm-09">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="requireLogin"
                           {% if item.frontui.requireLogin %}checked{% endif %} />&nbsp;
                </label>
            </div>
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-3 control-label">Enable Login</label>
        <div class="col-sm-09">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="enableLogin"
                           {% if item.frontui.enableLogin %}checked{% endif %} />&nbsp;
                </label>
            </div>
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-3 control-label">Enable registration</label>
        <div class="col-sm-09">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="enableRegistration"
                           {% if item.frontui.enableRegistration %}checked{% endif %} />&nbsp;
                </label>
            </div>
        </div>
    </div>

</div>
