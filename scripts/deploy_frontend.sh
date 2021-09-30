BUCKET_NAME=$1
DISTRIBUTION=$2

# CRA endpoint env-vars
# https://create-react-app.dev/docs/adding-custom-environment-variables/
# TRY THESE
# REACT_APP_API_ENDPOINT=CICD-load-balancer-511777230.ap-southeast-2.elb.amazonaws.com
# REACT_APP_LOGIN_MS_PORT=:80
# REACT_APP_BOOK_MS_PORT=:81

# THESE ENV VARS SHOULD ONLY BE AVAILABLE AFTER TESTS ARE DONE OTHERWISE BAD BAD
if [ "$CIRCLE_BRANCH" == "develop" ]
then
    REACT_APP_API_ENDPOINT=$DEVELOP_API_ENDPOINT
elif [ "$CIRCLE_BRANCH" == "main" ]
then
    REACT_APP_API_ENDPOINT=$MAIN_API_ENDPOINT
else
    echo "FATAL: THIS BRANCH IS NOT SUPPORTED"
    exit 1
fi

REACT_APP_LOGIN_MS_PORT=$LOGIN_MS_PORT
REACT_APP_BOOK_MS_PORT=$BOOK_MS_PORT

echo $REACT_APP_API_ENDPOINT
echo $REACT_APP_LOGIN_MS_PORT
echo $REACT_APP_BOOK_MS_PORT

export REACT_APP_API_ENDPOINT
export REACT_APP_LOGIN_MS_PORT
export REACT_APP_BOOK_MS_PORT


REACT_APP_CIRCLE_BRANCH=$CIRCLE_BRANCH
REACT_APP_CIRCLE_SHA1=$CIRCLE_SHA1

export REACT_APP_CIRCLE_BRANCH
export REACT_APP_CIRCLE_SHA1

cd FrontEnd/bookeroo
echo "-- Build --"
npm run build

echo "-- Deploy --"
aws s3 sync build s3://$BUCKET_NAME
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION --paths "/*" --no-cli-pager
