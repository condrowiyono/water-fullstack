# Start from golang base image
FROM golang:1.18-alpine as builder

# Install git.
RUN apk update && apk add --no-cache git

# Working directory
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies
RUN go mod download

# Copy everythings
COPY . .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -mod=readonly -v -o main .

# Start a new stage from scratch
FROM alpine:latest
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the Pre-built binary file from the previous stage. Also copy config yml file
COPY --from=builder /app/main .
COPY --from=builder /app/.env .env

# Download tzdata
ADD https://github.com/golang/go/raw/master/lib/time/zoneinfo.zip /zoneinfo.zip
RUN chmod +r /zoneinfo.zip
ENV ZONEINFO /zoneinfo.zip

# Expose port 8080 to the outside world
EXPOSE 8000

#Command to run the executable
CMD ["./main"]