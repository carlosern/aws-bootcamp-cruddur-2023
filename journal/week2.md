# Week 2 — Distributed Tracing

## Homework Required

### **Instrument Honeycomb with OTEL**

I successfully implemented Honeycomb with OTEL by following the weekly live stream video and completing the "Getting Started with OpenTelemetry in Python" tutorial ([https://docs.honeycomb.io/getting-data-in/opentelemetry/python/](https://docs.honeycomb.io/getting-data-in/opentelemetry/python/)).


![2023-03-02 21 58 06 Honeycomb implemented](https://user-images.githubusercontent.com/9203226/222916590-6f88b4c1-ccc1-4e6c-9d67-6cdc21e43e97.jpg)



### Instrument AWS X-Ray

I was able to implement Instrument AWS X-Ray by following the instructional video 

```jsx
aws xray create-group \
    --group-name "Cruddur" \
    --filter-expression "service(\"backend-flask\")"
```

```json
{
    "Group": {
        "GroupName": "Cruddur",
        "GroupARN": "arn:aws:xray:us-east-2:4341XXXXXXXX:group/Cruddur/77NG5XZJAFTHDC6S47IRK4YWIFGAJ3J4F6DIAJZQHIHCPDEW65MQ",
        "FilterExpression": "service(\"backend-flask\")",
        "InsightsConfiguration": {
            "InsightsEnabled": false,
            "NotificationsEnabled": false
        }
    }
}
```

```json
aws xray create-sampling-rule --cli-input-json file://aws/json/xray.json
```

Result

```json
{
    "SamplingRuleRecord": {
        "SamplingRule": {
            "RuleName": "Cruddur",
            "RuleARN": "arn:aws:xray:us-east-2:4341XXXXXXXX:sampling-rule/Cruddur",
            "ResourceARN": "*",
            "Priority": 9000,
            "FixedRate": 0.1,
            "ReservoirSize": 5,
            "ServiceName": "backend-flask",
            "ServiceType": "*",
            "Host": "*",
            "HTTPMethod": "*",
            "URLPath": "*",
            "Version": 1,
            "Attributes": {}
        },
        "CreatedAt": "2023-03-03T02:50:49+00:00",
        "ModifiedAt": "2023-03-03T02:50:49+00:00"
    }
}
```

![2023-03-02 23 34 05 X Ray implemented](https://user-images.githubusercontent.com/9203226/222916770-9dbafda1-22cb-4c2f-8b68-f57c08cb3ed5.jpg)


### Instrument AWS X-Ray Subsegments

By following the instructional video, I successfully implemented AWS X-Ray subsegments for instrumentation

![2023-03-04 12 48 21 X ray subsegment](https://user-images.githubusercontent.com/9203226/222918632-5f1dfb10-8928-43c3-8d57-b3b6e742262b.jpg)


### Configure custom logger to send to CloudWatch Logs

I was able to implement the custom logger without any problems.

I am leaving logs and traces active for a longer time. I don't think I will reach the limits of the free tier.

![2023-03-03 21 39 55 cloudwatchlog implemented](https://user-images.githubusercontent.com/9203226/222916826-3f90bd59-725e-4929-8c6e-2716ceac1ba7.jpg)


### Integrate Rollbar and capture and error

I was able to implement Rollbar, but I encountered some problems with Gitpod. Initially, I had to drop the workspace due to CORS issues. Then, the Rollbar module was not recognized. However, after creating a new workspace, everything worked correctly.

![2023-03-03 23 05 03 rollback implemented](https://user-images.githubusercontent.com/9203226/222916875-2ed09925-423e-4e40-a619-79badf3bdb39.jpg)




