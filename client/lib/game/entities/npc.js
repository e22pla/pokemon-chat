ig.module (
    
    'game.entities.npc'
)

.requires(
    
    'game.ents.player'
)
.defines(function(){
   
    EntityNpc = EntityPlayer.extend({
	
	isNPC: true,
	
	// recorded travel time of 9 units (144px)
	// in 2.100 seconds in VBA.
	// ie 144/2.1 = 68.571428 or ~69
	speed: 69,
	size: {x: 16, y: 16},
	type: ig.Entity.TYPE.A,
	animSheet: new ig.AnimationSheet( 'media/entity-icons.png', 16, 16 ),
	
	skin: 'fat',
	
	facing: "down",
	facingLast: "down",
	facingUpdated: false,
	isMove: false, // waiting for move key-press
	leftFoot: true, // used to alternate step animations
	destination: 0, // used for both x and y planes
	
	// NPC movement patterns
	movePattern: [], // no pattern by default
	moveNext: 0,
	moveTimer: null,
	moveDelay: 2, // delay in seconds between moves
	
	faceNextMove: function()
	{
	    this.facing = this.movePattern[this.moveNext];
	    this.moveAnimStop();
	},
	justMoved: function()
	{
	    this.moveNext++;
	    if(this.moveNext >= this.movePattern.length)
	    this.moveNext = 0; // cycle pattern
	},
	
	startMove: function()
	{
	    var newGrass = this.facingGrass();
	    if(newGrass) newGrass.play();
	    
	    this.isMove = true;
	    this.setMoveDestination();
	    this.moveAnimStart();
	},
	
	init: function( x, y, settings ) {
	    this.parent( x, y, settings );
	    
	    this.moveTimer = new ig.Timer();
	    this.moveTimer.set(Math.random()*3); // desync NPC's from each other
	    
	    if(this.behaviour=='a')
	    {
		this.movePattern = ['up','down','up','right','down','down',
			       'left','left','left','right','right',
			       'left','up','right'];
	    }
	    else if(this.behaviour=='b')
	    {
		this.movePattern = ['down','left','right',
			       'left','right','up'];
	    }
	    
	    // weltmeister icon
	    this.addAnim( 'weltmeister', 0.1, [1] );
	    this.currentAnim = this.anims.weltmeister;
	},
	
	ready: function()
	{
	    this.offset = { x: 0, y: 16 };
	    
	    this.animSheet = new ig.AnimationSheet( 'media/people/rs.fat.png', 16, 32 );
	    
	    this.reskin();
	    
	    // create a name entity to follow this one
	    ig.game.spawnEntity(
		EntityName,
		this.pos.x,
		this.pos.y,
		{ follow: this.name, color: 'green' }
	    );
	},
	
	draw: function()
	{
	    this.parent();
	},
	
	update: function() {
	    
	    this.zIndex = this.pos.y + 1;
	    
	    this.parent();
	    
	    if(this.isMove)
	    {
		this.finishMove(this);
	    }
	    else
	    {
		if(this.moveTimer.delta()>=0)
		{
		    this.faceNextMove();
		    if(this.canMove())
		    {
			this.startMove();
			this.justMoved();
		    }
		}
	    }

		
	}
    });

    
})