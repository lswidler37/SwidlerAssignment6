//name: Lucas Swidler
//description: Assignment 6
//proposed points: 15 points out of 15
// 
// key bindings are set so that pressing 'W' will make the eye position move in z direction
//                                       'S' will make the eye position move in -z direction
//                                       'A' will move to the left
//                                       'D' will move to the right
//                                       'Q' will rotate the eye to the left
//                                       'E' will rotate the eye to the right
//   The keys allow for the user to move within the environment
//    it's a bit of a hack, but works well enough for simple navigation here



"use strict";

var render, canvas, gl;

var pointsArray = [];
var textureArray= [];
var program;

var zPos = 10.0;  //position of Eye
var theta  = 0.0; //rotation for eye position
var eye;
var xPos = 0.0; //used for eye

var modelViewMatrix;
var modelViewMatrixLoc;

var projectionMatrix;
var projectionMatrixLoc;

var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

var texCoordsArray = [];

var selection = 0;

function loadPoints(points,texture) {
    //load the vertex positions and texture positions here


    //The floor
    points.push(vec4(-6.0, 0 , 10, 1));
    texture.push(vec2(0, 1));
    points.push(vec4(-6.0 , 0 , 0, 1));
    texture.push(vec2(0, .5));
    points.push(vec4(6.0 , 0 , 0, 1));
    texture.push(vec2(.5, .5));

    points.push(vec4(-6.0, 0 , 10, 1));
    texture.push(vec2(0, 1));
    points.push(vec4(6.0 , 0 , 0, 1));
    texture.push(vec2(.5, .5));
    points.push(vec4(6.0 , 0 , 10, 1));
    texture.push(vec2(.5, 1));

    //The ceiling
      points.push(vec4(-6.0, 5 , 10, 1));
      texture.push(vec2(0, 1));
      points.push(vec4(-6.0 , 5 , 0, 1));
      texture.push(vec2(0, .5));
      points.push(vec4(6.0 , 5 , 0, 1));
      texture.push(vec2(.5, .5));
    
      points.push(vec4(-6.0, 5 , 10, 1));
      texture.push(vec2(0, 1));
      points.push(vec4(6.0 , 5 , 0, 1));
      texture.push(vec2(.5, .5));
      points.push(vec4(6.0 , 5 , 10, 1));
      texture.push(vec2(.5, 1));

  //The Wall
    //First Wall
      points.push(vec4(-6.0, 0 , 0, 1));    //bottom left corner
      texture.push(vec2(0, 0));
      points.push(vec4(-6.0 , 5.0 , 0, 1)); //top left corner
      texture.push(vec2(0, .5));
      points.push(vec4(6.0 , 0 , 0, 1));    //bottom right corner
      texture.push(vec2(.5, 0));
      points.push(vec4(-6.0, 5, 0, 1));     //top left corner
      texture.push(vec2(0, 0.5));
      points.push(vec4(6.0, 5.0, 0, 1));    //top right corner
      texture.push(vec2(0.5, 0.5));
      points.push(vec4(6.0, 0, 0, 1));      //bottom right corner
      texture.push(vec2(0.5, 0));
    //Second Wall
      points.push(vec4(-6.0, 0, 0, 1));     //bottom right corner
      texture.push(vec2(0.5, 0));
      points.push(vec4(-6.0, 5.0, 0, 1));   //top right corner
      texture.push(vec2(0.5, 0.5));
      points.push(vec4(-6.0, 0, 10, 1));    //bottom left corner
      texture.push(vec2(0,0));  
      points.push(vec4(-6.0, 0, 10, 1));    //bottom left corner
      texture.push(vec2(0,0));
      points.push(vec4(-6.0, 5.0, 10, 1));  //top left corner
      texture.push(vec2(0, 0.5));        
      points.push(vec4(-6.0, 5.0, 0, 1));   //top right corner
      texture.push(vec2(0.5, 0.5));
    //Third Wall
      points.push(vec4(-6.0, 0, 10, 1));    //bottom right corner
      texture.push(vec2(0.5 ,0));
      points.push(vec4(-6, 5, 10, 1));      //top right corner
      texture.push(vec2(0.5, 0.5));
      points.push(vec4(6, 0, 10, 1));       //bottom left corner
      texture.push(vec2(0, 0));
      points.push(vec4(6, 0, 10, 1));       //bottom left corner
      texture.push(vec2(0,0));
      points.push(vec4(6, 5, 10, 1));       //top left corner
      texture.push(vec2(0, 0.5));
      points.push(vec4(-6, 5, 10, 1));      //top right corner
      texture.push(vec2(0.5,0.5));
    //Fourth Wall
      points.push(vec4(6, 0, 10, 1));       //bottom right corner
      texture.push(vec2(0.5, 0));
      points.push(vec4(6, 5, 10, 1));       //top right corner
      texture.push(vec2(0.5, 0.5));
      points.push(vec4(6, 0, 0, 1));        //bottom left corner
      texture.push(vec2(0, 0));
      points.push(vec4(6, 0, 0, 1));        //bottom left corner
      texture.push(vec2(0, 0));
      points.push(vec4(6, 5, 0, 1));        //top left corner
      texture.push(vec2(0, 0.5));
      points.push(vec4(6, 5, 10, 1));       //top right corner
      texture.push(vec2(0.5, 0.5)); 
    //Mona Lisa
      points.push(vec4(1.25, 1.5, 0.1, 1));     //bottom right corner
      texture.push(vec2(1, 0.5));
      points.push(vec4(-1.25, 1.5, 0.1, 1));    //bottom left corner
      texture.push(vec2(0.5, 0.5));
      points.push(vec4(-1.25, 4, 0.1, 1));      //top left corner
      texture.push(vec2(0.5, 1));
      points.push(vec4(1.25, 1.5, 0.1, 1));    //bottom right corner
      texture.push(vec2(1, 0.5));
      points.push(vec4(-1.25, 4, 0.1, 1));     //top left corner
      texture.push(vec2(0.5, 1));
      points.push(vec4(1.25, 4, 0.1, 1));      //top right corner
      texture.push(vec2(1.0, 1.0));
    //Starry Night
      points.push(vec4(1.25, 1.5, 9.9, 1));     //bottom right corner
      texture.push(vec2(1, 0));
      points.push(vec4(-1.25, 1.5, 9.9, 1));    //bottom left corner
      texture.push(vec2(0.5, 0));
      points.push(vec4(-1.25, 4, 9.9, 1));      //top left corner
      texture.push(vec2(0.5, 0.5));
      points.push(vec4(1.25, 1.5, 9.9, 1));    //bottom right corner
      texture.push(vec2(1, 0));
      points.push(vec4(-1.25, 4, 9.9, 1));     //top left corner
      texture.push(vec2(0.5, 0.5));
      points.push(vec4(1.25, 4, 9.9, 1));      //top right corner
      texture.push(vec2(1.0, 0.5));
}

