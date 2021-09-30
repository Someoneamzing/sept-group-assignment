BUCKET_NAME=$1
DISTRIBUTION=$2

cd ~/project/FrontEnd/bookeroo
echo "-- Build --"
npm run build

echo "-- Deploy --"
aws s3 sync build s3://$BUCKET_NAME
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION --paths "/*" --no-cli-pager
