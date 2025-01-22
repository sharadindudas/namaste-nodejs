## Routes for DevTinder (Backend)

### authRouter

POST /signup
POST /login
POST /logout

### userRouter

GET /user/feed
GET /user/connections
GET /user/requests/received

### profileRouter

GET /profile/view
PATCH /profile/edit
PATCH /profile/password

### connectionRequestRouter

POST /request/send/:status/:userId
POST /request/review/:status/:requestId

Status: interested, ignored, accepted, rejected
