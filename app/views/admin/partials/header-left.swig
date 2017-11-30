<div class="header-left">
    <a href="/" class="logo">
        {# Eventually, add a logo input for the global config
        <img src="/assets/images/logo.png" alt="{% if globalConfig && globalConfig.project && globalConfig.project.name %}{{ globalConfig.project.name }}{% endif %}" />
        #}
        <span style="color: white;">{% if globalConfig and globalConfig.project and globalConfig.project.name %}{{ globalConfig.project.name }}{% else %}Project<br/>{% endif %} <small>Admin</small></span>
    </a>
    <div class="pull-right">
        <a href="" class="menu-collapse">
            <i class="fa fa-bars"></i>
        </a>
    </div>
</div>
