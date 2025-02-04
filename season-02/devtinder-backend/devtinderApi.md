## Routes for DevTinder (Backend)

### authRouter

POST /signup
POST /login
POST /logout

### userRouter

GET /user/requests/received
GET /user/feed
GET /user/connections

### profileRouter

GET /profile/view
PATCH /profile/edit
PATCH /profile/password

### requestRouter

POST /request/send/:status/:userId
POST /request/review/:status/:requestId

Status: interested, ignored, accepted, rejected
