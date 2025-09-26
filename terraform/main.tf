provider "aws" {
    region = var.aws_region
}

resource "aws_dynamodb_table" "dynamodb_table" {
    name = "ecommerce-mvp"
    billing_mode = "PROVISIONED"
    read_capacity = 1
    write_capacity = 1
    hash_key = "restaurantId"
    range_key = "itemId"

    attribute {
        name = "restaurantId"
        type = "S"
    }

    attribute {
        name = "itemId"
        type = "S"
    }

    ttl {
        attribute_name = "TTL"
        enabled = true
    }
}