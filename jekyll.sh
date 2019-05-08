# run jekyll docker on my local
export JEKYLL_VERSION=latest
docker run --rm \
  -p 4000:4000 \
  --volume="$PWD:/srv/jekyll" \
  -it jekyll/jekyll:$JEKYLL_VERSION \
  jekyll serve