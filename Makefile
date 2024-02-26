all: up

init-client:
	docker compose run --rm client ls

init-server:
	docker compose run --rm server npm i