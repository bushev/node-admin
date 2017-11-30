<div class="media profile-left">
  <a class="pull-left profile-thumb" href="profile.html">
    <img class="img-circle" src="/adminAssets/images/guest.png" alt="">
  </a>
  <div class="media-body">
    <h4 class="media-heading">{% if loggedUser %}{{loggedUser.fullName}}{% else %}Guest Visitor{% endif%}</h4>
    <small class="text-muted">Welcome</small>
  </div>
</div>