import WhiteboardAPI from "./WhiteboardAPI";

declare var require: any;
const api = require('./api.js');


/**
 * Note : 3 roles existent : facilitator, editor, viewer
 * facilitator : you can do everything
 * editor : you can edit
 * viewer : you can only view
 */


function fastWhiteBoard(type: string) {

  let role: string;

  const id = "e008c35c4bd5ed98ec5ccbfe943a8639"; // The client id
  const boardCode = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

  let haveAlreadyFacilitator: boolean = false; // Declare the variable 'haveAlreadyFacilitator'

  if (type == "PJ") {
    role = "editor";
  }


  else if (type == "MJ") // MJ
  {
    role = "facilitator";

    // check if already a facilitator

    let boardMembers: any[];


    WhiteboardAPI.getBoard(boardCode).then((board: any) => {
      console.log("board: ", board);
      boardMembers = board.members;
      console.log("boardMembers: ", boardMembers);

      /*

      // Check if there is already a facilitator on the board
      boardMembers.forEach((member: any) => {
        if (member.role == "facilitator") {
          console.log("Facilitator already exists, change to PJ");

          // CHANGE HERE THE ROLE OF THE FACILITATOR if you want to allow/unallow multiple facilitators
          // role = "editor";
          haveAlreadyFacilitator = true;
          return; // Exit the forEach loop
        }
      });
      */

      if (boardMembers.length > 0) {
        haveAlreadyFacilitator = true;
      }


    }
    ).catch((error: any) => {
      console.error(error);
    });

  }

  else {
    role = "viewer";
  }

  let wt = new api.default.WhiteboardTeam('#wt-container', {
    clientId: id, // Replace with your client ID
    boardCode: boardCode, // Replace with your board code

    participant: {
      role: role, // Set the role of the participant
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

    if (type == "MJ" && !haveAlreadyFacilitator) // MJ
    {
      const urlHerbe = "http://localhost:4200/Player1/../../../assets/aerial_view.png";
      wt.drawImage(urlHerbe);
    }
    if (role = "viewer") {
      wt.fullscreen();
    }
  });


  // Listen for the error event
  wt.addListener("error", (error: any) => {
    console.log("An error occurred: ", error);
    // You can handle the error here
  });

  return wt;


}

  export { fastWhiteBoard };