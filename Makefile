env=dev
COMPOSER_PARAMS=

ifeq (${env}, prod)
	COMPOSER_PARAMS = --no-dev --optimize-autoloader
endif

.PHONY: all build install composer yarn clear migrations encode assets routing init

all: build install

build: composer yarn encode clear

install: migrations assets

composer: composer.lock
	composer install ${COMPOSER_PARAMS}

clear: vendor
	bin/console cache:clear -e ${env}
	bin/console cache:warmup -e ${env}

yarn: yarn.lock
	yarn install
	touch node_modules

migrations: vendor
	bin/console doctrine:cache:clear-metadata -e ${env}
	bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration -e ${env}

assets: vendor
	bin/console assets:install public -e ${env}

encode: node_modules
	yarn encore ${env}
	touch vendor

routing: vendor
	bin/console fos:js-routing:dump --no-interaction --no-debug --format=json --target=public/js/fos_js_routes.json --env=${env}

init: assets routing migrations
