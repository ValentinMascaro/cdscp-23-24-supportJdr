// UNUSED FILE
import axios, { AxiosInstance, AxiosResponse } from 'axios'; // Make sure to install axios

// Define the API secret key
const API_KEY: string = "fcdc59d7e08086e6e95f61af52029ed1";

// Define the base URL of the API
const BASE_URL: string = 'https://www.whiteboard.team/api/v2';

// Create an axios instance with common settings
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Api-Key': API_KEY
  }
});

// Create a function to get the list of boards
const getBoards = async (take?: number, skip?: number): Promise<any> => {
  try {
    // Build the request parameters
    const params: any = {};
    if (take) params.take = take;
    if (skip) params.skip = skip;

    // Send the GET request to the /boards endpoint
    const response: AxiosResponse = await api.get('/boards', { params });

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    throw error;
  }
};

// Create a function to get a board by its ID
const getBoard = async (boardId: string): Promise<any> => {
  try {
    // Send the GET request to the /boards/:boardId endpoint
    const response: AxiosResponse = await api.get(`/boards/${boardId}`);

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    throw error;
  }
};

// Create a function to get the comments of a board
const getBoardComments = async (boardId: string): Promise<any> => {
  try {
    // Send the GET request to the /boards/:boardId/comments endpoint
    const response: AxiosResponse = await api.get(`/boards/${boardId}/comments`);

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    throw error;
  }
};

// Create a function to duplicate a board
const duplicateBoard = async (boardId: string, newId?: string, name?: string, memberId?: string): Promise<any> => {
  try {
    // Build the request body
    const data: any = {};
    if (newId) data.newId = newId;
    if (name) data.name = name;
    if (memberId) data.memberId = memberId;

    // Send the POST request to the /boards/:boardId/duplicate endpoint
    const response: AxiosResponse = await api.post(`/boards/${boardId}/duplicate`, data);

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    throw error;
  }
};

// Create a function to upload an image to a board
const uploadImage = async (boardId: string, memberId?: string, file?: File): Promise<any> => {
  try {
    // Build the request body as FormData
    const data: FormData = new FormData();
    if (memberId) data.append('MemberId', memberId);
    if (file) data.append('file', file);

    // Send the POST request to the /boards/:boardId/upload endpoint
    const response: AxiosResponse = await api.post(`/boards/${boardId}/upload`, data);

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    throw error;
  }
};

// Create a function to create a new board
/**
 * 
 * @param newId 
 * @param name 
 * @param members 
 * @returns the id of the board.
 */
const createBoard = async (newId?: string, name?: string, members?: string[]): Promise<any> => {
  try {
    const data: any = {};
    data.newId = newId ?? null;
    data.name = name ?? "Whiteboard_" + new Date().toISOString();
    data.members = members ?? [];

    // Send the POST request to the /boards endpoint
    const response: AxiosResponse = await api.post('/boards', data);
    console.log(response.data);

    data.id = response.data.id;
    return data;

  } catch (error) {
    // Handle any potential errors
    console.error(error);
    throw error;
  }
};

// Create a function to delete a board
const deleteBoard = async (boardId: string): Promise<any> => {
  try {
    // Send the DELETE request to the /boards/:boardId endpoint
    const response: AxiosResponse = await api.delete(`/boards/${boardId}`);

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    throw error;
  }
};

// Test the functions
getBoards().then(boards => {
  console.log(boards);
}).catch(error => {
  console.error(error);
}
);


// export all the functions
export default {
  BASE_URL,
  getBoards,
  getBoard,
  getBoardComments,
  duplicateBoard,
  uploadImage,
  createBoard,
  deleteBoard
};