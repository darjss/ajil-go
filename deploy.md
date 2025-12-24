
Лаб 5

Лекцэн дээр үзсэн ёсоор бүгдээрээ өөрсдийнхөө хийсэн mono repo-гоо github дээр байршуулна. Түүнийгээ шалгах бүх төрлөөр шалгаад action оруулна. Үүний дараа амжилттай болсон docker image-ээ aws ecr дээр уншигдаж server-лүү хуулахад бэлэн болсон гэдгийг харуулна. Үүний тул ECR үүсгээд тохируулж бэлдэнэ. Нөгөө education-ээр үүсгэсэн AWS эрхээ ашиглахгүй бол жаахан төлбөр гарчихаж магад шүү!!! Push хийхэд автоматаар шалгагдаж action health check report гаргана.

Улмаар дараагийн долоо хоногт бүгдээрээ EKS дээр ECR image-ээ оруулж deploy хийхэд бэлдэх юм.

Deliverables:
[x] repo link [DONE]
[x] CI run link (green) - CI workflow configured with lint, type-check, Docker build, ECR push
[x] ECR screenshots (both images with :<sha>) [DONE - ECR setup complete]
[x] updated README badge [DONE - CI/CD, Docker, and AWS ECR badges added]

Rubric (100):
[x] Dockerfiles 30 [DONE - apps/server/Dockerfile and apps/web/Dockerfile with multi-stage builds]
[x] Local sanity 10 - Docker builds tested
[x] ECR repos+policies 20 [DONE - ECR repositories and IAM policies configured]
[x] CI build/push 30 [DONE - ci.yml has matrix build and ECR push with OIDC]
[x] Docs 10 [DONE - README.md and deployment docs]

Bonus (+10 means 1 point):
[x] matrix build for push and pull_request [DONE - ci.yml uses matrix strategy for server/web]

Лаб 6

За энэ долоо хоногт бүгдээрээ өөрсдийн хийсэн вэб апп-аа онлайн байршуулна. Байршуулахдаа EKS ашиглан байршуулах бөгөөд домэйн нэрийн удирдлага болон чиглүүлэлтийг route53 болон ingress ашиглаж хэрэгжүүлнэ. Вэб апп-д шаардлагатай өгөгдлийн сангийн мэдээллийг migration хийж оруулсан байх бөгөөд мөн давхар deploy-той байдлаар хэрэгжүүлэх юм. 10 онооны ажил шүү.

[x] Public HTTPS URL + screenshot (padlock visible) - https://ajil-go.online
[x] GitHub Actions run link (build + deploy succeeded)
[x] kubectl get pods -n ajil-go screenshot showing Ready pods
[x] Updated DEPLOY.md (OIDC steps, manifests, Ingress/TLS)

Rubric (100 pts):
[x] OIDC/Roles 20 - GitHub OIDC configured with IAM roles
[x] aws‑auth/RBAC 10 - Configured for GitHub Actions deployment
[x] Manifests 25 - Full K8s manifests in k8s/ directory
[x] Ingress/TLS 20 - AWS ALB Ingress with ACM certificate
[x] Migration Job 10 - k8s/migration-job.yaml
[x] HPA 10 - k8s/hpa.yaml with CPU/memory scaling
[x] Docs 5 - This document updated

---

# EKS Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         AWS Cloud                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Route53 (ajil-go.online)               │  │
│  └─────────────────────────┬─────────────────────────────────┘  │
│                            │                                     │
│  ┌─────────────────────────▼─────────────────────────────────┐  │
│  │              Application Load Balancer (ALB)              │  │
│  │                    + ACM TLS Certificate                  │  │
│  └─────────────────────────┬─────────────────────────────────┘  │
│                            │                                     │
│  ┌─────────────────────────▼─────────────────────────────────┐  │
│  │                    EKS Cluster                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                  Namespace: ajil-go                 │  │  │
│  │  │  ┌───────────────┐        ┌───────────────┐        │  │  │
│  │  │  │    Server     │        │      Web      │        │  │  │
│  │  │  │  (Fastify)    │        │   (Next.js)   │        │  │  │
│  │  │  │   Port 3001   │        │   Port 3000   │        │  │  │
│  │  │  │   2-5 pods    │        │   2-5 pods    │        │  │  │
│  │  │  └───────────────┘        └───────────────┘        │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────┐    ┌───────────────────┐                 │
│  │       ECR         │    │   External DB     │                 │
│  │  ajil-go/server   │    │    (Prisma)       │                 │
│  │  ajil-go/web      │    │                   │                 │
│  └───────────────────┘    └───────────────────┘                 │
└──────────────────────────────────────────────────────────────────┘
```

## AWS Resources Created

| Resource | Name/ARN | Purpose |
|----------|----------|---------|
| **ECR Repository** | ajil-go/server | Docker image for API server |
| **ECR Repository** | ajil-go/web | Docker image for Next.js frontend |
| **EKS Cluster** | ajil-go-cluster | Kubernetes cluster |
| **Route53 Hosted Zone** | ajil-go.online | DNS management |
| **ACM Certificate** | *.ajil-go.online | TLS/SSL certificate |
| **IAM Role** | github-actions-ecr-role | OIDC role for ECR push |
| **IAM Role** | github-actions-eks-role | OIDC role for EKS deploy |

## OIDC Configuration

### GitHub Actions OIDC Provider
The OIDC provider allows GitHub Actions to assume AWS IAM roles without static credentials.

**Trust Policy (k8s/iam/github-actions-trust-policy.json):**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::804257878061:oidc-provider/token.actions.githubusercontent.com"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
      },
      "StringLike": {
        "token.actions.githubusercontent.com:sub": "repo:darjss/ajil-go:*"
      }
    }
  }]
}
```

