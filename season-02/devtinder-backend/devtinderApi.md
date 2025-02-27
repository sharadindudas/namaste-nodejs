## Routes for DevTinder (Backend)

### authRouter

POST /signup
POST /login
POST /logout

### profileRouter

GET /profile/view
PATCH /profile/edit
PATCH /profile/password

### requestRouter

POST /request/send/:status/:userId
POST /request/review/:status/:requestId

### userRouter

GET /user/requests/received
GET /user/connections
GET /user/feed // Gets you the profiles of other users on platform

Status: interested, ignored, accepted, rejected
