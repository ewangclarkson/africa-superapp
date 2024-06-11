#Upload deployment

kubectl apply -f docker-registry-credentials.yml
kubectl apply -f app-secret.yml
kubectl apply -f app-configmap.yml
kubectl apply -f web-confgmap.yml
kubectl apply -f package-service-deployment.yml
kubectl apply -f delivery-service-deployment.yml
kubectl apply -f user-service-deployment.yml
kubectl apply -f web-deployment.yml
kubectl apply -f gateway-ingres.yml

# start service
minikube service apisix-gateway --url -n ingress-apisix
export db_driver=mongodb
export db_host=mongodb+srv://cluster0.4lec3.mongodb.net
export db_port=27017
export db_username=ewangclarks
export db_password=Jesusislordforever
export db_name=superapp_packages
export db_connection_url=mongodb+srv://ewangclarks:Jesusislordforever@cluster0.4lec3.mongodb.net/superapp_packages
export kafka_brokers=pkc-12576z.us-west2.gcp.confluent.cloud:9092
export kafka_username=ZLO2MNUKX63M37WX
export kafka_password=rWs5Rz2oJ4RbD16MW3d1HcHnYgVPi4DrJ8MUeZ97C8U9wirX1FGDofS1i4Dz2ORJ
export kafka_group_id="AFRICA_SUPERAPP"
export jwt_private_key=3809370937093ofshoi
export expiry_time=2h
export elastic_cloud_id=africasuperapp:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDJiNWMzNTBkNzkzZTQwNTM5YzMxYjA5OTFjOTI5ZDVhJGRhZTg4ODZjMjc4ZDQxZWViZGNiNTAxOWRmN2UwOWZk
export elastic_username=elastic
export elastic_password=pPEjs8yW7iTjQIIXLjQnGBfk
export NODE_ENV=development
export bcrypt_salt=10
export gateway_host=http://localhost:4200
export elastic_logs_index=asuperapp_logs
export elastic_logging_level=info

export NG_APP_USER_API_HOST=sgt
export NG_APP_PACKAGE_API_HOST=adgh
export NG_APP_DELIVERY_API_HOST=aztgh
export NG_APP_WEB_SOCKET_HOST=aehg
export NG_APP_GOOGLE_API_KEY= AIzaSyCbbqBUVGdfxZ7okId4BVM_Dyc2jePnyRk

export db_driver=mongodb
export db_host=localhost
export db_port=27017
export db_username=" "
export db_password=" "
export db_name=superapp_packages
export db_connection_url=mongodb://localhost:27017/superapp_delivery
export kafka_brokers=pkc-12576z.us-west2.gcp.confluent.cloud:9092
export kafka_username=ZLO2MNUKX63M37WX
export kafka_password=rWs5Rz2oJ4RbD16MW3d1HcHnYgVPi4DrJ8MUeZ97C8U9wirX1FGDofS1i4Dz2ORJ
export kafka_group_id="AFRICA_SUPERAPP"
export jwt_private_key=3809370937093ofshoi
export expiry_time=2h
export elastic_cloud_id=africasuperapp:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDJiNWMzNTBkNzkzZTQwNTM5YzMxYjA5OTFjOTI5ZDVhJGRhZTg4ODZjMjc4ZDQxZWViZGNiNTAxOWRmN2UwOWZk
export elastic_username=elastic
export elastic_password=pPEjs8yW7iTjQIIXLjQnGBfk
export NODE_ENV=development
export bcrypt_salt=10
export gateway_host=http:localhost
export elastic_logs_index=asuperapp_logs
export elastic_logging_level=info

kubectl create secret docker-registry registry-credentials --docker-server=590183838260.dkr.ecr.us-east-1.amazonaws.com --docker-username=AWS --docker-password=$(aws ecr get-login-password --region us-east-1)
