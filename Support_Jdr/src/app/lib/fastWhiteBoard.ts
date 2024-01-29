declare var require: any;
const api = require('./api.js');

function fastWhiteBoard(idPlayer: number){
    const id = "e008c35c4bd5ed98ec5ccbfe943a8639"; // API KEY
    const boardCode = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

    let wt = new api.default.WhiteboardTeam('#wt-container', {
      clientId: id, // Replace with your client ID
      boardCode: boardCode, // Replace with your board code
      participant: {
        role: 'facilitator', // Set the role of the participant[^3^][3]
        name: Math.random().toString() + '_name' // Set the display name of the participant
      },
      board: {
        defaultTool: 'pen', // Set the default tool
        defaultThickness: 3, // Set the default thickness
        defaultColor: '#FFFFFF', // Set the default color
        bg: 'None' // Set the default background
      }
    });

    // Listen for the ready event
    wt.addListener("ready", (ctx: any) => {
      console.log("The whiteboard is ready and user is: ", ctx.uid);

      if(idPlayer == 0) // MJ
      {
        const urlHerbe = "http://localhost:4200/Player1/../../../assets/aerial_view.png";
        wt.drawImage(urlHerbe);
      }
    });


    // Listen for the error event
    wt.addListener("error", (error: any) => {
      console.log("An error occurred: ", error);
      // You can handle the error here
    });
}

export {fastWhiteBoard};