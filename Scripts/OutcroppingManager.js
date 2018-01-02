function OutcroppingManager( gfx )
{
	function Outcropping( pos,id )
	{
		function Menu( pos,size,id )
		{
			GameObject.call( this );
			this.pos = pos;
			this.size = size;
			
			let isHovering = false;
			
			let menuOpen = false;
			const menuRect = new Rect( this.size.x / 4,this.size.y / 4,
				gfx.ScreenWidth / 2.4,gfx.ScreenHeight - this.size.y / 2 );
			let canCloseMenu = false;
			let canOpenMenu = false;
			
			let xButton = new Rect( menuRect.x + menuRect.width - 40,menuRect.y,40,40 );
			let overXButton = false;
			
			const myId = id;
			
			const mine = gfx.LoadImage( "Images/Outcroppings/Mine1.png" );
			
			let highlightingStart = false;
			let drawAreYouSure = false;
			let yesIsHighlighted = false;
			let noIsHighlighted = false;
			// 
			this.Update = function( kbd,ms )
			{
				isHovering = ( new Rect( this.pos.x,this.pos.y,this.size.x,this.size.y ) ).Contains( ms.GetPos() );
				overXButton = ( xButton.Contains( ms.GetPos() ) );
				highlightingStart = ( new Rect( menuRect.x + 7,menuRect.y + 202,
					menuRect.width - 14,46 ) ).Contains( ms.GetPos() );
				yesIsHighlighted = ( new Rect( menuRect.x + 10,menuRect.y + 205,
					( menuRect.width - 14 ) / 2,40 ) ).Contains( ms.GetPos() );
				noIsHighlighted = ( new Rect( menuRect.x + ( menuRect.width - 14 ) / 2 + 10,menuRect.y + 205,
					( menuRect.width - 14 ) / 2 - 5,40 ) ).Contains( ms.GetPos() );
				drawAreYouSure = highlightingStart;
				
				if( ms.IsDown() )
				{
					if( isHovering && canOpenMenu )
					{
						menuOpen = true;
						canCloseMenu = false;
					}
					
					if( canCloseMenu && ( !menuRect.Contains( ms.GetPos() ) || overXButton ) )
					{
						menuOpen = false;
					}
				}
				
				canCloseMenu = false;
				if( !ms.IsDown() && ( !isHovering || overXButton ) )
				{
					canCloseMenu = true;
				}
				
				canOpenMenu = false;
				if( isHovering && !ms.IsDown() )
				{
					canOpenMenu = true;
				}
			}
			
			this.Draw = function( gfx )
			{
				if( menuOpen )
				{
					gfx.DrawGrad( new Vec2( menuRect.x,menuRect.y ),
						new Vec2( menuRect.width,menuRect.height ),
						[ "#333","#444","#777" ] );
					
					let color = "#FFF";
					if( overXButton )
					{
						color = "#F00";
					}
					gfx.DrawCircle( new Vec2( xButton.x + xButton.width / 2,xButton.y + xButton.width / 2 ),
						xButton.width / 2.5,color );
					
					gfx.DrawText( new Vec2( menuRect.x + 5,menuRect.y + 30 ),
						"30PX Lucida Console","#FFF","Outcropping" + myId );
					
					// gfx.DrawRect( new Vec2( menuRect.x + 10,menuRect.y + 45 ),new Vec2( menuRect.width - 20,150 ),"#FFF" );
					gfx.DrawImage( mine,new Vec2( menuRect.x + 10,menuRect.y + 45 ) );
					
					if( highlightingStart )
					{
						// gfx.DrawRect( new Vec2( menuRect.x + 7,menuRect.y + 202 ),new Vec2( menuRect.width - 14,46 ),"#FFF" );
					}
					gfx.DrawRect( new Vec2( menuRect.x + 10,menuRect.y + 205 ),
						new Vec2( menuRect.width - 20,40 ),"#2EE" );
					gfx.DrawText( new Vec2( menuRect.x + 15,menuRect.y + 235 ),
						"30PX Lucida Console","#FFF","Mine some Ore" );
					
					gfx.DrawText( new Vec2( menuRect.x + 10,menuRect.y + 270 ),
						"15PX Lucida Console","#FFF","Ambush Chance: " );
					gfx.DrawText( new Vec2( menuRect.x + 10,menuRect.y + 290 ),
						"15PX Lucida Console","#FFF","Difficulty: " );
					gfx.DrawText( new Vec2( menuRect.x + 10,menuRect.y + 310 ),
						"15PX Lucida Console","#FFF","Potential Profit: " );
					
					if( drawAreYouSure )
					{
						if( yesIsHighlighted )
						{
							gfx.DrawRect( new Vec2( menuRect.x + ( menuRect.width - 14 ) / 2 + 10,
								menuRect.y + 205 ),new Vec2( ( menuRect.width - 14 ) / 2 - 5,40 ),"#E22" );
							gfx.DrawText( new Vec2( menuRect.x + ( menuRect.width - 14 ) / 2 + 20,
								menuRect.y + 230 ),"20PX Lucida Console","#FFF","Not Sure!" );
							
							gfx.DrawRect( new Vec2( menuRect.x + 7,menuRect.y + 202 ),
								new Vec2( ( menuRect.width - 14 ) / 2 + 6,46 ),"#FFF" );
							gfx.DrawRect( new Vec2( menuRect.x + 10,menuRect.y + 205 ),
								new Vec2( ( menuRect.width - 14 ) / 2,40 ),"#2E2" );
							gfx.DrawText( new Vec2( menuRect.x + 45,menuRect.y + 230 ),
								"20PX Lucida Console","#FFF","Sure?" );
						}
						else if( noIsHighlighted )
						{
							gfx.DrawRect( new Vec2( menuRect.x + 10,menuRect.y + 205 ),
								new Vec2( ( menuRect.width - 14 ) / 2,40 ),"#2E2" );
							gfx.DrawText( new Vec2( menuRect.x + 45,menuRect.y + 230 ),
								"20PX Lucida Console","#FFF","Sure?" );
							
							gfx.DrawRect( new Vec2( menuRect.x + ( menuRect.width - 14 ) / 2 + 7,
								menuRect.y + 202 ),new Vec2( ( menuRect.width - 14 ) / 2 - 5 + 6,46 ),"#FFF" );
							gfx.DrawRect( new Vec2( menuRect.x + ( menuRect.width - 14 ) / 2 + 10,
								menuRect.y + 205 ),new Vec2( ( menuRect.width - 14 ) / 2 - 5,40 ),"#E22" );
							gfx.DrawText( new Vec2( menuRect.x + ( menuRect.width - 14 ) / 2 + 20,
								menuRect.y + 230 ),"20PX Lucida Console","#FFF","Not Sure!" );
						}
						else
						{
							gfx.DrawRect( new Vec2( menuRect.x + 10,menuRect.y + 205 ),
								new Vec2( ( menuRect.width - 14 ) / 2,40 ),"#2E2" );
							gfx.DrawText( new Vec2( menuRect.x + 45,menuRect.y + 230 ),
								"20PX Lucida Console","#FFF","Sure?" );
							
							gfx.DrawRect( new Vec2( menuRect.x + ( menuRect.width - 14 ) / 2 + 10,
								menuRect.y + 205 ),new Vec2( ( menuRect.width - 14 ) / 2 - 5,40 ),"#E22" );
							gfx.DrawText( new Vec2( menuRect.x + ( menuRect.width - 14 ) / 2 + 20,
								menuRect.y + 230 ),"20PX Lucida Console","#FFF","Not Sure!" );
						}
					}
				}
			}
			
			this.IsHovering = function()
			{
				return isHovering;
			}
			
			this.IsOpen = function()
			{
				return menuOpen;
			}
		}
		// 
		GameObject.call( this );
		this.pos = pos;
		this.size = new Vec2( 50,50 );
		const myId = id;
		
		const m = new Menu( this.pos,this.size,myId );
		// 
		this.Update = function( kbd,ms )
		{
			m.Update( kbd,ms );
		}
		
		this.Draw = function( gfx )
		{
			if( m.IsHovering() )
			{
				const drawOffset = new Vec2( 3,3,true );
				gfx.DrawRect( this.pos.GetSubtracted( drawOffset ),
					this.size.GetAdded( drawOffset.GetMultiplied( 2 ) ),"#FFF" );
			}
			
			// gfx.DrawRect( this.pos,this.size,"#222" );
			gfx.DrawGrad( this.pos,this.size,[ "#000","#F00" ] );
			
			m.Draw( gfx );
		}
		
		this.Move = function( amount )
		{
			this.pos.Add( amount );
		}
		
		this.CloseMenu = function()
		{
			menuOpen = false;
		}
		
		this.GetPos = function()
		{
			return this.pos;
		}
		
		this.IsSelected = function()
		{
			return m.IsHovering();
		}
		
		this.HasMenuOpen = function()
		{
			return m.IsOpen();
		}
	}
	// 
	let outcroppings = [];
	let nRocks = 0;
	// 
	this.Update = function( ms,player )
	{
		// for( let i = 0; i < outcroppings.length; ++i )
		for( let i in outcroppings )
		{
			outcroppings[i].Update( ms,player );
		}
	}
	
	this.Draw = function( gfx )
	{
		// The whole highlighted fiasco is for the highlighting to not be covered by other outcroppings.
		//  Also menuOpen draws on top of any highlighted thing.
		let highlighted = { Draw: function( gfx ){ let f = 2; } };
		let menuOpen = { Draw: function( gfx ){ let g = 2; } };
		for( let i in outcroppings )
		{
			// if( !outcroppings[i].IsSelected() && !outcroppings[i].HasMenuOpen() )
			// {
			// 	outcroppings[i].Draw( gfx );
			// }
			// else
			// {
			// 	highlighted = outcroppings[i];
			// }
			if( outcroppings[i].IsSelected() )
			{
				highlighted = outcroppings[i];
			}
			else if( outcroppings[i].HasMenuOpen() )
			{
				menuOpen = outcroppings[i];
			}
			else
			{
				outcroppings[i].Draw( gfx );
			}
		}
		highlighted.Draw( gfx );
		menuOpen.Draw( gfx );
	}
	
	this.Add = function( pos )
	{
		outcroppings.push( new Outcropping( pos,nRocks++ ) );
	}
	
	this.MoveAll = function( amount )
	{
		for( let i in outcroppings )
		{
			outcroppings[i].Move( amount.GetMultiplied( outcroppings[i].size.x ) );
		}
	}
	
	this.CloseMenu = function()
	{
		for( let i in outcroppings )
		{
			outcroppings[i].CloseMenu();
		}
	}
}