function configureTexture(image, option) {
    var texture = gl.createTexture();
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 
      gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap( gl.TEXTURE_2D );
    
    if (option == 0) {
      //Point Sampling
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    } else {
      //Mip Mapping
        gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
        gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }
}

onload = function init()  {

    canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( .9, .9, .9, 1.0 );
    gl.enable(gl.DEPTH_TEST);
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    loadPoints(pointsArray, textureArray);

    //establish buffers to send to shaders
    var vBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(textureArray), gl.STATIC_DRAW );

    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    //establish texture
    var image = document.getElementById("texImage");
    configureTexture(image, selection);

    gl.uniform1i( gl.getUniformLocation(program, "uTextureMap"), 0);

   // Initialize event handler (key codes)
    window.onkeydown = function( event ) {
        var key = String.fromCharCode(event.keyCode);
        switch( key ) {
          case 'W': //forward
            if (zPos <= 1.2) {
              zPos = 1.2;
            } else {
              zPos -= .4
            }
            break;
          case 'S': //back 
            if (zPos >= 10) {
              zPos = 10;
            } else {
              zPos += .4
            }
           break;
          case 'A': //left
            if (xPos <= -5.6) {
              xPos = -5.6;
            } else {
              xPos -= 0.4;
            }
            break;
          case 'D':  //right
            if (xPos >= 5.6) {
              xPos = 5.6;
            } else {
              xPos += 0.4;
            }
            break;
          case 'Q': //NEW pan to left
            theta -= 0.04;
            break;
          case 'E': //NEW pan to right
            theta += 0.04;
            break;
        }
    };

    // Initialize event handler (menu)
    document.getElementById("Controls").onclick = function(event) {
      console.log(event.target.index);
      if (event.target.index == 0) {
            selection = 0;
            configureTexture(image, selection); //point sampling
        } else {
            selection = 1;
            configureTexture(image, selection); //mip mapping
        }
    }
    render();
}

render = function(){
    gl.clear( gl.COLOR_BUFFER_BIT);

    eye = vec3(xPos, 2, zPos); //raised the y value of the eye because it was bothering me how low the camera was
    at = vec3(zPos*Math.sin(theta), 2, 10 - 10*Math.cos(theta));
    //establish modelView and Projection matrices
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = perspective(45, 1, 1.0, 100);
 
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    //draw triangles
    gl.drawArrays( gl.TRIANGLES, 0, pointsArray.length);
 
    requestAnimationFrame(render);
}
