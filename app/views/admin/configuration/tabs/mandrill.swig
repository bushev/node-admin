<div class="tab-pane" id="mandrill">

    <h4>Mandrill settings</h4>

    <div class="form-group">
        <label class="col-sm-2 control-label">API Key</label>

        <div class="col-sm-10">
            <input type="text" name="mandrillApiKey" class="form-control"
                   value="{{ item.mandrill.apiKey }}" autofocus/>
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label">From Name</label>

        <div class="col-sm-10">
            <input type="text" name="mandrillFromName" class="form-control"
                   value="{{ item.mandrill.fromName }}"/>
        </div>
    </div>

    <div class="form-group">
        <label class="col-sm-2 control-label">From Email</label>

        <div class="col-sm-10">
            <input type="text" name="mandrillFromEmail" class="form-control"
                   value="{{ item.mandrill.fromEmail }}"/>
        </div>
    </div>
</div>
