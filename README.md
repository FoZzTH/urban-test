# Urban test task

## Setup

To run the project needs:

1. Setup environment variables and put them to `.env` file. Example of required varibels can be found at `.env.example` file.
2. Run application through the docker by docker-compose:

```
docker-compose up --build
```

## Usage

To get answer from the server need to send GET request on `/address` endpoint. Also request query should contain follower params:<br/>

- `address` - address for search in districts
