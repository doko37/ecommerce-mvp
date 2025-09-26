variable "aws_region" {
  description = "AWS region"
  type = string
  default = "ap-southeast-2"
}

variable "table_name" {
    description = "DynamoDB table name"
    type = string
    default = "Raku"
}