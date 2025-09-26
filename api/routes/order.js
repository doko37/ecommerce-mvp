const router = require('express').Router();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand, PutCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

router.get('/', async (req, res) => {
    try {
        const { restaurantId } = req.query;

        if (!restaurantId) {
            return res.status(400).json({ error: "restaurantId is required" });
        }

        const params = {
            TableName: TABLE_NAME,
            KeyConditionExpression: "restaurantId = :rId AND begins_with(itemId, :prefix)",
            ExpressionAttributeValues: {
            ":rId": restaurantId,
            ":prefix": 'ORDER#'
            },
        };
        const data = await docClient.send(new QueryCommand(params));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const order = req.body;
    console.log(order)
    try {
        const { restaurantId } = req.query;
        const { name, email, phone, time, items } = order;

        if (name == null || email == null || phone == null || time == null || items == null) {
            return res.status(400).json({ error: "name, email, phone, time, and items are required" });
        }

        if (!restaurantId) {
            return res.status(400).json({ error: "restaurantId is required" });
        }

        const params = {
            TableName: TABLE_NAME,
            Item: {
                restaurantId: restaurantId,
                itemId: `ORDER#${Date.now()}`,
                ...order
            }
        };
        await docClient.send(new PutCommand(params));
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const { restaurantId, itemId } = req.query;

        if (!restaurantId || !itemId) {
            return res.status(400).json({ error: "restaurantId and itemId are required" });
        }

        const params = {
            TableName: TABLE_NAME,
            Key: {
                restaurantId: restaurantId,
                itemId: itemId
            }
        };
        response = await docClient.send(new DeleteCommand(params));
        res.json({ message: "order deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;