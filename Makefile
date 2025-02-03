SHELL := /bin/bash
.PHONY: all clean test install install_dev run docker-build docker-login docker-push requirements

# Let's tag the built image with the Git tag.. only if there is one
docker_build_tags=
ifneq ($(CI_COMMIT_TAG),)
        docker_build_tags=--tag "$(CI_REGISTRY_IMAGE):$(CI_COMMIT_TAG)"
endif
ifneq ($(DOCKER_TAG),)
	docker_build_tags := $(docker_build_tags) --tag "$(CI_REGISTRY_IMAGE):$(DOCKER_TAG)"
endif

DOCKER_BUILD=DOCKER_BUILDKIT=1 docker build --build-arg BUILDKIT_INLINE_CACHE=1 --build-arg NEXT_PUBLIC_DIRECTUS_URL=$(DIRECTUS_URL) --build-arg SENTRY_URL --build-arg SENTRY_ORG --build-arg SENTRY_PROJECT --build-arg SENTRY_AUTH_TOKEN --build-arg NEXT_APP_FLAVOR --build-arg NEXT_APP_SIDER_LOGO --build-arg NEXT_APP_LOGO

docker_tag=latest

help:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

docker-login:
	docker login -u "$(CI_REGISTRY_USER)" -p "$(CI_REGISTRY_PASSWORD)" $(CI_REGISTRY)

docker-pull:
	docker pull "$(CI_REGISTRY_IMAGE):bdeps-$(docker_tag)" || true
	docker pull "$(CI_REGISTRY_IMAGE):$(docker_tag)" || true

docker-build: docker-login docker-pull
	# Explicitly build docker layers so that they can be pushed and cached
	# in order to speed up subsequent builds
	echo "Building flavor $(NEXT_APP_FLAVOR)"
	$(DOCKER_BUILD) --cache-from "$(CI_REGISTRY_IMAGE):bdeps-$(docker_tag)" --target bdeps --tag "$(CI_REGISTRY_IMAGE):bdeps-$(docker_tag)" -f Dockerfile ./
	$(DOCKER_BUILD) --cache-from "$(CI_REGISTRY_IMAGE):bdeps-$(docker_tag)" --cache-from "$(CI_REGISTRY_IMAGE):$(docker_tag)" $(docker_build_tags) --tag "$(CI_REGISTRY_IMAGE):$(CI_COMMIT_SHORT_SHA)" --tag "$(CI_REGISTRY_IMAGE):$(docker_tag)" -f Dockerfile .

docker-logout:
	docker logout $(CI_REGISTRY)

docker-push: docker-build
	docker push "$(CI_REGISTRY_IMAGE):bdeps-$(docker_tag)"
ifneq ($(CI_COMMIT_TAG),)
	docker push "$(CI_REGISTRY_IMAGE):$(CI_COMMIT_TAG)"
endif
ifneq ($(DOCKER_TAG),)
	docker push "$(CI_REGISTRY_IMAGE):$(DOCKER_TAG)"
endif
	docker push "$(CI_REGISTRY_IMAGE):$(docker_tag)"

build:
	pnpm build

	# delete sourcemaps since they have been uploaded to sentry
	find .next -type f -name '*.js.map' -delete
	find .next -type f -name '*.css.map' -delete

	# delete sourcemaps refs
	find .next -type f -name '*.js' -exec sed -i -E 's/sourceMappingURL=[^ ]*\.js\.map//g' {} +
	find .next -type f -name '*.css' -exec sed -i -E 's/sourceMappingURL=[^ ]*\.css\.map//g' {} +

codestyle:
	pnpm lint
.PHONY: codestyle


tsc:
	pnpm tsc --noEmit

start:
	pnpm start

install:
	pnpm install
