> npm install ts-node-dev typescript express @types/express
> npm i @types/node
> tsc --init 
> npm install cors socket.io @types/socket.io


#### note: 
Websocket is a full-duplex communication channel. Socket.io is built on top of that. It adds additional metadata to each packet.
This is why we cannot use Websocket client with socket.io backend or vice versa.

Chatbox webapplication using React for frontend and Node for backend in Typescript. It uses NextJS for server side rendering and socket.io for communication.

