helm repo add apisix https://charts.apiseven.com
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
kubectl create ns ingress-apisix
helm install apisix apisix/apisix --namespace ingress-apisix \
--set service.type=NodePort \
--set ingress-controller.enabled=true \
--set ingress-controller.config.apisix.serviceNamespace=ingress-apisix \
--set ingress-controller.config.kubernetes.enableGatewayAPI=true