### IAM Roles
1. **github-actions-ecr-role**: Allows pushing Docker images to ECR
2. **github-actions-eks-role**: Allows deploying to EKS cluster

## Kubernetes Manifests

| File | Description |
|------|-------------|
| `k8s/namespace.yaml` | Creates `ajil-go` namespace |
| `k8s/secrets.template.yaml` | Template for secrets (do not commit values!) |
| `k8s/server-deployment.yaml` | Fastify API deployment (2 replicas) |
| `k8s/server-service.yaml` | ClusterIP service for API |
| `k8s/web-deployment.yaml` | Next.js deployment (2 replicas) |
| `k8s/web-service.yaml` | ClusterIP service for frontend |
| `k8s/ingress.yaml` | ALB Ingress with TLS termination |
| `k8s/hpa.yaml` | HorizontalPodAutoscaler for both apps |
| `k8s/migration-job.yaml` | Database migration job |

## Initial Cluster Setup

### 1. Create EKS Cluster
```bash
eksctl create cluster \
  --name ajil-go-cluster \
  --region ap-southeast-1 \
  --version 1.31 \
  --nodegroup-name standard-workers \
  --node-type t3.small \
  --nodes 2 \
  --nodes-min 1 \
  --nodes-max 3 \
  --managed \
  --with-oidc \
  --alb-ingress-access
```

### 2. Install AWS Load Balancer Controller
```bash
# Create IAM policy
curl -o iam-policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/main/docs/install/iam_policy.json

aws iam create-policy \
  --policy-name AWSLoadBalancerControllerIAMPolicy \
  --policy-document file://iam-policy.json

# Create service account
eksctl create iamserviceaccount \
  --cluster=ajil-go-cluster \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --attach-policy-arn=arn:aws:iam::804257878061:policy/AWSLoadBalancerControllerIAMPolicy \
  --override-existing-serviceaccounts \
  --approve

# Install controller via Helm
helm repo add eks https://aws.github.io/eks-charts
helm repo update

helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=ajil-go-cluster \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller
```

### 3. Create Namespace and Secrets
```bash
# Apply namespace
kubectl apply -f k8s/namespace.yaml

# Create secrets (replace with actual values)
kubectl create secret generic ajil-go-secrets \
  --namespace=ajil-go \
  --from-literal=DATABASE_URL='your-database-url' \
  --from-literal=BETTER_AUTH_SECRET='your-auth-secret' \
  --from-literal=BETTER_AUTH_URL='https://api.ajil-go.online' \
  --from-literal=CORS_ORIGIN='https://ajil-go.online' \
  --from-literal=GOOGLE_CLIENT_ID='your-google-client-id' \
  --from-literal=GOOGLE_CLIENT_SECRET='your-google-client-secret'
```

### 4. Configure aws-auth for GitHub Actions
```bash
# Add GitHub Actions role to aws-auth ConfigMap
kubectl edit configmap aws-auth -n kube-system

# Add under mapRoles:
- rolearn: arn:aws:iam::804257878061:role/github-actions-eks-role
  username: github-actions
  groups:
    - system:masters
```

### 5. Deploy Application
```bash
# Apply all manifests
kubectl apply -f k8s/server-deployment.yaml
kubectl apply -f k8s/server-service.yaml
kubectl apply -f k8s/web-deployment.yaml
kubectl apply -f k8s/web-service.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/ingress.yaml

# Run migration job
kubectl apply -f k8s/migration-job.yaml
```

### 6. Configure Route53 DNS
After the ALB is created, add DNS records:
```bash
# Get ALB DNS name
kubectl get ingress -n ajil-go

# Create A records in Route53 pointing to ALB (alias records)
# - ajil-go.online -> ALB
# - api.ajil-go.online -> ALB
# - www.ajil-go.online -> ALB
```

## CI/CD Pipeline

The CI/CD pipeline (`.github/workflows/ci.yml`) includes:

1. **Test Job**: Lint and type-check on all pushes/PRs
2. **Build Job**: Matrix build for server and web, push to ECR (main/deploy branches only)
3. **Deploy Job**: Rolling update to EKS (main/deploy branches only)

### Required GitHub Secrets
No secrets needed! We use OIDC for authentication.

### Required GitHub Environment
Create a `production` environment in GitHub repository settings for deploy job approval (optional).

## Monitoring & Troubleshooting

### Check Pod Status
```bash
kubectl get pods -n ajil-go
kubectl describe pod <pod-name> -n ajil-go
kubectl logs <pod-name> -n ajil-go
```

### Check Ingress/ALB Status
```bash
kubectl get ingress -n ajil-go
kubectl describe ingress ajil-go-ingress -n ajil-go
```

### Check HPA Status
```bash
kubectl get hpa -n ajil-go
```

### Check Certificate Status
```bash
aws acm describe-certificate \
  --certificate-arn arn:aws:acm:ap-southeast-1:804257878061:certificate/11ed4b14-d7c8-40df-aa90-7467bf17f91e \
  --region ap-southeast-1
```

## URLs

| Service | URL |
|---------|-----|
| Frontend | https://ajil-go.online |
| API | https://api.ajil-go.online |
| WWW | https://www.ajil-go.online |

## Cost Optimization Tips

1. Use `t3.small` instances instead of `t3.medium`
2. Set HPA min replicas to 1 during low traffic
3. Consider using Fargate for sporadic workloads
4. Enable cluster autoscaler to scale down unused nodes
