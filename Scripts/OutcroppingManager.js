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
			let canStartMining = false;
			
			let dead = false;
			
			let xButton = new Rect( menuRect.x + menuRect.width - 40,menuRect.y,40,40 );
			let overXButton = false;
			const xButtonOut = gfx.LoadImage( "Images/MenuItems/XButton0.png" );
			const xButtonOver = gfx.LoadImage( "Images/MenuItems/XButton1.png" );
			
			const myId = id;
			
			const mine = gfx.LoadImage( "Images/Outcroppings/Mine1.png" );
			
			let highlightingStart = false;
			let drawAreYouSure = false;
			let yesIsHighlighted = false;
			let noIsHighlighted = false;
			
			let overMenu = false;
			// 
			this.Update=( kbd,ms,selectRect,miningActivity )=>
			{
				isHovering = ( ( new Rect( this.pos.x,this.pos.y,
					this.size.x,this.size.y ) ).Contains( ms.GetPos() ) ||
					( new Rect( this.pos.x,this.pos.y,
					this.size.x,this.size.y ) ).Overlaps( selectRect ) );
				overXButton = ( xButton.Contains( ms.GetPos() ) );
				highlightingStart = ( new Rect( menuRect.x + 7,menuRect.y + 202,
					menuRect.width - 14,46 ) ).Contains( ms.GetPos() );
				yesIsHighlighted = ( new Rect( menuRect.x + 10,menuRect.y + 205,
					( menuRect.width - 14 ) / 2,40 ) ).Contains( ms.GetPos() );
				noIsHighlighted = ( new Rect( menuRect.x + ( menuRect.width - 14 ) / 2 + 10,menuRect.y + 205,
					( menuRect.width - 14 ) / 2 - 5,40 ) ).Contains( ms.GetPos() );
				drawAreYouSure = highlightingStart;
				overMenu = menuRect.Contains( ms.GetPos() );
				
				if( ( ms.IsDown()/* || kbd.KeyDown( 'E' )*/ ) &&
					isHovering && canOpenMenu )
				{
					menuOpen = true;
					canCloseMenu = false;
				}
				
				if( ms.IsDown() )
				{
					if( ( !menuRect.Contains( ms.GetPos() ) || overXButton ) &&
						canCloseMenu )
					{
						menuOpen = false;
					}
					
					if( highlightingStart && canStartMining )
					{
						if( yesIsHighlighted )
						{
							if( Random.Chance( 100 ) )
							{
								miningActivity.Open();
								dead = true;
							}
						}
						else if( noIsHighlighted )
						{
							// menuOpen = false;
						}
					}
				}
				
				// TODO: Consolidate all of this if possible.
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
				
				canStartMining = false;
				if( !ms.IsDown() && highlightingStart && menuOpen )
				{
					canStartMining = true;
				}
			}
			
			this.Draw=( gfx )=>
			{
				if( menuOpen )
				{
					if( overMenu )
					{
						gfx.DrawRect( new Vec2( menuRect.x - 5,menuRect.y - 5 ),
							new Vec2( menuRect.width + 10,menuRect.height + 10 ),
							"#FFF" );
					}
					gfx.DrawGrad( new Vec2( menuRect.x,menuRect.y ),
						new Vec2( menuRect.width,menuRect.height ),
						[ "#333","#444","#777" ] );
					
					// let color = "#FFF";
					// if( overXButton )
					// {
					// 	color = "#F00";
					// }
					// gfx.DrawCircle( new Vec2( xButton.x + xButton.width / 2,xButton.y + xButton.width / 2 ),
					// 	xButton.width / 2.5,color );
					let drawButton;
					if( overXButton )
					{
						drawButton = xButtonOver;
					}
					else
					{
						drawButton = xButtonOut;
					}
					gfx.DrawImage( drawButton,new Vec2( xButton.x,xButton.y ) );
					
					gfx.DrawText( new Vec2( menuRect.x + 5,menuRect.y + 30 ),
						"30PX Lucida Console","#FFF","Outcropping" + myId );
					
					// gfx.DrawRect( new Vec2( menuRect.x + 10,menuRect.y + 45 ),new Vec2( menuRect.width - 20,150 ),"#FFF" );
					gfx.DrawImage( mine,new Vec2( menuRect.x + 10,menuRect.y + 45 ),
						new Vec2( 251,150 ) );
					
					if( highlightingStart )
					{
						// gfx.DrawRect( new Vec2( menuRect.x + 7,menuRect.y + 202 ),new Vec2( menuRect.width - 14,46 ),"#FFF" );
					}
					gfx.DrawRect( new Vec2( menuRect.x + 10,menuRect.y + 205 ),
						new Vec2( menuRect.width - 20,40 ),"#2EE" );
					gfx.DrawText( new Vec2( menuRect.x + 15,menuRect.y + 235 ),
						"30PX Lucida Console","#FFF","Mine some Ore" );
					
					gfx.DrawText( new Vec2( menuRect.x + 10,menuRect.y + 270 ),
						"15PX Lucida Console","#FFF","Ambush Chance: 0%" );
					gfx.DrawText( new Vec2( menuRect.x + 10,menuRect.y + 290 ),
						"15PX Lucida Console","#FFF","Difficulty: Easy" );
					gfx.DrawText( new Vec2( menuRect.x + 10,menuRect.y + 310 ),
						"15PX Lucida Console","#FFF","Potential Profit: 6 Ore" );
					
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
			
			this.Close=()=>
			{
				menuOpen = false;
			}
			
			this.IsHovering=()=>
			{
				return isHovering;
			}
			
			this.IsOpen=()=>
			{
				return menuOpen;
			}
			
			this.WillKill=()=>
			{
				return dead;
			}
		}
		// 
		GameObject.call( this );
		this.pos = pos;
		this.size = new Vec2( 50,50 );
		const myId = id;
		Outcropping.prototype.mineImage = gfx
			.LoadImage( "Images/Outcroppings/Mine0.png" );
		
		const m = new Menu( this.pos,this.size,myId );
		
		let willDestroy = false;
		// 
		this.Update=( kbd,ms,selectRect,activity,noMenusOpen )=>
		{
			if( noMenusOpen )
			{
				m.Update( kbd,ms,selectRect,activity );
			}
			
			if( m.WillKill() )
			{
				willDestroy = true;
			}
		}
		
		this.Draw=( gfx )=>
		{
			if( m.IsHovering() )
			{
				const drawOffset = new Vec2( 3,3,true );
				gfx.DrawRect( this.pos.GetSubtracted( drawOffset ),
					this.size.GetAdded( drawOffset.GetMultiplied( 2 ) ),"#FFF" );
			}
			
			// gfx.DrawRect( this.pos,this.size,"#222" );
			// gfx.DrawGrad( this.pos,this.size,[ "#000","#F00" ] );
			gfx.DrawImage( Outcropping.prototype.mineImage,this.pos,this.size );
			
			m.Draw( gfx );
		}
		
		this.Move=( amount )=>
		{
			this.pos.Add( amount );
		}
		
		this.CloseMenu=()=>
		{
			// menuOpen = false;
			m.Close();
		}
		
		this.GetPos=()=>
		{
			return this.pos;
		}
		
		this.IsSelected=()=>
		{
			return m.IsHovering();
		}
		
		this.HasMenuOpen=()=>
		{
			return m.IsOpen();
		}
		
		this.WillDest=()=>
		{
			return willDestroy;
		}
		
		this.GetRect=()=>
		{
			return( new Rect( this.pos.x,this.pos.y,this.size.x,this.size.y ) );
		}
	}
	// 
	let outcroppings = [];
	let nRocks = 0;
	// 
	this.Update=( kbd,ms,selectRect,activity,noMenusOpen )=>
	{
		// for( let i = 0; i < outcroppings.length; ++i )
		for( let i in outcroppings )
		{
			outcroppings[i].Update( kbd,ms,selectRect,activity,noMenusOpen );
			
			if( outcroppings[i].WillDest() )
			{
				outcroppings.splice( i,1 );
			}
		}
	}
	
	this.Draw=( gfx )=>
	{
		// The whole highlighted fiasco is for the highlighting to not be covered by other outcroppings.
		//  Also menuOpen draws on top of any highlighted thing.
		let highlighted = { Draw: function( gfx ){ let f = 2; } };
		let menuOpen = { Draw: function( gfx ){ let g = 2; } };
		for( let i in outcroppings )
		{
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
	
	this.Add=( pos )=>
	{
		outcroppings.push( new Outcropping( pos,nRocks++ ) );
	}
	
	this.MoveAll=( amount )=>
	{
		for( let i in outcroppings )
		{
			outcroppings[i].Move( amount.GetMultiplied( outcroppings[i].size.x ) );
		}
	}
	
	this.CloseMenu=()=>
	{
		for( let i in outcroppings )
		{
			outcroppings[i].CloseMenu();
		}
	}
	
	this.HasSelectedRock=()=>
	{
		for( let i in outcroppings )
		{
			if( outcroppings[i].HasMenuOpen() )
			{
				return true;
			}
		}
		
		return false;
	}
	
	this.IsBlocked=( blockPos )=>
	{
		for( let i in outcroppings )
		{
			if( outcroppings[i].GetPos().Equals( blockPos ) )
			{
				return true;
			}
		}
		return false;
	}
}