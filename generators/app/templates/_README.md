# <%= name %>

> Lambda function

## Getting Started

### What is a Lambda function?

>The code you run on AWS Lambda is uploaded as a “Lambda function”. Each function has associated configuration information, such as its name, description, entry point, and resource requirements. The code must be written in a “stateless” style i.e. it should assume there is no affinity to the underlying compute infrastructure. Local file system access, child processes, and similar artifacts may not extend beyond the lifetime of the request, and any persistent state should be stored in Amazon S3, Amazon DynamoDB, or another Internet-available storage service. Lambda functions can include libraries, even native ones.  

[Excerpt from AWS website](https://aws.amazon.com/lambda/faqs/#functions)

### How does this work?

Please see the [grunt-aws-lambda](https://github.com/Tim-B/grunt-aws-lambda) repo for details.

### Invoking locally

```bash
grunt lambda_invoke
```

### Create deployment package

```bash
grunt lambda_package
```

### Automated deploy

```bash
grunt deploy
```

## License

MIT
