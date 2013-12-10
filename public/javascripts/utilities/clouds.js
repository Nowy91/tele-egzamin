function hide_clouds()
{
    $('.close').click(function( e ){
        $.cookie(e.target.id, 'closed', { path: '/',expires: 365 });
    });
    var array = document.getElementsByClassName('close');
    for(var i=0; i<array.length; i++)
    {
        hide_cloud(array[i].id,array[i].parentElement);
    }
}
function hide_cloud(cookie_name, alert)
{
    if( $.cookie(cookie_name) == 'closed' ){
        $(alert).hide();
    }
}