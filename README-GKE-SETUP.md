# GKE Autopilot + Azure DevOps CI/CD (Workload Identity Federation)

This document contains all required **gcloud commands** and Kubernetes manifests for deploying to **GKE Autopilot** using **Azure DevOps Workload Identity Federation (WIF)** — without service account keys.

Your organization enforces:

constraints/iam.disableServiceAccountKeyCreation

So JSON keys **cannot** be created.  
WIF is the secure, recommended alternative.

---

## 1. Create GCP Service Account (for Azure DevOps)

gcloud iam service-accounts create azure-devops-deployer \
 --display-name="Azure DevOps Deployer"

gcloud projects add-iam-policy-binding <PROJECT_ID> \
 --member="serviceAccount:azure-devops-deployer@<PROJECT_ID>.iam.gserviceaccount.com" \
 --role="roles/container.admin"

gcloud projects add-iam-policy-binding <PROJECT_ID> \
 --member="serviceAccount:azure-devops-deployer@<PROJECT_ID>.iam.gserviceaccount.com" \
 --role="roles/storage.admin"

---

## 2. Create Workload Identity Pool

gcloud iam workload-identity-pools create azure-devops-pool \
 --location="global" \
 --display-name="Azure DevOps Pool"

POOL_ID=$(gcloud iam workload-identity-pools describe azure-devops-pool \
 --location="global" \
 --format="value(name)")

---

## 3. Create Workload Identity Provider (OIDC)

Replace <ORG> with your Azure DevOps organization name.

gcloud iam workload-identity-pools providers create-oidc azure-devops-provider \
 --location="global" \
 --workload-identity-pool="azure-devops-pool" \
 --display-name="Azure DevOps Provider" \
 --issuer-uri="https://vstoken.dev.azure.com/<ORG>" \
 --allowed-audiences="api://AzureADTokenExchange" \
 --attribute-mapping="google.subject=assertion.sub"

---

## 4. Allow Azure DevOps to Impersonate the Service Account

gcloud iam service-accounts add-iam-policy-binding \
 azure-devops-deployer@<PROJECT_ID>.iam.gserviceaccount.com \
 --role="roles/iam.workloadIdentityUser" \
 --member="principalSet://iam.googleapis.com/${POOL_ID}/attribute.sub"

---

## 5. Azure DevOps Pipeline — Enable OIDC Token Issuance

Add this at the top of your pipeline YAML:

permissions:
id-token: write

---

## 6. Authenticate to GCP in Azure DevOps Pipeline (No JSON Keys)

gcloud auth login --cred-file=<( \
 gcloud iam workload-identity-pools create-cred-config \
 --workload-identity-pool="${POOL_ID}" \
    --provider="azure-devops-provider" \
    --service-account="azure-devops-deployer@$(GCP_PROJECT).iam.gserviceaccount.com" \
 --output-file=- \
)

gcloud container clusters get-credentials $(GKE_CLUSTER) \
 --zone $(GKE_ZONE) \
 --project $(GCP_PROJECT)

---

## 7. Reserve Static Global IP (for custom domain)

gcloud compute addresses create els-sso-ip --global

gcloud compute addresses describe els-sso-ip --global --format="get(address)"

---

## 8. ManagedCertificate (TLS for your domain)

apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
name: els-sso-cert
namespace: els-sso
spec:
domains: - app.yourdomain.com

Apply:

kubectl apply -f managed-certificate.yaml

---

## 9. GKE Ingress (HTTPS Load Balancer)

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
name: els-sso-ingress
namespace: els-sso
annotations:
kubernetes.io/ingress.class: "gce"
networking.gke.io/managed-certificates: "els-sso-cert"
kubernetes.io/ingress.global-static-ip-name: "els-sso-ip"
spec:
rules: - host: app.yourdomain.com
http:
paths: - path: /
pathType: Prefix
backend:
service:
name: els-sso-service
port:
number: 3000

Apply:

kubectl apply -f ingress.yaml

---

## 10. DNS A Record

Create an A record in your DNS provider:

Type: A  
Name: app  
Value: <STATIC_IP>

---

## 11. Helm Deployment

helm upgrade --install els-sso ./helm \
 --namespace els-sso \
 --create-namespace \
 --set image.repository=docker.io/<DOCKER_USER>/iels-sso-web-app \
 --set image.tag=<TAG>

---

## Summary Checklist

- Workload Identity Pool ✔
- Workload Identity Provider ✔
- Service Account ✔
- IAM Binding ✔
- Static IP ✔
- ManagedCertificate ✔
- Ingress ✔
- DNS A Record ✔
- Azure DevOps OIDC ✔
