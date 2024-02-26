all: up

init-client:
	docker compose run --rm client npm i

init-server:
	docker compose run --rm server npm i