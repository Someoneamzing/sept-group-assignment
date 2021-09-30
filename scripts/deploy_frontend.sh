BUCKET_NAME=$1
DISTRIBUTION=$2

# CRA endpoint env-vars
# https://create-react-app.dev/docs/adding-custom-environment-variables/
# TRY THESE
# REACT_APP_API_ENDPOINT=CICD-load-balancer-511777230.ap-southeast-2.elb.amazonaws.com
# REACT_APP_LOGIN_MS_PORT=:80
# REACT_APP_BOOK_MS_PORT=:81
echo $REACT_APP_API_ENDPOINT
echo $REACT_APP_LOGIN_MS_PORT
echo $REACT_APP_BOOK_MS_PORT
REACT_APP_CIRCLE_BRANCH=$3
REACT_APP_CIRCLE_SHA1=$4

cd FrontEnd/bookeroo
echo "-- Build --"
npm run build

echo "-- Deploy --"
aws s3 sync build s3://$BUCKET_NAME
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION --paths "/*" --no-cli-pager
