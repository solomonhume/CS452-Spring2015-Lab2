// Jiaju Huang 0530537
// jiajhua@clarkson.edu
var gl;
var speed = 0.2;
initial_pos = [
        vec2( 0,  0.5),
        vec2( 0.5,  0),
        vec2(-0.5,  0),
        vec2( 0, -0.5)];

function move(direction) {
    
    var i;
    if (direction == 'restore')
    {vertices =  initial_pos;}
    	else {
    for (i = 0; i < vertices.length; i++) {
    	if (direction == 'right')
    	{vertices[i][1] = vertices[i][1]+speed;
    		}
    	if (direction == 'left')
    		vertices[i][1] = vertices[i][1]-speed;
    	if (direction == 'down')
    		vertices[i][0] = vertices[i][0]-speed;
    	if (direction == 'up')
    		vertices[i][0] = vertices[i][0]+speed;
    		
    }}
    	
}


function doKeyDown(e) {

    switch (e.which) {
     case 97:
        move('left'); // shift and left arrow key
        break;
     case 100:
        move('right'); //up arrow key
        break;
     case 119:
     {	
     	move('up');
     	break;}
     case 115:
     	{
     	move('down');
     	break;}
     case 49:
     	move('restore');
    }
    //alert(vertices[1]);
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    //alert(vertices[1]);

    // Load the data into the GPU    
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(vPosition);
    
    
    // Initialize event handlers

    render();

}

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    window.addEventListener( "keypress", doKeyDown, false )
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	document.getElementById("slider").onchange = function() {
        speed = ( event.srcElement.value)*0.002;
    };
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    vertices = initial_pos;

    // Load the data into the GPU    
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(vPosition);
    
    
    // Initialize event handlers

    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    setTimeout(
        function () {requestAnimFrame( render );},
        speed
    );
}
