// set up sockets
<?php
        if($_SERVER["SERVER_NAME"]!="commins.ca")
	{
                $socketHost = '192.168.1.95'; // 103
		$socketPort = 8080;
	}
	else
        {
		$socketHost = 'h.commins.ca';
		$socketPort = 8080;
	}
	echo "var socket = io.connect('http://".$socketHost.":".$socketPort."');\n";
?>

socket.on('newMsg', function (from, msg) {
	 var showMessageHowLong = 2; // how long to hide name and show message
	 
	 // hide name briefly
	 var target = ig.game.getEntityByName(from);
	 if(target!=undefined) ig.game.hideName(target.name, showMessageHowLong);
	 
	 ig.game.spawnEntity( EntityBubble, 0, 0,
	 {
		  from: from,
		  msg: msg,
		  lifespan: showMessageHowLong
	 } );
});

socket.on('incomingTell', function (from, msg) {
	 ig.game.events.push("Msg from " + from + ": " + msg);
});

socket.on('welcome', function (msg) {
	if(msg!='Welcome')
        {
            document.body.innerHTML = "";
            if(msg=='NameTaken')
            {
                window.alert( "That name is currently being used. Please use another.");
                throw new Error('Halting game due to username being in use.');
            }
            window.alert("Did not receive welcome from server.");
            throw new Error('Halting game because server did not send welcome message.');
        }
        else ig.game.events.push(msg);
});
	  
// the new add player
socket.on('addPlayer', function (user, x, y, direction, skin) {
	 var player = ig.game.getEntitiesByType( EntityLocalPlayer )[0]; // !! is it needed?
	 
	 ig.game.events.push(user + " entered the area.");
	 
	 ig.game.spawnEntity( EntityNetworkPlayer, x, y,
	 {
		  name: user,
		  skin: skin,
		  facing: direction,
		  animation: 6
	 } );
});

// consider merging this whole thing with playerPositions
socket.on('addAllPlayers', function (players) {
	 var localPlayer = ig.game.getEntitiesByType( EntityLocalPlayer )[0];
	 
	 for(i=0; i<players.length; i++)
	 {
		  if(localPlayer.name!=players[i].name)
		  {
			   ig.game.spawnEntity( EntityNetworkPlayer, players[i].pos.x, players[i].pos.y,
			   {
				    name: players[i].name,
				    facing: players[i].facing,
				    skin: players[i].skin,
				    animation:6
			   } );
		  }
	 }
});

socket.on('playerPositions', function (players)
// updates all **currently existing**
// Otherplayer entity positions and directions
{
	 var netplayers = ig.game.getEntitiesByType( EntityNetworkPlayer );
	 if(netplayers)
	 {
		  for(var i=0; i<netplayers.length; i++)
		  {
			   for(var j in players)
			   {
				    // if names match, update position
				    if(netplayers[i].name==players[j].name)
				    {
					     netplayers[i].pos.x = players[j].pos.x;
					     netplayers[i].pos.y = players[j].pos.y;
					     var sw = players[j].facing;
					     switch(sw)
					     {
						      case 'left':
							       netplayers[i].animation = 7;
							       break;
						      case 'right':
							       netplayers[i].animation = 8;
							       break;
						      case 'up':
							       netplayers[i].animation = 5;
							       break;
						      case 'down':
							       netplayers[i].animation = 6;
							       break;
					     };
				    }
			   }
		  }
	 }
});