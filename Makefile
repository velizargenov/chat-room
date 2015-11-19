BIN = ./node_modules/.bin

.PHONY: start nodemon webpackdev;

start:
	@make -j2 nodemon webpackdev

nodemon:
	@$(BIN)/nodemon app/app

webpackdev:
	@$(BIN)/webpack-dev-server --content-base http://localhost:8000
