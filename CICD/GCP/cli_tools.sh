

GCP_INIT() 
{
  echo "[GCP_INIT]"
  ${GCLOUD} --version 
  
  ${GCLOUD} iam service-accounts list 
  ${GCLOUD} auth list
  
  ${GCLOUD} projects list
}




#
GCLOUD=gcloud
GCP_INIT



# REFERENCES :
#
# https://medium.com/@jmake/platform-as-a-service-paas-is-a-cloud-computing-model-where-a-third-party-provider-delivers-52aacda65a90
#
# https://github.com/jmake/ipynbs/blob/main/googleAppEngine.ipynb
#
# https://cloud.google.com/blog/topics/developers-practitioners/deploying-serverless-platforms-github-actions
#
